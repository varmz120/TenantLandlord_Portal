// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication';
import { Forbidden } from '@feathersjs/errors';
import { hooks as schemaHooks } from '@feathersjs/schema';
import fs from 'fs/promises';
import path from 'path';

import {
  ticketDataValidator,
  personnelAssignedValidator,
  ticketQueryValidator,
  ticketResolver,
  ticketExternalResolver,
  ticketDataResolver,
  personnelAssignedResolver,
  ticketQueryResolver,
  ticketQuotValidator,
  ticketQuotResolver,
  ticketFeedbackValidator,
  ticketFeedbackResolver,
  ticketIdValidator,
  ticketIdResolver,
  QuotationStatus,
  PersonnelAssigned,
  TicketStatus,
} from './ticket.schema';

import type { Application, HookContext } from '../../declarations';
import { TicketService, getOptions } from './ticket.class';
import { ticketPath, ticketMethods } from './ticket.shared';
import { disallow, validate } from 'feathers-hooks-common';
import { UserType } from '../users/users';

export * from './ticket.class';
export * from './ticket.schema';

const BASE_PATH = path.join(__dirname, '..', '..', '..', 'uploads');

const validateAuthLevel = (accountTypes: UserType[]) => {
  accountTypes.push(UserType.Admin); // Make sure admin can always access
  return (ctx: HookContext<TicketService>) => {
    if (!accountTypes.includes(ctx.params.user.typ)) {
      throw new Forbidden('Insufficient permissions');
    }
  };
};

// A configure function that registers the service and its hooks via `app.configure`
export const ticket = (app: Application) => {
  // Register our service on the Feathers application
  app.use(ticketPath, new TicketService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ticketMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
  });

  // Initialize hooks
  app.service(ticketPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(ticketExternalResolver),
        schemaHooks.resolveResult(ticketResolver),
      ],
    },
    before: {
      all: [
        schemaHooks.validateQuery(ticketQueryValidator),
        schemaHooks.resolveQuery(ticketQueryResolver),
      ],
      find: [],
      get: [],
      patch: [disallow('external')],
      create: [
        (ctx) => {
          if (ctx.data.attachements === undefined) {
            ctx.data.attachements = [];
          } else if (!Array.isArray(ctx.data.attachements)) {
            ctx.data.attachements = [ctx.data.attachements];
          }
        },
        schemaHooks.validateData(ticketDataValidator),
        validateAuthLevel([UserType.Landlord, UserType.Tenant]),
        async (ctx) => {
          ctx.data.attachements = await Promise.all(
            ctx.data.attachements.map(async (oldPath: string) => {
              const basename = path.basename(oldPath);
              const newPath = path.join(BASE_PATH, 'static', basename);
              await fs.copyFile(oldPath, newPath);
              await fs.rm(oldPath);
              return path.posix.join('static', basename);
            })
          );
          const lease = await app
            .service('lease')
            .get(ctx.data.leaseId, { ...ctx.params, query: {} });
          ctx.data.userId = lease.userId;
          ctx.data.buildingId = lease.units[0].buildingId;

          ctx.data.openedOn = new Date().getTime();
          ctx.data.status = TicketStatus.Opened;
          ctx.data.quotStatus = QuotationStatus.Pending;
        },
        schemaHooks.resolveData(ticketDataResolver),
      ],
      remove: [validateAuthLevel([UserType.Landlord])],
      assignPersonnel: [
        validateAuthLevel([UserType.Landlord, UserType.ServiceProvider]),
        schemaHooks.validateData(personnelAssignedValidator),
        validate(async (data: PersonnelAssigned, ctx) => {
          await ctx.app.service('users').get(data.personnelId);
          return null;
        }),
        schemaHooks.resolveData(personnelAssignedResolver),
      ],
      unassignPersonnel: [
        validateAuthLevel([UserType.Landlord, UserType.ServiceProvider]),
        schemaHooks.validateData(ticketIdValidator),
        schemaHooks.resolveData(ticketIdResolver),
      ],
      moveInProgress: [
        validateAuthLevel([UserType.Landlord, UserType.ServiceProvider]),
        schemaHooks.validateData(ticketIdValidator),
        schemaHooks.resolveData(ticketIdResolver),
      ],
      uploadQuotation: [
        validateAuthLevel([UserType.Landlord]),
        (ctx) => {
          for (const field of ['ticketId', 'amount']) {
            if (typeof ctx.data[field] === 'string') {
              ctx.data[field] = parseInt(ctx.data[field]);
            }
          }
        },
        schemaHooks.validateData(ticketQuotValidator),
        async (ctx) => {
          // Do not copy file during unit tests
          if (ctx.data.uri !== '' || process.env.NODE_ENV !== 'test') {
            const basename = path.basename(ctx.data.uri);
            const newPath = path.join(BASE_PATH, 'static', basename);
            await fs.copyFile(ctx.data.uri, newPath);
            await fs.rm(ctx.data.uri);
            ctx.data.uri = path.posix.join('static', basename);
          }
        },
        schemaHooks.resolveData(ticketQuotResolver),
      ],
      approveQuotation: [
        validateAuthLevel([UserType.Tenant]),
        schemaHooks.validateData(ticketIdValidator),
        schemaHooks.resolveData(ticketIdResolver),
      ],
      rejectQuotation: [
        validateAuthLevel([UserType.Tenant]),
        schemaHooks.validateData(ticketIdValidator),
        schemaHooks.resolveData(ticketIdResolver),
      ],
      rejectTicket: [
        validateAuthLevel([UserType.Landlord]),
        schemaHooks.validateData(ticketIdValidator),
        schemaHooks.resolveData(ticketIdResolver),
      ],
      reopenTicket: [
        validateAuthLevel([UserType.Landlord, UserType.Tenant]),
        schemaHooks.validateData(ticketIdValidator),
        schemaHooks.resolveData(ticketIdResolver),
      ],
      registerWorkFinished: [
        validateAuthLevel([UserType.Landlord, UserType.ServiceProvider]),
        schemaHooks.validateData(ticketIdValidator),
        schemaHooks.resolveData(ticketIdResolver),
      ],
      rateTicket: [
        validateAuthLevel([UserType.Tenant]),
        schemaHooks.validateData(ticketFeedbackValidator),
        schemaHooks.resolveData(ticketFeedbackResolver),
      ],
      closeTicket: [
        validateAuthLevel([UserType.Tenant]),
        schemaHooks.validateData(ticketIdValidator),
        schemaHooks.resolveData(ticketIdResolver),
      ],
    },
    after: {
      all: [],
      remove: [
        async (ctx) => {
          await Promise.all(
            ctx.result.attachements.map((f: string) => fs.rm(path.join(BASE_PATH, f)))
          );
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
    [ticketPath]: TicketService;
  }
}
