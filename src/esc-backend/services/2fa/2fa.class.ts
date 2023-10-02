import { Params } from '@feathersjs/feathers';
import { MemoryService, MemoryServiceOptions } from '@feathersjs/memory';
import { AdapterParams } from '@feathersjs/adapter-commons';
import crypto from 'crypto';
import { EmailService } from '../email/email';

import type { Application } from '../../declarations';
import type {
  TwoFactorAuthentication,
  TwoFactorAuthenticationData,
  TwoFactorAuthenticationAuthenticate,
} from './2fa.schema';

export type {
  TwoFactorAuthentication,
  TwoFactorAuthenticationData,
  TwoFactorAuthenticationAuthenticate,
};

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class TwoFactorAuthenticationService<
  ServiceParams extends Params = AdapterParams
> extends MemoryService<boolean, TwoFactorAuthentication, ServiceParams> {
  emailService?: EmailService;

  static generateCode() {
    return crypto.randomInt(10000);
  }

  static isExpired(expiryTime?: number) {
    return expiryTime === undefined || expiryTime < new Date().getTime();
  }

  // Set expiry to be 5 minutes; this is in milliseconds
  static EXPIRY_DELTA = 5 * 60 * 1000;

  async setup(app: Application) {
    this.emailService = app.service('email');
  }

  async create_code(data: TwoFactorAuthenticationData, _params?: ServiceParams): Promise<any> {
    const code = crypto.randomInt(10000);
    const expiry = new Date().getTime() + TwoFactorAuthenticationService.EXPIRY_DELTA;
    await this._create({ user_id: data.user_id, code, expiry });

    if (process.env.NODE_ENV !== 'test') {
      // FIXME: THIS SHOULD NOT BE PRINTED DURING DEPLOYMENT
      console.log({ ...data, code });
      this.emailService?.create({
        to: data.email,
        subject: '2FA Code',
        html: `Hi ${data.user_id},<br/><br/>Your 2FA code is <b>${code
          .toString()
          .padStart(4, '0')}</b>.<br/>This code is valid for 5 minutes.`,
      });
    }

    return true;
  }

  async authenticate(data: TwoFactorAuthenticationAuthenticate, _params?: ServiceParams) {
    try {
      // Need to do the type casting because the TS compiler thinks it will return a boolean
      const twofa = (await this._get(data.user_id)) as unknown as TwoFactorAuthentication;
      return !TwoFactorAuthenticationService.isExpired(twofa.expiry) && twofa.code === data.code;
    } catch (error) {
      return false;
    }
  }
}

export const getOptions = (_app: Application): MemoryServiceOptions => {
  return {
    id: 'user_id',
    multi: false,
  };
};
