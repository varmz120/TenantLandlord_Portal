// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert';
import { app } from '../../../src/app';
import { Tenant, TenantData, tenantDataSchema } from '../../../src/services/tenants/tenants.schema';
import { User, UserType } from '../../../src/services/users/users.schema';

const createTenant = (_id: string, name: string, address: string): Tenant => ({
  _id: 'tenant.test.' + _id,
  name: name,
  address: address,
  leases: [],
});

const createUser = (_id: string, typ: UserType): User => ({
  _id: 'tenant.test.' + _id,
  typ,
  email: _id + '@test.com',
  password: 'password',
});

describe('tenants service', () => {
  it('registered the service', () => {
    const service = app.service('tenants');

    assert.ok(service, 'Registered the service');
  });

  // Test for creation of Tenant Service
  // ======================================================
  it('can create tenant as admin', async () => {
    const service = app.service('tenants');

    const testAdminUser = createUser('test-admin', UserType.Admin);
    const testTenant = createTenant('0', '7-11', 'Changi City Point');
    assert.ok(await service.create(testTenant, { user: testAdminUser }));

    await service.remove(testTenant._id);
  });

  it('can create tenant as landlord', async () => {
    const service = app.service('tenants');

    const testLandlordUser = createUser('test-landlord', UserType.Landlord);
    const testTenant = createTenant('0', '7-11', 'Changi City Point');
    assert.ok(await service.create(testTenant, { user: testLandlordUser }));

    await service.remove(testTenant._id);
  });

  it('cannot create tenant as service provider', async () => {
    const service = app.service('tenants');

    const testServiceProviderUser = createUser('test-serviceprovider', UserType.ServiceProvider);
    const testTenant = createTenant('0', '7-11', 'Changi City Point');
    service
      .create(testTenant, { user: testServiceProviderUser })
      .then(() => assert.fail('Created tenant as tenant'))
      .catch(() => {});
  });

  it('cannot create tenant as tenant', async () => {
    const service = app.service('tenants');

    const testTenantUser = createUser('test-tenant', UserType.Tenant);
    const testTenant = createTenant('0', '7-11', 'Changi City Point');
    service
      .create(testTenant, { user: testTenantUser })
      .then(() => assert.fail('Created tenant as tenant'))
      .catch(() => {});
  });
  // ======================================================

  // Test for adding lease to Tenant Service
  // ======================================================
  it('can add lease as tenant as admin', async () => {
    const testAdminUser = createUser('test-admin', UserType.Admin);
    const testTenant = createTenant('0', '7-11', 'Changi City Point');
    const testLeaseID = '0';
    const service = app.service('tenants');
    await service.create(testTenant, { user: testAdminUser });
    await service.addLease(testTenant._id, testLeaseID, { user: testAdminUser });

    await service.remove(testTenant._id);
  });

  it('can add lease as tenant as landlord', async () => {
    const testLandlordUser = createUser('test-landlord', UserType.Landlord);
    const testTenant = createTenant('0', '7-11', 'Changi City Point');
    const testLeaseID = '0';
    const service = app.service('tenants');
    await service.create(testTenant, { user: testLandlordUser });
    await service.addLease(testTenant._id, testLeaseID, { user: testLandlordUser });

    await service.remove(testTenant._id);
  });

  it('cannot add lease as tenant as service provider', async () => {
    const testServiceProviderUser = createUser('test-serviceprovider', UserType.ServiceProvider);
    const testLandlordUser = createUser('test-landlord', UserType.Landlord);

    const testTenant = createTenant('0', '7-11', 'Changi City Point');
    const testLeaseID = '0';
    const service = app.service('tenants');
    await service.create(testTenant, { user: testLandlordUser }); // Landlord creates tenant for the user to add lease
    service
      .addLease(testTenant._id, testLeaseID, { user: testServiceProviderUser })
      .then(() => assert.fail('Added lease as service provider'))
      .catch(() => {});
    await service.remove(testTenant._id);
  });

  it('cannot add lease as tenant as tenant', async () => {
    const testTenantUser = createUser('test-tenant', UserType.Tenant);
    const testLandlordUser = createUser('test-landlord', UserType.Landlord);

    const testTenant = createTenant('0', '7-11', 'Changi City Point');
    const testLeaseID = '0';
    const service = app.service('tenants');
    await service.create(testTenant, { user: testLandlordUser }); // Landlord creates tenant for the user to add lease
    service
      .addLease(testTenant._id, testLeaseID, { user: testTenantUser })
      .then(() => assert.fail('Added lease as tenant'))
      .catch(() => {});

    await service.remove(testTenant._id);
  });
  // ======================================================

  // Test for removing lease to Tenant Service
  // ======================================================

  it('can remove lease as tenant as admin', async () => {
    const testAdminUser = createUser('test-admin', UserType.Admin);
    const testTenant = createTenant('0', '7-11', 'Changi City Point');
    const testLeaseID = '0';
    const service = app.service('tenants');
    await service.create(testTenant, { user: testAdminUser });
    await service.addLease(testTenant._id, testLeaseID, { user: testAdminUser });
    await service.removeLease(testTenant._id, testLeaseID, { user: testAdminUser });

    await service.remove(testTenant._id);
  });

  it('can remove lease as tenant as landlord', async () => {
    const testLandlordUser = createUser('test-landlord', UserType.Landlord);
    const testTenant = createTenant('0', '7-11', 'Changi City Point');
    const testLeaseID = '0';
    const service = app.service('tenants');
    await service.create(testTenant, { user: testLandlordUser });
    await service.addLease(testTenant._id, testLeaseID, { user: testLandlordUser });
    await service.removeLease(testTenant._id, testLeaseID, { user: testLandlordUser });

    await service.remove(testTenant._id);
  });

  it('cannot remove lease as tenant as service provider', async () => {
    const testServiceProviderUser = createUser('test-serviceprovider', UserType.ServiceProvider);
    const testLandlordUser = createUser('test-landlord', UserType.Landlord);

    const testTenant = createTenant('0', '7-11', 'Changi City Point');
    const testLeaseID = '0';
    const service = app.service('tenants');
    await service.create(testTenant, { user: testLandlordUser }); // Landlord creates tenant for the user to remove lease
    await service.addLease(testTenant._id, testLeaseID, { user: testLandlordUser }); // Landlord add lease for the user to remove lease
    service
      .removeLease(testTenant._id, testLeaseID, { user: testServiceProviderUser })
      .then(() => assert.fail('Removed lease as service provider'))
      .catch(() => {});

    await service.remove(testTenant._id);
  });

  it('cannot remove lease as tenant as tenant', async () => {
    const testTenantUser = createUser('test-tenant', UserType.Tenant);
    const testLandlordUser = createUser('test-landlord', UserType.Landlord);

    const testTenant = createTenant('0', '7-11', 'Changi City Point');
    const testLeaseID = '0';
    const service = app.service('tenants');
    await service.create(testTenant, { user: testLandlordUser }); // Landlord creates tenant for the user to remove lease
    await service.addLease(testTenant._id, testLeaseID, { user: testLandlordUser }); // Landlord add lease for the user to remove lease
    service
      .removeLease(testTenant._id, testLeaseID, { user: testTenantUser })
      .then(() => assert.fail('Removed lease as tenant'))
      .catch(() => {});

    await service.remove(testTenant._id);
  });
  // ======================================================
});
