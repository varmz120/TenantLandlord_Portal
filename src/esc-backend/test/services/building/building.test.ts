// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert';
import { app } from '../../../src/app';
import { User, UserType } from '../../../src/services/users/users.schema';

const createUser = (_id: string, typ: UserType): User => ({
  _id: 'lease.test.' + _id,
  typ,
  email: _id + '@test.com',
  password: 'password',
});

describe('building service', () => {
  const testAdminUser = createUser('test-admin', UserType.Admin);
  const testTenantUser = createUser('test-tenant', UserType.Tenant);
  const testLandlordUser = createUser('test-landlord', UserType.Landlord);
  const buildingData = [
    { _id: 'building-1', name: 'Test Building 1', address: '123 Main Street', requestTypes: [] },
    { _id: 'building-2', name: 'Test Building 2', address: '456 Elm Street', requestTypes: [] },
  ];

  let buildingIDs: string[] = [];

  before(async function () {
    try {
      const createdBuildings = await Promise.all(
        buildingData.map((data) => app.service('building').create(data, { user: testAdminUser }))
      );
      buildingIDs = createdBuildings.map((building) => building._id);
    } catch (error) {
      console.error('Error in before hook:', error);
    }
  });

  after(async () => {
    const buildingService = app.service('building');
    const deletePromises = buildingIDs.map((id) =>
      buildingService.remove(id, { user: testAdminUser })
    );
    await Promise.all(deletePromises);
    // Clear the IDs after deletion
    buildingIDs = [];
  });

  it('registered the service', () => {
    const service = app.service('building');
    assert.ok(service, 'Registered the service');
  });

  it('creates a new building', async () => {
    const data = buildingData[0]; // use the first building data
    data._id = 'building-3';
    const createdBuilding = await app.service('building').create(data, { user: testAdminUser });
    assert.ok(createdBuilding._id, 'Building created successfully');
    assert.strictEqual(createdBuilding.name, data.name, 'Building name is correct');
    assert.strictEqual(createdBuilding.address, data.address, 'Building address is correct');
    await app.service('building')._remove(data._id);
  });

  it('tenant cannot create a new building', async () => {
    const data = buildingData[0]; // use the first building data
    data._id = 'building-4';
    try {
      const createdBuilding = await app.service('building').create(data, { user: testTenantUser });
      // If it doesn't throw an error, that means building was created which is not expected
      assert.fail('Building creation should not have succeeded for a tenant user');
    } catch (error) {
      if (error instanceof Error) {
        assert.strictEqual(error.name, 'Forbidden', 'Should throw forbidden error for tenant user');
      }
    }
  });

  it('landlord cannot create a new building', async () => {
    const data = buildingData[0]; // use the first building data
    data._id = 'building-4';
    try {
      const createdBuilding = await app
        .service('building')
        .create(data, { user: testLandlordUser });
      // If it doesn't throw an error, that means building was created which is not expected
      assert.fail('Building creation should not have succeeded for a landlord user');
    } catch (error) {
      if (error instanceof Error) {
        assert.strictEqual(
          error.name,
          'Forbidden',
          'Should throw forbidden error for landlord user'
        );
      }
    }
  });

  it('gets a building', async () => {
    const buildingName = buildingData[0].name; // Use the name of the first created building
    const retrievedBuilding = await app.service('building').get(buildingIDs[0]);
    assert.strictEqual(
      retrievedBuilding.name,
      buildingName,
      'Retrieved building name matches requested name'
    );
    // You can add more assertions here to check other properties of the retrieved building
  });

  it('updates a building', async () => {
    const updatedBuildingData = {
      name: 'Updated Building',
    };

    const updatedBuilding = await app
      .service('building')
      .patch(buildingIDs[0], updatedBuildingData, { user: testAdminUser });
    assert.strictEqual(updatedBuilding.name, 'Updated Building', 'Building name is updated');
  });

  it('removes a building', async () => {
    const buildingData = {
      _id: 'building-id',
      name: 'Sample Building for Deletion',
      address: '123 Deletion Street',
      requestTypes: [],
    };

    // Create a building just for this test
    const createdBuilding = await app
      .service('building')
      .create(buildingData, { user: testAdminUser });

    // Remove the created building
    await app.service('building').remove(createdBuilding._id, { user: testAdminUser });

    try {
      // Try to retrieve the removed building
      await app.service('building').get(createdBuilding._id);
      assert.fail('Building was not removed');
    } catch (error) {
      assert.strictEqual((error as Error).name, 'NotFound', 'Building not found after removal');
    }
  });

  //test case below assumes name parameter is required
  it('fails to create a building with invalid data', async () => {
    const invalidBuildingData = {
      _id: 'building-id',
      name: '', // Invalid data: missing required name property
      address: '123 Main Street',
      requestTypes: [],
    };

    try {
      await app.service('building').create(invalidBuildingData);
      assert.fail('Building creation should have failed');
    } catch (error) {
      assert.ok(error, 'An error was thrown as expected');
    }
  });

  it('tenant cannot update a building', async () => {
    const updateData = {
      _id: 'id',
      name: 'Updated Name',
      address: '123 Updated Street',
      requestTypes: [],
    };
    try {
      await app.service('building').update(buildingIDs[0], updateData, { user: testTenantUser });
      assert.fail('Building update should not have succeeded for a tenant user');
    } catch (error) {
      if (error instanceof Error) {
        assert.strictEqual(error.name, 'Forbidden', 'Should throw forbidden error for tenant user');
      }
    }
  });

  it('tenant cannot patch a building', async () => {
    const patchData = { name: 'Updated Name', address: '123 Updated Street' };
    try {
      await app.service('building').patch(buildingIDs[0], patchData, { user: testTenantUser });
      assert.fail('Building patch should not have succeeded for a tenant user');
    } catch (error) {
      if (error instanceof Error) {
        assert.strictEqual(error.name, 'Forbidden', 'Should throw forbidden error for tenant user');
      }
    }
  });

  it('landlord cannot patch a building other than req types', async () => {
    const patchData = { name: 'Updated Name', address: '123 Updated Street' };
    try {
      await app.service('building').patch(buildingIDs[0], patchData, { user: testLandlordUser });
      // console.log('here');
      assert.fail('Building patch should not have succeeded for a landlord user');
    } catch (error) {
      if (error instanceof Error) {
        assert.strictEqual(
          error.name,
          'Forbidden',
          'Should throw forbidden error for landlord user'
        );
      }
    }
  });

  it('landlord can patch req types', async () => {
    const patchData = { requestTypes: ['testtype1', 'testtype2'] };
    try {
      await app
        .service('building')
        .patch(buildingIDs[0], patchData, { user: testLandlordUser })
        .then(async () => {
          await app
            .service('building')
            .get(buildingIDs[0])
            .then((res) => {
              assert.deepStrictEqual(res.requestTypes, patchData.requestTypes);
            });
        });
    } catch (error) {
      if (error instanceof Error) {
        assert.strictEqual(
          error.name,
          'Forbidden',
          'Should throw forbidden error for landlord user'
        );
      }
    }
  });

  it('tenant cannot remove a building', async () => {
    try {
      await app.service('building').remove(buildingIDs[0], { user: testTenantUser });
      assert.fail('Building removal should not have succeeded for a tenant user');
    } catch (error) {
      if (error instanceof Error) {
        assert.strictEqual(error.name, 'Forbidden', 'Should throw forbidden error for tenant user');
      }
    }
  });

  it('landlord cannot remove a building', async () => {
    try {
      await app.service('building').remove(buildingIDs[0], { user: testLandlordUser });
      assert.fail('Building removal should not have succeeded for a landlord user');
    } catch (error) {
      if (error instanceof Error) {
        assert.strictEqual(
          error.name,
          'Forbidden',
          'Should throw forbidden error for landlord user'
        );
      }
    }
  });
});
