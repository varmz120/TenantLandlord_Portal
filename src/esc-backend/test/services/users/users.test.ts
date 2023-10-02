// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert';
import { app } from '../../../src/app';
import { User, UserType } from '../../../src/services/users/users.schema';

const createUser = (_id: string, typ: UserType): User => ({
  _id: 'users.test.' + _id,
  typ,
  email: _id + '@test.com',
  password: 'password',
});

describe('users service', () => {
  it('registered the service', () => {
    const service = app.service('users');

    assert.ok(service, 'Registered the service');
  });

  it('can create as admin', async () => {
    const service = app.service('users');

    const testAdminUser = createUser('test-admin', UserType.Admin);

    const admin = createUser('admin-admin', UserType.Admin);
    const landlord = createUser('admin-landlord', UserType.Landlord);
    const serviceProvider = createUser('admin-service-provider', UserType.ServiceProvider);
    const tenant = createUser('admin-tenant', UserType.Tenant);

    assert.ok(await service.create(admin, { user: testAdminUser }));
    assert.ok(await service.create(landlord, { user: testAdminUser }));
    assert.ok(await service.create(serviceProvider, { user: testAdminUser }));
    assert.ok(await service.create(tenant, { user: testAdminUser }));

    await service.remove(admin._id, { user: admin });
    await service.remove(landlord._id, { user: landlord });
    await service.remove(serviceProvider._id, { user: serviceProvider });
    await service.remove(tenant._id, { user: tenant });
  });

  it('can create as landlord', async () => {
    const service = app.service('users');

    const testLandlordUser = createUser('test-landlord', UserType.Landlord);

    const admin = createUser('landlord-admin', UserType.Admin);
    const landlord = createUser('landlord-landlord', UserType.Landlord);
    const serviceProvider = createUser('landlord-service-provider', UserType.ServiceProvider);
    const tenant = createUser('landlord-tenant', UserType.Tenant);

    service
      .create(admin, { user: testLandlordUser })
      .then(() => assert.fail('Created admin user as landlord'))
      .catch(() => {});
    service
      .create(landlord, { user: testLandlordUser })
      .then(() => assert.fail('Created landlord user as landlord'))
      .catch(() => {});
    assert.ok(await service.create(serviceProvider, { user: testLandlordUser }));
    assert.ok(await service.create(tenant, { user: testLandlordUser }));

    await service.remove(serviceProvider._id, { user: serviceProvider });
    await service.remove(tenant._id, { user: tenant });
  });

  it('cannot create as service provider', async () => {
    const service = app.service('users');

    const testServiceProviderUser = createUser('test-service-provider', UserType.ServiceProvider);

    const admin = createUser('service-provider-admin', UserType.Admin);
    const landlord = createUser('service-provider-landlord', UserType.Landlord);
    const serviceProvider = createUser(
      'service-provider-service-provider',
      UserType.ServiceProvider
    );
    const tenant = createUser('service-provider-tenant', UserType.Tenant);

    service
      .create(admin, { user: testServiceProviderUser })
      .then(() => assert.fail('Created admin user as service provider'))
      .catch(() => {});
    service
      .create(landlord, { user: testServiceProviderUser })
      .then(() => assert.fail('Created landlord user as service provider'))
      .catch(() => {});
    service
      .create(serviceProvider, { user: testServiceProviderUser })
      .then(() => assert.fail('Created service provider user as service provider'))
      .catch(() => {});
    service
      .create(tenant, { user: testServiceProviderUser })
      .then(() => assert.fail('Created tenant user as service provider'))
      .catch(() => {});
  });

  it('cannot create as tenant', async () => {
    const service = app.service('users');

    const testTenantUser = createUser('test-tenant', UserType.Tenant);

    const admin = createUser('tenant-admin', UserType.Admin);
    const landlord = createUser('tenant-landlord', UserType.Landlord);
    const serviceProvider = createUser('tenant-service-provider', UserType.ServiceProvider);
    const tenant = createUser('tenant-tenant', UserType.Tenant);

    service
      .create(admin, { user: testTenantUser })
      .then(() => assert.fail('Created admin user as tenant'))
      .catch(() => {});
    service
      .create(landlord, { user: testTenantUser })
      .then(() => assert.fail('Created landlord user as tenant'))
      .catch(() => {});
    service
      .create(serviceProvider, { user: testTenantUser })
      .then(() => assert.fail('Created service provider user as tenant'))
      .catch(() => {});
    service
      .create(tenant, { user: testTenantUser })
      .then(() => assert.fail('Created tenant user as tenant'))
      .catch(() => {});
  });
});
