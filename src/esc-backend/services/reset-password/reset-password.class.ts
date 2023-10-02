// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import type { Params, ServiceInterface } from '@feathersjs/feathers';

import crypto from 'crypto';
import bcrypt from 'bcryptjs';

import type { Application } from '../../declarations';
import type { CreateResetPassword, VerifyResetPassword } from './reset-password.schema';
import { UserService } from '../users/users.class';
import { Forbidden } from '@feathersjs/errors';
import { EmailService } from '../email/email';

export type { CreateResetPassword, VerifyResetPassword };

export interface ResetPasswordServiceOptions {
  app: Application;
}

export interface ResetPasswordParams extends Params {}

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class ResetPasswordService<ServiceParams extends ResetPasswordParams = ResetPasswordParams>
  implements ServiceInterface<void, CreateResetPassword, ServiceParams, VerifyResetPassword>
{
  userService?: UserService;
  emailService?: EmailService;

  clientUrl: string = '';

  // Store the reset password links so that it can be accessed during testing. In non testing
  // environment this is null
  public testTokens: Map<string, string> | null = null;

  constructor(public options: ResetPasswordServiceOptions) {}

  // Set expiry to be 3 days; this is in milliseconds
  static EXPIRY_DELTA = 3 * 24 * 60 * 60 * 1000;

  static isExpired(expiryTime?: number) {
    return expiryTime === undefined || expiryTime < new Date().getTime();
  }

  static generateToken() {
    const resetPasswordToken = crypto.randomBytes(20).toString('hex');
    // Set expiry for three days from now
    const resetPasswordExpiration = new Date().getTime() + this.EXPIRY_DELTA;

    return { resetPasswordToken, resetPasswordExpiration };
  }

  registerToken(user_id: string, email: string, token: string) {
    if (this.testTokens !== null) {
      // During test keep track of links
      this.testTokens.set(user_id, token);
    } else {
      // FIXME: THIS SHOULD NOT BE PRINTED DURING DEPLOYMENT
      console.log({ user_id, token });
      const link = `${this.clientUrl}/reset-password?user_id=${user_id}&token=${token}`;
      this.emailService?.create({
        to: email,
        subject: 'Set Password',
        html: `Hi ${user_id},<br/><br/>You can set your password with <a href="${link}">here</a>. If the above link doesn't work, paste <a href="${link}">${link}</a> into your browser.<br/>This link is valid for 3 days.`,
      });
    }
  }

  async setup(app: Application) {
    this.userService = app.service('users');
    this.emailService = app.service('email');
    this.clientUrl = app.get('clientUrl');

    if (process.env.NODE_ENV === 'test') {
      this.testTokens = new Map();
    }
  }

  async create(data: CreateResetPassword, params?: ServiceParams): Promise<any> {
    // Make this an internal call
    delete params?.provider;

    const tokenData = ResetPasswordService.generateToken();

    const user = await this.userService?.patch(data.user_id, tokenData, params);

    if (user === undefined) throw new Error();
    this.registerToken(data.user_id, user.email, tokenData.resetPasswordToken);

    return { status: 'ok' };
  }

  // This method has to be added to the 'methods' option to make it available to clients
  async reset(data: VerifyResetPassword, params?: ServiceParams): Promise<any> {
    const user = await this.userService?._get(data.user_id);

    // Make sure user exists
    if (user === undefined) throw new Forbidden('invalid reset password link');

    // ...and has a reset password token which matches
    if (
      user.resetPasswordToken === undefined ||
      !(await bcrypt.compare(data.token, user.resetPasswordToken))
    ) {
      throw new Forbidden('invalid reset password link');
    }

    // ...and the token has not expired
    if (ResetPasswordService.isExpired(user.resetPasswordExpiration)) {
      throw new Forbidden('invalid reset password link');
    }

    // Make this an internal call
    delete params?.provider;

    await this.userService?.patch(
      user._id,
      {
        password: data.password,
        resetPasswordExpiration: 0, // Expire the password
      },
      params
    );

    if (this.testTokens !== null) {
      // During test keep track of links
      this.testTokens.delete(user._id);
    }

    return { status: 'ok' };
  }
}

export const getOptions = (app: Application) => {
  return { app };
};
