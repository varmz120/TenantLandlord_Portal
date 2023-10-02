// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert';
import { app } from '../../../src/app';
import { User, UserType } from '../../../src/services/users/users';
import { QuotationStatus, TicketStatus } from '../../../src/services/ticket/ticket.schema';

const createUser = (_id: string, typ: UserType): User => ({
  _id: 'ticket.test.' + _id,
  typ,
  email: _id + '@test.com',
  password: 'password',
  buildingId: 'test-building',
});

const testTenantUser = createUser('test-tenant', UserType.Tenant);
const testServiceProviderUser = createUser('test-service-provider', UserType.ServiceProvider);
const testLandlordUser = createUser('test-landlord', UserType.Landlord);
const testAdminUser = createUser('test-admin', UserType.Admin);

const testTenant = {
  _id: 'ticket.test.tenant',
  name: 'Name',
  address: 'Address',
  leases: [],
};

const testLease = {
  _id: 'lease-01',
  userId: testTenantUser._id,
  tenantId: testTenant._id,
  units: [
    {
      number: 'B1-01',
      buildingId: 'test-building',
      leaseId: 'lease-01',
    },
  ],
  commencementDate: 0,
  expiryDate: 0,
  monthlyRent: 0,
  leaseFile: '',
};

testTenantUser.leaseId = testLease._id;

const testTicket = () => ({
  leaseId: testLease._id,
  title: 'Title',
  description: 'Description',
  requestType: 'Cleaning',
  contact: {
    name: 'Name',
    email: 'email@test.com',
    number: '38789367',
  },
  attachements: [],
});

const verifySuccess = async <T>(a: Promise<T>, msg: string) => {
  const result = await a;
  assert.ok(result, msg);
  return result;
};

const verifyError = async <T>(a: Promise<T>, msg: string) => {
  await a.then(() => assert.fail(msg)).catch(() => {});
};

describe('ticket service', () => {
  before(async () => {
    await app.service('tenants').create(testTenant, { user: testAdminUser });
    await app.service('lease').create(testLease, { user: testAdminUser });
    await app.service('users')._create(testTenantUser, { user: testAdminUser });
    await app.service('users')._create(testServiceProviderUser, { user: testAdminUser });
    await app.service('users')._create(testLandlordUser, { user: testAdminUser });
    await app.service('users')._create(testAdminUser, { user: testAdminUser });
  });

  after(async () => {
    await app.service('users')._remove(testTenantUser._id, { user: testTenantUser });
    await app
      .service('users')
      ._remove(testServiceProviderUser._id, { user: testServiceProviderUser });
    await app.service('users')._remove(testLandlordUser._id, { user: testLandlordUser });
    await app.service('users')._remove(testAdminUser._id, { user: testAdminUser });
    await app.service('lease').remove(testLease._id, { user: testAdminUser });
    await app.service('tenants').remove(testTenant._id, { user: testAdminUser });
  });

  it('registered the service', () => {
    const service = app.service('ticket');

    assert.ok(service, 'Registered the service');
  });

  it('allows tenants to access only if its for their unit', async () => {
    const service = app.service('ticket');

    const otherTenant = createUser('other-tenant', UserType.Tenant);

    const ticket = await service.create(testTicket(), { user: testAdminUser });
    await verifyError(
      service.get(ticket._id, { user: otherTenant }),
      'Other tenant can access ticket'
    );
    await service._remove(ticket._id);
  });

  it('allows service providers to access only if they are assigned', async () => {
    const service = app.service('ticket');

    const ticket = await service.create(testTicket(), { user: testAdminUser });
    await verifyError(
      service.get(ticket._id, { user: testServiceProviderUser }),
      'Service Provider can access ticket'
    );
    await service._remove(ticket._id);
  });

  it('allows landlords to access only if it is in their building', async () => {
    const service = app.service('ticket');

    const otherLandlord = createUser('other-landlord', UserType.Landlord);
    otherLandlord.buildingId = 'other-building-id';

    const ticket = await service.create(testTicket(), { user: testAdminUser });
    await verifyError(
      service.get(ticket._id, { user: otherLandlord }),
      'Other landlord can access ticket'
    );
    await service._remove(ticket._id);
  });

  it('checks permissions for ticket creation', async () => {
    const service = app.service('ticket');

    const successUsers = [testTenantUser, testLandlordUser, testAdminUser];
    const errorUsers = [testServiceProviderUser];

    await Promise.all(
      successUsers.map(async (user) => {
        const ticket = await verifySuccess(
          service.create(testTicket(), { user }),
          `Failed to create ticket as ${user._id}`
        );
        assert.strictEqual(ticket.status, TicketStatus.Opened);
        assert.strictEqual(ticket.quotStatus, QuotationStatus.Pending);
        await service._remove(ticket._id);
      })
    );

    await Promise.all(
      errorUsers.map(async (user) => {
        await verifyError(service.create(testTicket(), { user }), `Created ticket as ${user._id}`);
      })
    );
  });

  it('checks permissions for ticket deletion', async () => {
    const service = app.service('ticket');

    const successUsers = [testLandlordUser, testAdminUser];
    const errorUsers = [testTenantUser, testServiceProviderUser];

    await Promise.all(
      successUsers.map(async (user) => {
        const ticket = await service.create(testTicket(), { user: testAdminUser });
        await verifySuccess(
          service.remove(ticket._id, { user }),
          `Failed to delete ticket as ${user._id}`
        );
      })
    );

    await Promise.all(
      errorUsers.map(async (user) => {
        const ticket = await service.create(testTicket(), { user: testAdminUser });
        await verifyError(service.remove(ticket._id, { user }), `Deleted ticket as ${user._id}`);
        await service._remove(ticket._id);
      })
    );
  });

  it('checks permissions for ticket assignPersonnel', async () => {
    const service = app.service('ticket');

    const successUsers = [testServiceProviderUser, testLandlordUser, testAdminUser];
    const errorUsers = [testTenantUser];

    await Promise.all(
      successUsers.map(async (user) => {
        const ticket = await service.create(testTicket(), { user: testAdminUser });
        await service._patch(ticket._id, { personnelAssigned: user._id });
        const res = await verifySuccess(
          service.assignPersonnel(
            { ticketId: ticket._id, personnelId: testServiceProviderUser._id },
            { user }
          ),
          `Failed to assign personnel to ticket as ${user._id}`
        );
        assert.strictEqual(res.status, TicketStatus.InQueue);
        await service._remove(ticket._id);
      })
    );

    await Promise.all(
      errorUsers.map(async (user) => {
        const ticket = await service.create(testTicket(), { user: testAdminUser });
        await service._patch(ticket._id, { personnelAssigned: user._id });
        await verifyError(
          service.assignPersonnel(
            { ticketId: ticket._id, personnelId: testServiceProviderUser._id },
            { user }
          ),
          `Assigned personnel ticket as ${user._id}`
        );
        await service._remove(ticket._id);
      })
    );
  });

  it('checks permissions for ticket unassignPersonnel', async () => {
    const service = app.service('ticket');

    const successUsers = [testServiceProviderUser, testLandlordUser, testAdminUser];
    const errorUsers = [testTenantUser];

    await Promise.all(
      successUsers.map(async (user) => {
        const ticket = await service.create(testTicket(), { user: testAdminUser });
        await service._patch(ticket._id, {
          personnelAssigned: user._id,
          status: TicketStatus.InQueue,
        });
        const res = await verifySuccess(
          service.unassignPersonnel({ ticketId: ticket._id }, { user }),
          `Failed to unassign personnel to ticket as ${user._id}`
        );
        assert.strictEqual(res.status, TicketStatus.Opened);
        await service._remove(ticket._id);
      })
    );

    await Promise.all(
      errorUsers.map(async (user) => {
        const ticket = await service.create(testTicket(), { user: testAdminUser });
        await service._patch(ticket._id, {
          personnelAssigned: user._id,
          status: TicketStatus.InQueue,
        });
        await verifyError(
          service.unassignPersonnel({ ticketId: ticket._id }, { user }),
          `Unassigned personnel ticket as ${user._id}`
        );
        await service._remove(ticket._id);
      })
    );
  });

  it('checks permissions for ticket moveInProgress', async () => {
    const service = app.service('ticket');

    const successUsers = [testServiceProviderUser, testLandlordUser, testAdminUser];
    const errorUsers = [testTenantUser];

    await Promise.all(
      successUsers.map(async (user) => {
        const ticket = await service.create(testTicket(), { user: testAdminUser });
        await service._patch(ticket._id, {
          personnelAssigned: user._id,
          status: TicketStatus.InQueue,
        });
        const res = await verifySuccess(
          service.moveInProgress({ ticketId: ticket._id }, { user }),
          `Failed to moveInProgress as ${user._id}`
        );
        assert.strictEqual(res.status, TicketStatus.InProgress);
        assert.strictEqual(res.quotStatus, QuotationStatus.NotRequired);
        await service._remove(ticket._id);
      })
    );

    await Promise.all(
      errorUsers.map(async (user) => {
        const ticket = await service.create(testTicket(), { user: testAdminUser });
        await service._patch(ticket._id, {
          personnelAssigned: user._id,
          status: TicketStatus.InQueue,
        });
        await verifyError(
          service.moveInProgress({ ticketId: ticket._id }, { user }),
          `movedInProgress as ${user._id}`
        );
        await service._remove(ticket._id);
      })
    );
  });

  it('checks permissions for ticket uploadQuotation', async () => {
    const service = app.service('ticket');

    const successUsers = [testLandlordUser, testAdminUser];
    const errorUsers = [testServiceProviderUser, testTenantUser];

    const quot = (ticketId: number) => ({
      ticketId,
      amount: 100,
      remarks: 'Remarks',
      uri: '',
    });

    await Promise.all(
      successUsers.map(async (user) => {
        const ticket = await service.create(testTicket(), { user: testAdminUser });
        await service._patch(ticket._id, {
          personnelAssigned: user._id,
          status: TicketStatus.InQueue,
        });
        const res = await verifySuccess(
          service.uploadQuotation(quot(ticket._id), { user }),
          `Failed to upload quotation as ${user._id}`
        );
        assert.strictEqual(res.status, TicketStatus.WaitingForQuotApproval);
        assert.strictEqual(res.quotStatus, QuotationStatus.Uploaded);
        assert.ok(res.quotation);
        await service._remove(ticket._id);
      })
    );

    await Promise.all(
      errorUsers.map(async (user) => {
        const ticket = await service.create(testTicket(), { user: testAdminUser });
        await service._patch(ticket._id, {
          personnelAssigned: user._id,
          status: TicketStatus.InQueue,
        });
        await verifyError(
          service.uploadQuotation(quot(ticket._id), { user }),
          `Uploaded quotation as ${user._id}`
        );
        await service._remove(ticket._id);
      })
    );
  });

  it('checks permissions for ticket approveQuotation', async () => {
    const service = app.service('ticket');

    const successUsers = [testTenantUser, testAdminUser];
    const errorUsers = [testServiceProviderUser, testLandlordUser];

    await Promise.all(
      successUsers.map(async (user) => {
        const ticket = await service.create(testTicket(), { user: testAdminUser });
        await service._patch(ticket._id, {
          personnelAssigned: user._id,
          status: TicketStatus.WaitingForQuotApproval,
        });
        const res = await verifySuccess(
          service.approveQuotation({ ticketId: ticket._id }, { user }),
          `Failed to approve quotation as ${user._id}`
        );
        assert.strictEqual(res.status, TicketStatus.InProgress);
        assert.ok(res.quotation?.acceptedOn);
        await service._remove(ticket._id);
      })
    );

    await Promise.all(
      errorUsers.map(async (user) => {
        const ticket = await service.create(testTicket(), { user: testAdminUser });
        await service._patch(ticket._id, {
          personnelAssigned: user._id,
          status: TicketStatus.WaitingForQuotApproval,
        });
        await verifyError(
          service.approveQuotation({ ticketId: ticket._id }, { user }),
          `Approved quotation as ${user._id}`
        );
        await service._remove(ticket._id);
      })
    );
  });

  it('checks permissions for ticket rejectQuotation', async () => {
    const service = app.service('ticket');

    const successUsers = [testTenantUser, testAdminUser];
    const errorUsers = [testServiceProviderUser, testLandlordUser];

    await Promise.all(
      successUsers.map(async (user) => {
        const ticket = await service.create(testTicket(), { user: testAdminUser });
        await service._patch(ticket._id, {
          personnelAssigned: user._id,
          status: TicketStatus.WaitingForQuotApproval,
        });
        const res = await verifySuccess(
          service.rejectQuotation({ ticketId: ticket._id }, { user }),
          `Failed to reject quotation as ${user._id}`
        );
        assert.strictEqual(res.status, TicketStatus.InQueue);
        await service._remove(ticket._id);
      })
    );

    await Promise.all(
      errorUsers.map(async (user) => {
        const ticket = await service.create(testTicket(), { user: testAdminUser });
        await service._patch(ticket._id, {
          personnelAssigned: user._id,
          status: TicketStatus.WaitingForQuotApproval,
        });
        await verifyError(
          service.rejectQuotation({ ticketId: ticket._id }, { user }),
          `Rejected quotation as ${user._id}`
        );
        await service._remove(ticket._id);
      })
    );
  });

  it('checks permissions for ticket rejectTicket', async () => {
    const service = app.service('ticket');

    const successUsers = [testLandlordUser, testAdminUser];
    const errorUsers = [testTenantUser, testServiceProviderUser];

    await Promise.all(
      successUsers.map(async (user) => {
        const ticket = await service.create(testTicket(), { user: testAdminUser });
        await service._patch(ticket._id, { personnelAssigned: user._id });
        const res = await verifySuccess(
          service.rejectTicket({ ticketId: ticket._id }, { user }),
          `Failed to reject ticket as ${user._id}`
        );
        assert.strictEqual(res.status, TicketStatus.Rejected);
        await service._remove(ticket._id);
      })
    );

    await Promise.all(
      errorUsers.map(async (user) => {
        const ticket = await service.create(testTicket(), { user: testAdminUser });
        await service._patch(ticket._id, { personnelAssigned: user._id });
        await verifyError(
          service.rejectTicket({ ticketId: ticket._id }, { user }),
          `Rejected ticket as ${user._id}`
        );
        await service._remove(ticket._id);
      })
    );
  });

  it('checks permissions for ticket reopenTicket when rejected by landlord', async () => {
    const service = app.service('ticket');

    const successUsers = [testLandlordUser, testAdminUser];
    const errorUsers = [testTenantUser, testServiceProviderUser];

    await Promise.all(
      successUsers.map(async (user) => {
        const ticket = await service.create(testTicket(), { user: testAdminUser });
        await service._patch(ticket._id, {
          personnelAssigned: user._id,
          status: TicketStatus.Rejected,
        });
        const res = await verifySuccess(
          service.reopenTicket({ ticketId: ticket._id }, { user }),
          `Failed to reopen ticket as ${user._id}`
        );
        assert.strictEqual(res.status, TicketStatus.Opened);
        await service._remove(ticket._id);
      })
    );

    await Promise.all(
      errorUsers.map(async (user) => {
        const ticket = await service.create(testTicket(), { user: testAdminUser });
        await service._patch(ticket._id, {
          personnelAssigned: user._id,
          status: TicketStatus.Rejected,
        });
        await verifyError(
          service.reopenTicket({ ticketId: ticket._id }, { user }),
          `Reopened ticket as ${user._id}`
        );
        await service._remove(ticket._id);
      })
    );
  });

  it('checks permissions for ticket reopenTicket when rejected by tenant', async () => {
    const service = app.service('ticket');

    const successUsers = [testTenantUser, testLandlordUser, testAdminUser];
    const errorUsers = [testServiceProviderUser];

    await Promise.all(
      successUsers.map(async (user) => {
        const ticket = await service.create(testTicket(), { user: testAdminUser });
        await service._patch(ticket._id, {
          personnelAssigned: user._id,
          status: TicketStatus.PendingCompletionApproval,
        });
        const res = await verifySuccess(
          service.reopenTicket({ ticketId: ticket._id }, { user }),
          `Failed to reopen ticket as ${user._id}`
        );
        assert.strictEqual(res.status, TicketStatus.InQueue);
        assert.strictEqual(res.quotStatus, QuotationStatus.Pending);
        await service._remove(ticket._id);
      })
    );

    await Promise.all(
      errorUsers.map(async (user) => {
        const ticket = await service.create(testTicket(), { user: testAdminUser });
        await service._patch(ticket._id, {
          personnelAssigned: user._id,
          status: TicketStatus.PendingCompletionApproval,
        });
        await verifyError(
          service.reopenTicket({ ticketId: ticket._id }, { user }),
          `Reopened ticket as ${user._id}`
        );
        await service._remove(ticket._id);
      })
    );
  });

  it('checks permissions for ticket registerWorkFinished', async () => {
    const service = app.service('ticket');

    const successUsers = [testServiceProviderUser, testLandlordUser, testAdminUser];
    const errorUsers = [testTenantUser];

    await Promise.all(
      successUsers.map(async (user) => {
        const ticket = await service.create(testTicket(), { user: testAdminUser });
        await service._patch(ticket._id, {
          personnelAssigned: user._id,
          status: TicketStatus.InProgress,
        });
        const res = await verifySuccess(
          service.registerWorkFinished({ ticketId: ticket._id }, { user }),
          `Failed to register work finished as ${user._id}`
        );
        assert.strictEqual(res.status, TicketStatus.PendingCompletionApproval);
        assert.ok(res.completedOn);
        await service._remove(ticket._id);
      })
    );

    await Promise.all(
      errorUsers.map(async (user) => {
        const ticket = await service.create(testTicket(), { user: testAdminUser });
        await service._patch(ticket._id, {
          personnelAssigned: user._id,
          status: TicketStatus.InProgress,
        });
        await verifyError(
          service.registerWorkFinished({ ticketId: ticket._id }, { user }),
          `Register work finished as ${user._id}`
        );
        await service._remove(ticket._id);
      })
    );
  });

  it('checks permissions for ticket rateTicket', async () => {
    const service = app.service('ticket');

    const successUsers = [testTenantUser, testAdminUser];
    const errorUsers = [testServiceProviderUser, testLandlordUser];

    const feedback = {
      description: 'Description',
      rating: 4,
    };

    await Promise.all(
      successUsers.map(async (user) => {
        const ticket = await service.create(testTicket(), { user: testAdminUser });
        await service._patch(ticket._id, {
          personnelAssigned: user._id,
          status: TicketStatus.PendingCompletionApproval,
        });
        const res = await verifySuccess(
          service.rateTicket({ ticketId: ticket._id, feedback }, { user }),
          `Failed to rate ticket as ${user._id}`
        );
        assert.strictEqual(res.status, TicketStatus.Closed);
        assert.ok(res.feedback);
        await service._remove(ticket._id);
      })
    );

    await Promise.all(
      errorUsers.map(async (user) => {
        const ticket = await service.create(testTicket(), { user: testAdminUser });
        await service._patch(ticket._id, {
          personnelAssigned: user._id,
          status: TicketStatus.PendingCompletionApproval,
        });
        await verifyError(
          service.rateTicket({ ticketId: ticket._id, feedback }, { user }),
          `Rated ticket finished as ${user._id}`
        );
        await service._remove(ticket._id);
      })
    );
  });

  it('checks permissions for ticket closeTicket', async () => {
    const service = app.service('ticket');

    const successUsers = [testTenantUser, testAdminUser];
    const errorUsers = [testServiceProviderUser, testLandlordUser];

    await Promise.all(
      successUsers.map(async (user) => {
        const ticket = await service.create(testTicket(), { user: testAdminUser });
        await service._patch(ticket._id, { personnelAssigned: user._id });
        const res = await verifySuccess(
          service.closeTicket({ ticketId: ticket._id }, { user }),
          `Failed to close ticket as ${user._id}`
        );
        assert.strictEqual(res.status, TicketStatus.Closed);
        await service._remove(ticket._id);
      })
    );

    await Promise.all(
      errorUsers.map(async (user) => {
        const ticket = await service.create(testTicket(), { user: testAdminUser });
        await service._patch(ticket._id, { personnelAssigned: user._id });
        await verifyError(
          service.closeTicket({ ticketId: ticket._id }, { user }),
          `Closed ticket finished as ${user._id}`
        );
        await service._remove(ticket._id);
      })
    );
  });
});
