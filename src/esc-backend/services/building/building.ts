// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication';

import { hooks as schemaHooks } from '@feathersjs/schema';
import { ValidatorFn, validate } from 'feathers-hooks-common';
import { User, UserType } from '../users/users.schema';

import {
  buildingDataValidator,
  buildingPatchValidator,
  buildingQueryValidator,
  buildingResolver,
  buildingExternalResolver,
  buildingDataResolver,
  buildingPatchResolver,
  buildingQueryResolver,
} from './building.schema';

import type { Application } from '../../declarations';
import { BuildingService, getOptions } from './building.class';
import { buildingPath, buildingMethods } from './building.shared';
import { Forbidden } from '@feathersjs/errors';
import { Hook, HookContext } from '@feathersjs/feathers';

export * from './building.class';
export * from './building.schema';

const validateAuthLevel: ValidatorFn = async (_value: any, ctx) => {
  if (ctx.params.user.typ === UserType.Admin) {
    return null;
  }
  throw new Forbidden('Insufficient permissions');
};

const requireAdmin = async (context: HookContext) => {
  if (context.params.user.typ !== UserType.Admin) {
    throw new Forbidden('Insufficient permissions');
  }
  return context;
};

const requireLandlordOrAdmin = async (context: HookContext) => {
  if (context.params.user.typ !== UserType.Landlord && context.params.user.typ !== UserType.Admin) {
    throw new Forbidden('Only landlords or admins are allowed');
  }

  const keys = Object.keys(context.data);
  if (context.params.user.typ == UserType.Landlord) {
    if (keys.length !== 1 || keys[0] !== 'requestTypes') {
      throw new Forbidden('Landlords can only modify the requestTypes property');
    }
  }

  return context;
};

// A configure function that registers the service and its hooks via `app.configure`
export const building = (app: Application) => {
  // Register our service on the Feathers application
  app.use(buildingPath, new BuildingService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: buildingMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
  });
  // Initialize hooks
  app.service(buildingPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(buildingExternalResolver),
        schemaHooks.resolveResult(buildingResolver),
      ],
    },
    before: {
      all: [
        schemaHooks.validateQuery(buildingQueryValidator),
        schemaHooks.resolveQuery(buildingQueryResolver),
      ],
      find: [],
      get: [],
      create: [
        requireAdmin,
        schemaHooks.validateData(buildingDataValidator),
        schemaHooks.resolveData(buildingDataResolver),
      ],
      patch: [
        requireLandlordOrAdmin,

        // validate(validateAuthLevel),
        schemaHooks.validateData(buildingPatchValidator),
        schemaHooks.resolveData(buildingPatchResolver),
      ],
      update: [
        validate(validateAuthLevel),
        schemaHooks.validateData(buildingDataValidator),
        schemaHooks.resolveData(buildingDataResolver),
      ],
      remove: [requireAdmin],
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
    [buildingPath]: BuildingService;
  }
}
