// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication';
import { hooks as schemaHooks } from '@feathersjs/schema';
import { Forbidden } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';
import fs from 'fs/promises';
import path from 'path';

const BASE_PATH = path.join(__dirname, '..', '..', '..', 'uploads');

import {
  leaseDataValidator,
  leasePatchValidator,
  leaseQueryValidator,
  leaseResolver,
  leaseExternalResolver,
  leaseDataResolver,
  leasePatchResolver,
  leaseQueryResolver,
} from './lease.schema';

import { UserType } from '../users/users.schema';
import type { Application } from '../../declarations';
import { LeaseService, getOptions } from './lease.class';
import { leasePath, leaseMethods } from './lease.shared';

export * from './lease.class';
export * from './lease.schema';

const validateAuthLevel = (accountTypes: UserType[]) => {
  accountTypes.push(UserType.Admin); // Make sure admin can always access
  accountTypes.push(UserType.Landlord);
  return (ctx: HookContext) => {
    if (!accountTypes.includes(ctx.params.user.typ)) {
      throw new Forbidden('Insufficient permissions');
    }
  };
};

// A configure function that registers the service and its hooks via `app.configure`
export const lease = (app: Application) => {
  // Register our service on the Feathers application
  app.use(leasePath, new LeaseService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: leaseMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
  });
  // Initialize hooks
  app.service(leasePath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(leaseExternalResolver),
        schemaHooks.resolveResult(leaseResolver),
      ],
    },
    before: {
      all: [
        schemaHooks.validateQuery(leaseQueryValidator),
        schemaHooks.resolveQuery(leaseQueryResolver),
      ],
      find: [validateAuthLevel([UserType.Tenant])],
      get: [validateAuthLevel([UserType.Tenant])],
      create: [
        validateAuthLevel([]),
        (ctx) => {
          for (const field of ['monthlyRent', 'commencementDate', 'expiryDate']) {
            if (typeof ctx.data[field] === 'string') {
              ctx.data[field] = parseInt(ctx.data[field]);
            }
          }
        },
        schemaHooks.validateData(leaseDataValidator),
        async (ctx) => {
          // Do not copy file during unit tests
          if (ctx.data.leaseFile !== '' || process.env.NODE_ENV !== 'test') {
            const basename = path.basename(ctx.data.leaseFile);
            const newPath = path.join(BASE_PATH, 'static', basename);
            await fs.copyFile(ctx.data.leaseFile, newPath);
            await fs.rm(ctx.data.leaseFile);
            ctx.data.leaseFile = path.posix.join('static', basename);
          }
          await app.service('tenants').addLease(ctx.data.tenantId, ctx.data._id);
        },
        schemaHooks.resolveData(leaseDataResolver),
      ],
      patch: [
        validateAuthLevel([]),
        schemaHooks.validateData(leasePatchValidator),
        schemaHooks.resolveData(leasePatchResolver),
      ],
      remove: [validateAuthLevel([])],
    },
    after: {
      all: [],
      remove: [
        async (ctx) => {
          await app.service('tenants').removeLease(ctx.result.tenantId, ctx.result._id);
        },
      ],
    },
    error: {
      all: [],
    },
  });
};

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [leasePath]: LeaseService;
  }
}
