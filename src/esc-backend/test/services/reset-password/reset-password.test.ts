// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert';
import { app } from '../../../src/app';
import { User, UserType } from '../../../src/services/users/users';
import { ResetPasswordService } from '../../../src/services/reset-password/reset-password.class';

const createUser = (_id: string, typ: UserType): User => ({
  _id: 'reset-password.test.' + _id,
  typ,
  email: _id + '@test.com',
  password: 'password',
});

describe('reset-password service', () => {
  const user = createUser('admin', UserType.Admin);

  before(() => {
    app.service('users').create(user, { user });
  });

  after(() => {
    app.service('users').remove(user._id, { user });
  });

  it('registered the service', () => {
    const service = app.service('reset-password');

    assert.ok(service, 'Registered the service');
  });

  it('resets password after generating link', async () => {
    const userService = app.service('users');
    const service = app.service('reset-password');

    assert.ok(
      await service.create({ user_id: user._id }),
      'could not generate reset password link'
    );

    const resetToken = service.testTokens?.get(user._id);
    assert.ok(resetToken, 'did not create a testTokens');

    const userWithReset = await userService.get(user._id, { user });
    assert.ok(userWithReset.resetPasswordExpiration, 'reset password expiration not set');
    assert.ok(
      !ResetPasswordService.isExpired(userWithReset.resetPasswordExpiration),
      'reset password expired'
    );
    assert.ok(userWithReset.resetPasswordToken, 'reset password token not set');

    assert.ok(
      await service.reset({
        user_id: user._id,
        password: 'some other password',
        token: resetToken,
      }),
      'could not reset password'
    );

    const userAfterReset = await userService.get(user._id, { user });
    assert.ok(!service.testTokens?.has(user._id), 'did not delete from testTokens');
    assert.ok(
      ResetPasswordService.isExpired(userAfterReset.resetPasswordExpiration),
      'reset password not expired'
    );
    // Check password is different
    assert.notStrictEqual(userWithReset.password, userAfterReset.password);
  });

  it('rejects invalid token', async () => {
    const userService = app.service('users');
    const service = app.service('reset-password');

    const user2 = createUser('tenant', UserType.Tenant);
    user2.resetPasswordToken = 'valid-token';
    user2.resetPasswordExpiration = 1;

    await userService._create(user2, { user });

    service
      .reset({ user_id: 'invalid-id', password: 'some other password', token: 'invalid token' })
      .then(() => assert.fail('Reset password with invalid user'))
      .catch(() => {});

    service
      .reset({ user_id: user2._id, password: 'some other password', token: 'invalid token' })
      .then(() => assert.fail('Reset password with invalid token'))
      .catch(() => {});

    service
      .reset({
        user_id: user2._id,
        password: 'some other password',
        token: user2.resetPasswordToken,
      })
      .then(() => assert.fail('Reset password with expired token'))
      .catch(() => {});

    await userService._remove(user2._id);
  });
});
