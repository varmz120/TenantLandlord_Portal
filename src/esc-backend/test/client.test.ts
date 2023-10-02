// For more information about this file see https://dove.feathersjs.com/guides/cli/client.test.html
import assert from 'assert';
import axios from 'axios';
import fs from 'fs/promises';

import rest from '@feathersjs/rest-client';
import { app } from '../src/app';
import { createClient } from '../src/client';
import type { UserData } from '../src/client';
import { UserType } from '../src/services/users/users.schema';
import { TwoFactorAuthentication } from '../src/services/2fa/2fa.schema';

const port = app.get('port');
const appUrl = `http://${app.get('host')}:${port}`;

const testTenantUser: UserData = {
  _id: 'tenant',
  password: 'supersecret',
  email: 'tenant@test.com',
  typ: UserType.Tenant,
};
const testAdminUser = {
  _id: 'admin',
  typ: UserType.Admin,
  email: 'admin@test.com',
  password: 'supersecret',
};

describe('application client tests', () => {
  const client = createClient(rest(appUrl).axios(axios));

  before(async () => {
    await app.listen(port);

    await app.service('users').create(testTenantUser, { user: testAdminUser });
    await app.service('users').create(testAdminUser, { user: testAdminUser });
  });

  after(async () => {
    await app.service('users').remove(testTenantUser._id, { user: testTenantUser });
    await app.service('users').remove(testAdminUser._id, { user: testAdminUser });
    await app.teardown();
  });

  it('initialized the client', () => {
    assert.ok(client);
  });

  it('authenticates a user with email and password', async () => {
    const userData: UserData = {
      _id: 'username',
      password: 'supersecret',
      email: 'someone@test.com',
      typ: UserType.Tenant,
    };

    await app.service('users').create(userData, { user: testAdminUser });

    await client.get2FA({
      strategy: 'local',
      ...userData,
    });

    const { code } = (await app
      .service('2fa')
      ._get(userData._id)) as unknown as TwoFactorAuthentication;

    const { user, accessToken } = await client.authenticate({
      strategy: 'local',
      ...userData,
      code,
    });

    assert.ok(accessToken, 'Created access token for user');
    assert.ok(user, 'Includes user in authentication data');
    assert.strictEqual(user.password, undefined, 'Password is hidden to clients');

    await client.logout();

    // Remove the test user on the server
    await app.service('users').remove(user._id, { user: userData });
  });

  it('generates a user without password, sets it and authenticates', async () => {
    const userData: UserData = {
      _id: 'user2',
      email: 'user2@test.com',
      typ: UserType.Tenant,
    };

    await app.service('users').create(userData, { user: testAdminUser });

    const token = app.service('reset-password').testTokens?.get(userData._id);
    assert.ok(token, "user service didn't generate password link");
    await client
      .service('reset-password')
      .reset({ user_id: userData._id, password: 'password', token });

    await client.get2FA({
      strategy: 'local',
      _id: userData._id,
      password: 'password',
    });

    const { code } = (await app
      .service('2fa')
      ._get(userData._id)) as unknown as TwoFactorAuthentication;

    const { user, accessToken } = await client.authenticate({
      strategy: 'local',
      _id: userData._id,
      password: 'password',
      code,
    });

    assert.ok(accessToken, 'Created access token for user');
    assert.ok(user, 'Includes user in authentication data');
    assert.strictEqual(user.password, undefined, 'Password is hidden to clients');

    await client.logout();

    // Remove the test user on the server
    await app.service('users').remove(user._id, { user: userData });
  });

  it('creates a lease and ticket with attachements', async () => {
    const tenant = {
      _id: 'tenant',
      name: 'Name',
      address: 'Address',
      leases: [],
    };

    await app.service('tenants').create(tenant, { user: testAdminUser });

    await client.get2FA({
      strategy: 'local',
      ...testAdminUser,
    });

    const { code } = (await app
      .service('2fa')
      ._get(testAdminUser._id)) as unknown as TwoFactorAuthentication;

    await client.authenticate({
      strategy: 'local',
      ...testAdminUser,
      code,
    });

    const test1 = await fs.readFile(__dirname + '/test1.png');
    const test2 = await fs.readFile(__dirname + '/test2.png');

    const leaseForm = new FormData();
    leaseForm.set('_id', 'lease');
    leaseForm.set('userId', testTenantUser._id);
    leaseForm.set('tenantId', tenant._id);
    leaseForm.set('units[0][number]', 'B1-01');
    leaseForm.set('units[0][buildingId]', 'building-id');
    leaseForm.set('units[0][leaseId]', 'lease');
    leaseForm.set('commencementDate', new Date().getTime().toString());
    leaseForm.set('expiryDate', (new Date().getTime() + 10000000).toString());
    leaseForm.set('monthlyRent', '2000');
    leaseForm.set('leaseFile', new File([test1], 'test.png', { type: 'image/png' }));

    const lease = await client.service('lease').create(leaseForm as any, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const test_uploadPath = __dirname + '/../uploads/' + lease.leaseFile;
    const test_upload = await fs.readFile(test_uploadPath);
    assert.ok(test1.equals(test_upload), "Lease file wasn't uploaded correctly");

    const ticketForm = new FormData();

    ticketForm.set('leaseId', 'lease');
    ticketForm.set('title', 'Test lease');
    ticketForm.set('description', 'Test description.');
    ticketForm.set('requestType', 'Cleaning');
    ticketForm.set('contact[name]', 'Tenant');
    ticketForm.set('contact[email]', 'tenant@email.com');
    ticketForm.set('contact[number]', '43120150');
    ticketForm.append('attachements', new File([test1], 'test1.png', { type: 'image/png' }));
    ticketForm.append('attachements', new File([test2], 'test2.png', { type: 'image/png' }));

    // The type cast is needed since it doesn't expect FormData
    const ticket = await client.service('ticket').create(ticketForm as any, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    assert.ok(ticket._id, 'Ticket created');
    assert.ok(ticket.attachements);

    const test1_uploadPath = __dirname + '/../uploads/' + ticket.attachements[0];
    const test2_uploadPath = __dirname + '/../uploads/' + ticket.attachements[1];

    const test1_upload = await fs.readFile(test1_uploadPath);
    const test2_upload = await fs.readFile(test2_uploadPath);

    assert.ok(test1.equals(test1_upload), "First attachement wasn't uploaded correctly");
    assert.ok(test2.equals(test2_upload), "Second attachement wasn't uploaded correctly");

    await app.service('ticket').remove(ticket._id, { user: testAdminUser });
    await app.service('lease').remove(lease._id, { user: testAdminUser });
    await app.service('tenants').remove(tenant._id, { user: testAdminUser });

    fs.stat(test_uploadPath)
      .then(() => assert.fail("Lease upload wasn't deleted"))
      .catch(() => {});
    fs.stat(test1_uploadPath)
      .then(() => assert.fail("Upload 1 wasn't deleted"))
      .catch(() => {});
    fs.stat(test2_uploadPath)
      .then(() => assert.fail("Upload 2 wasn't deleted"))
      .catch(() => {});

    await client.logout();
  });
});
