// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication';

import { hooks as schemaHooks } from '@feathersjs/schema';

import {
  userDataValidator,
  userPatchValidator,
  userQueryValidator,
  userResolver,
  userExternalResolver,
  userDataResolver,
  userPatchResolver,
  userQueryResolver,
  User,
  UserType,
} from './users.schema';

import type { Application } from '../../declarations';
import { UserService, getOptions } from './users.class';
import { userPath, userMethods } from './users.shared';
import { Forbidden } from '@feathersjs/errors';
import { ValidatorFn, iff, isProvider, validate, isNot } from 'feathers-hooks-common';
import { ResetPasswordService } from '../reset-password/reset-password.class';

export * from './users.class';
export * from './users.schema';

// Allow only landlord/admin to create a tenant account and an admin to create a landlord account
const validateAuthLevel: ValidatorFn = async (value: User, ctx) => {
  if (
    ctx.params.user.typ === UserType.Admin ||
    (ctx.params.user.typ === UserType.Landlord && value.typ < UserType.Landlord)
  ) {
    return null;
  }
  throw new Forbidden('Insufficient permissions');
};

// A configure function that registers the service and its hooks via `app.configure`
export const user = (app: Application) => {
  // Register our service on the Feathers application
  app.use(userPath, new UserService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: userMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
  });
  // Initialize hooks
  app.service(userPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(userExternalResolver),
        schemaHooks.resolveResult(userResolver),
      ],
      find: [authenticate('jwt')],
      get: [authenticate('jwt')],
      create: [authenticate('jwt')],
      update: [authenticate('jwt')],
      patch: [],
      remove: [authenticate('jwt')],
    },
    before: {
      all: [
        schemaHooks.validateQuery(userQueryValidator),
        schemaHooks.resolveQuery(userQueryResolver),
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(userDataValidator),
        validate(validateAuthLevel),
        // If no password is set, generate reset password token by default.
        iff(
          (ctx) => ctx.data.password === undefined,
          (ctx) => {
            const tokenData = ResetPasswordService.generateToken();
            ctx.app
              .service('reset-password')
              .registerToken(ctx.data._id, ctx.data.email, tokenData.resetPasswordToken);
            ctx.data = { ...ctx.data, ...tokenData };
          }
        ),
        (ctx) => {
          ctx.data.notifications = [];
        },
        schemaHooks.resolveData(userDataResolver),
      ],
      patch: [
        iff(isNot(isProvider('server')), authenticate('jwt')),
        schemaHooks.validateData(userPatchValidator),
        schemaHooks.resolveData(userPatchResolver),
      ],
      remove: [],
    },
    after: {
      all: [],
    },
    error: {
      all: [],
    },
  });
};

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [userPath]: UserService;
  }
}
