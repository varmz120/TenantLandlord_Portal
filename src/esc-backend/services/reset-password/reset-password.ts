// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema';

import {
  resetPasswordDataValidator,
  resetPasswordResetValidator,
  resetPasswordDataResolver,
  resetPasswordResetResolver,
} from './reset-password.schema';

import type { Application } from '../../declarations';
import { ResetPasswordService, getOptions } from './reset-password.class';
import { resetPasswordPath, resetPasswordMethods } from './reset-password.shared';

export * from './reset-password.class';
export * from './reset-password.schema';

// A configure function that registers the service and its hooks via `app.configure`
export const resetPassword = (app: Application) => {
  // Register our service on the Feathers application
  app.use(resetPasswordPath, new ResetPasswordService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: resetPasswordMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
  });
  // Initialize hooks
  app.service(resetPasswordPath).hooks({
    around: {
      all: [],
    },
    before: {
      all: [],
      create: [
        schemaHooks.validateData(resetPasswordDataValidator),
        schemaHooks.resolveData(resetPasswordDataResolver),
      ],
      reset: [
        schemaHooks.validateData(resetPasswordResetValidator),
        schemaHooks.resolveData(resetPasswordResetResolver),
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
    [resetPasswordPath]: ResetPasswordService;
  }
}
