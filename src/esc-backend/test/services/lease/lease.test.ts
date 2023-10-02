// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert';
import { app } from '../../../src/app';
import { User, UserType } from '../../../src/services/users/users.schema';
import { Tenant } from '../../../src/services/tenants/tenants.schema';
import { Lease } from '../../../src/client';

const createUser = (_id: string, typ: UserType, leaseId: string): User => ({
  _id: _id,
  typ,
  email: _id + '@test.com',
  password: 'password',
  leaseId: leaseId,
});

const createTenant = (_id: string, name: string, address: string): Tenant => ({
  _id: 'lease.test.' + _id,
  name: name,
  address: address,
  leases: [],
});

const createLease = (_id: string, user: string, tenant: string): Lease => ({
  _id: _id,
  userId: user,
  tenantId: tenant,
  units: [],
  commencementDate: 0,
  expiryDate: 0,
  monthlyRent: 0,
  leaseFile: '',
});

const testTenant = createTenant('tenant', 'Tenant', 'address');
const testLease = createLease('119', '119', testTenant._id);

const testAdminUser = createUser('2', UserType.Admin, '0');
const testLandlordUser = createUser('3', UserType.Landlord, '0');
const testTenantUser = createUser('119', UserType.Tenant, testLease._id);
const testTenantUser2 = createUser('1', UserType.Tenant, '1');
const testServiceProviderUser = createUser('4', UserType.ServiceProvider, '0');

describe('lease service', () => {
  it('registered the service', () => {
    const service = app.service('lease');
    assert.ok(service, 'Registered the service');
  });

  before(async () => {
    await app.service('tenants').create(testTenant, { user: testAdminUser });
  });

  after(async () => {
    await app.service('tenants').remove(testTenant._id, { user: testAdminUser });
  });

  // Test for finding lease Service
  // ======================================================

  it('can find lease as admin', async () => {
    const service = app.service('lease');
    await service.create(testLease, { user: testAdminUser });
    await service.find({ user: testAdminUser });
    await service.remove(testLease._id, { user: testAdminUser });
  });

  it('can find lease as landlord', async () => {
    const service = app.service('lease');
    await service.create(testLease, { user: testAdminUser });
    await service.find({ user: testLandlordUser });

    await service.remove(testLease._id, { user: testAdminUser });
  });

  it('can find lease as specific Tenant', async () => {
    const service = app.service('lease');
    await service.create(testLease, { user: testAdminUser });
    await service.find({ user: testTenantUser });

    await service.remove(testLease._id, { user: testAdminUser });
  });

  it('cannot find lease as different Tenant', async () => {
    const service = app.service('lease');
    await service.create(testLease, { user: testAdminUser });
    await service
      .find({ user: testTenantUser2 })
      .then(() => assert.fail("Could access other person's lease as tenant"))
      .catch(() => {});

    await service.remove(testLease._id, { user: testAdminUser });
  });

  it('cannot find lease as service provider', async () => {
    const service = app.service('lease');
    await service.create(testLease, { user: testAdminUser });
    await service
      .find({ user: testServiceProviderUser })
      .then(() => assert.fail('tried to create lease as Service Provider'))
      .catch(() => {});

    await service.remove(testLease._id, { user: testAdminUser });
  });

  // Test for getting lease Service
  // ======================================================

  it('can get lease as admin', async () => {
    const service = app.service('lease');
    await service.create(testLease, { user: testAdminUser });
    await service.get(testLease._id, { user: testAdminUser });
    await service.remove(testLease._id, { user: testAdminUser });
  });

  it('can get lease as landlord', async () => {
    const service = app.service('lease');
    await service.create(testLease, { user: testAdminUser });
    await service.get(testLease._id, { user: testLandlordUser });

    await service.remove(testLease._id, { user: testAdminUser });
  });

  it('can get lease as specific Tenant', async () => {
    const service = app.service('lease');
    await service.create(testLease, { user: testAdminUser });
    await service.get(testLease._id, { user: testTenantUser });

    await service.remove(testLease._id, { user: testAdminUser });
  });

  it('cannot get lease as different Tenant', async () => {
    const service = app.service('lease');
    await service.create(testLease, { user: testAdminUser });
    await service
      .get(testLease._id, { user: testTenantUser2 })
      .then(() => assert.fail("Could access other person's lease as tenant"))
      .catch(() => {});

    await service.remove(testLease._id, { user: testAdminUser });
  });

  it('cannot get lease as service provider', async () => {
    const service = app.service('lease');
    await service.create(testLease, { user: testAdminUser });
    await service
      .get(testLease._id, { user: testServiceProviderUser })
      .then(() => assert.fail('tried to create lease as Service Provider'))
      .catch(() => {});
    await service.remove(testLease._id, { user: testAdminUser });
  });

  it('modifies tenant object correctly', async () => {
    const service = app.service('lease');
    assert.ok(await service.create(testLease, { user: testAdminUser }));
    const tenant = await app.service('tenants').get(testLease.tenantId);
    assert.deepEqual(tenant.leases, [testLease._id]);

    await service.remove(testLease._id, { user: testAdminUser });
    const tenant2 = await app.service('tenants').get(testLease.tenantId);
    assert.deepEqual(tenant2.leases, []);
  });

  // Test for creation of lease Service
  // ======================================================

  it('can create lease as admin', async () => {
    const service = app.service('lease');
    assert.ok(await service.create(testLease, { user: testAdminUser }));
    assert.ok(testLease._id, 'works');

    await service.remove(testLease._id, { user: testAdminUser });
  });

  it('can create lease as landlord', async () => {
    const service = app.service('lease');
    assert.ok(await service.create(testLease, { user: testLandlordUser }));

    await service.remove(testLease._id, { user: testLandlordUser });
  });

  it('cannot create lease as service provider', async () => {
    const service = app.service('lease');
    await service
      .create(testLease, { user: testServiceProviderUser })
      .then(() => service.remove(testLease._id, { user: testAdminUser }))
      .then(() => assert.fail('tried to create lease as Service Provider'))
      .catch(() => {});
  });

  it('cannot create lease as tenant', async () => {
    const service = app.service('lease');
    await service
      .create(testLease, { user: testTenantUser })
      .then(() => service.remove(testLease._id, { user: testAdminUser }))
      .then(() => assert.fail('tried to create lease as Tenant'))
      .catch(() => {});
  });

  // Test for removal of lease Service
  // ======================================================

  it('can  remove as Admin', async () => {
    const service = app.service('lease');
    await service.create(testLease, { user: testAdminUser });
    await service.remove(testLease._id, { user: testAdminUser });
  });

  it('can  remove as Landlord', async () => {
    const service = app.service('lease');
    await service.create(testLease, { user: testAdminUser });
    await service.remove(testLease._id, { user: testLandlordUser });
  });

  it('cannot  remove as Tenant', async () => {
    const service = app.service('lease');
    await service.create(testLease, { user: testAdminUser });
    await service
      .remove(testLease._id, { user: testTenantUser2 })
      .then(() => assert.fail('tried to remove lease as Tenant'))
      .catch(() => {});
    await service.remove(testLease._id, { user: testAdminUser });
  });

  it('cannot  remove as Service Provider', async () => {
    const service = app.service('lease');
    await service.create(testLease, { user: testAdminUser });
    await service
      .remove(testLease._id, { user: testServiceProviderUser })
      .then(() => assert.fail('tried to remove lease as Service Provider'))
      .catch(() => {});
    await service.remove(testLease._id, { user: testAdminUser });
  });

  // Test for patch of lease Service
  // ======================================================

  it('can patch lease as admin', async () => {
    const service = app.service('lease');
    await service.create(testLease, { user: testAdminUser });
    await service.patch(testLease._id, testLease, { user: testAdminUser });
    await service.remove(testLease._id, { user: testAdminUser });
  });

  it('can patch lease as landlord', async () => {
    const service = app.service('lease');
    await service.create(testLease, { user: testAdminUser });
    await service.patch(testLease._id, testLease, { user: testLandlordUser });

    await service.remove(testLease._id, { user: testLandlordUser });
  });

  it('cannot patch lease as tenant', async () => {
    const service = app.service('lease');
    await service.create(testLease, { user: testAdminUser });
    await service
      .patch(testLease._id, testLease, { user: testTenantUser })
      .then(() => assert.fail('tried to patch lease as Tenant'))
      .catch(() => {});
    await service.remove(testLease._id, { user: testAdminUser });
  });

  it('cannot patch lease as ServiceProvider', async () => {
    const service = app.service('lease');
    await service.create(testLease, { user: testAdminUser });
    await service
      .patch(testLease._id, testLease, { user: testServiceProviderUser })
      .then(() => assert.fail('tried to patch lease as Service Provider'))
      .catch(() => {});
    await service.remove(testLease._id, { user: testAdminUser });
  });
});
