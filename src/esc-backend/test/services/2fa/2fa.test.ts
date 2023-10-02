// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert';
import { app } from '../../../src/app';

describe('2fa service', () => {
  it('registered the service', () => {
    const service = app.service('2fa');

    assert.ok(service, 'Registered the service');
  });

  it('can register code', async () => {
    const service = app.service('2fa');

    assert.ok(
      await service.create_code({ user_id: 'test', email: 'test@email.com' }),
      'Create the code'
    );
    const code = ((await service._get('test')) as any).code;
    assert.ok(await service.authenticate({ user_id: 'test', code }), 'Authenticate with code');
  });

  it('rejects expired code', async () => {
    const service = app.service('2fa');

    assert.ok(await service._create({ user_id: 'test', expiry: 0, code: 0 }), 'Create the code');
    assert.ok(
      !(await service.authenticate({ user_id: 'test', code: 0 })),
      'Could authenticate with expired code'
    );
  });

  it('rejects invalid code', async () => {
    const service = app.service('2fa');

    assert.ok(
      await service.create_code({ user_id: 'test', email: 'test@email.com' }),
      'Create the code'
    );
    const code = ((await service._get('test')) as any).code;
    assert.ok(
      !(await service.authenticate({ user_id: 'test', code: code + 5 })),
      'Could authenticate with wrong code'
    );
  });
});
