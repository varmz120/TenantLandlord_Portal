// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication';

import { hooks as schemaHooks } from '@feathersjs/schema';

import {
  twoFactorAuthenticationDataValidator,
  twoFactorAuthenticationAuthenticateValidator,
  twoFactorAuthenticationResolver,
  twoFactorAuthenticationDataResolver,
  twoFactorAuthenticationAuthenticateResolver,
} from './2fa.schema';

import type { Application } from '../../declarations';
import { TwoFactorAuthenticationService, getOptions } from './2fa.class';
import { twoFactorAuthenticationPath, twoFactorAuthenticationMethods } from './2fa.shared';
import { disallow } from 'feathers-hooks-common';

export * from './2fa.class';
export * from './2fa.schema';

// A configure function that registers the service and its hooks via `app.configure`
export const twoFactorAuthentication = (app: Application) => {
  // Register our service on the Feathers application
  app.use(twoFactorAuthenticationPath, new TwoFactorAuthenticationService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: twoFactorAuthenticationMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
  });
  // Initialize hooks
  app.service(twoFactorAuthenticationPath).hooks({
    around: {
      all: [schemaHooks.resolveResult(twoFactorAuthenticationResolver)],
    },
    before: {
      all: [disallow('external')],
      create_code: [
        schemaHooks.validateData(twoFactorAuthenticationDataValidator),
        schemaHooks.resolveData(twoFactorAuthenticationDataResolver),
      ],
      authenticate: [
        schemaHooks.validateData(twoFactorAuthenticationAuthenticateValidator),
        schemaHooks.resolveData(twoFactorAuthenticationAuthenticateResolver),
      ],
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
    [twoFactorAuthenticationPath]: TwoFactorAuthenticationService;
  }
}
