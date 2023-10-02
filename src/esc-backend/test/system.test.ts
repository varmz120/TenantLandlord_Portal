import assert from 'assert';
import puppeteer from 'puppeteer';
import { app } from '../src/app';
import { UserData, UserType } from '../src/services/users/users';
import { TwoFactorAuthentication } from '../src/services/2fa/2fa';

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

describe('system tests', () => {
  before(async () => {
    await app.listen(3030);
    console.log(`Feathers app listening`);

    await app.service('users').create(testTenantUser, { user: testAdminUser });
    await app.service('users').create(testAdminUser, { user: testAdminUser });
  });

  after(async () => {
    await app.service('users').remove(testTenantUser._id, { user: testTenantUser });
    await app.service('users').remove(testAdminUser._id, { user: testAdminUser });
    await app.teardown();
  });

  it('can login and logout from frontend', async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.setViewport({ width: 1080, height: 1024 });
    await page.goto('http://localhost:3000');
    await page.waitForSelector('#username');
    assert.strictEqual(page.url(), 'http://localhost:3000/login');

    // Type into search box
    await page.type('#username', testTenantUser._id);
    await page.type('#password', testTenantUser.password ?? '');
    await Promise.all([page.waitForNavigation(), page.click('#submit')]);

    assert.strictEqual(page.url(), 'http://localhost:3000/login2FA');

    const { code } = (await app
      .service('2fa')
      ._get(testTenantUser._id)) as unknown as TwoFactorAuthentication;

    await page.type('#twofa', code.toString().padStart(4, '0'));
    await page.click('#Submit');

    await page.waitForSelector('#logout');
    assert.strictEqual(page.url(), 'http://localhost:3000/tenantDashboard');

    await page.click('#logout');
    await page.waitForSelector('#username');
    assert.strictEqual(page.url(), 'http://localhost:3000/login');

    await browser.close();
  }).timeout(5000);
});
