// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication';

import { hooks as schemaHooks } from '@feathersjs/schema';

import {
  tenantDataValidator,
  tenantPatchValidator,
  tenantQueryValidator,
  tenantResolver,
  tenantExternalResolver,
  tenantDataResolver,
  tenantPatchResolver,
  tenantQueryResolver,
} from './tenants.schema';

import type { Application } from '../../declarations';
import { TenantService, getOptions } from './tenants.class';
import { tenantPath, tenantMethods } from './tenants.shared';
import { Forbidden } from '@feathersjs/errors';
import { ValidatorFn, validate } from 'feathers-hooks-common';
import { User, UserType } from '../users/users.schema';

export * from './tenants.class';
export * from './tenants.schema';

// Allow only landlord/admin to create a tenant service
const validateAuthLevel: ValidatorFn = async (value: User, ctx) => {
  if (ctx.params.user.typ === UserType.Admin || ctx.params.user.typ === UserType.Landlord) {
    return null;
  }
  throw new Forbidden('Insufficient permissions');
};

// A configure function that registers the service and its hooks via `app.configure`
export const tenant = (app: Application) => {
  // Register our service on the Feathers application
  app.use(tenantPath, new TenantService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: tenantMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
  });
  // Initialize hooks
  app.service(tenantPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(tenantExternalResolver),
        schemaHooks.resolveResult(tenantResolver),
      ],
    },
    before: {
      all: [
        schemaHooks.validateQuery(tenantQueryValidator),
        schemaHooks.resolveQuery(tenantQueryResolver),
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(tenantDataValidator),
        validate(validateAuthLevel),
        schemaHooks.resolveData(tenantDataResolver),
        (ctx) => {
          ctx.data.leases = [];
        },
      ],
      patch: [
        schemaHooks.validateData(tenantPatchValidator),
        validate(validateAuthLevel),
        schemaHooks.resolveData(tenantPatchResolver),
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
    [tenantPath]: TenantService;
  }
}
