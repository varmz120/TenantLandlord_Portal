// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers';
import { MongoDBService } from '@feathersjs/mongodb';
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb';

import type { Application } from '../../declarations';
import type { User, UserData, UserPatch, UserQuery } from './users.schema';
import { EmailService } from '../email/email';

export type { User, UserData, UserPatch, UserQuery };

export interface UserParams extends MongoDBAdapterParams<UserQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class UserService<ServiceParams extends Params = UserParams> extends MongoDBService<
  User,
  UserData,
  UserParams,
  UserPatch
> {
  emailService?: EmailService;

  async setup(app: Application) {
    this.emailService = app.service('email');
  }

  async pushNotification(userId: string, text: string) {
    const { email } = await this._patch(
      userId,
      // cast as any because the type system thinks this is an error. However, it is allowed
      { $push: { notifications: { text, timestamp: new Date().getTime() } } } as any
    );

    if (process.env.NODE_ENV !== 'test') {
      await this.emailService?.create({
        to: email,
        subject: 'Notification',
        html: text,
      });
    }
  }
}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('users')),
  };
};
