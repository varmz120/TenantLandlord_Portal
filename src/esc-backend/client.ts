// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers';
import type { TransportConnection, Application, Params } from '@feathersjs/feathers';
import authenticationClient from '@feathersjs/authentication-client';
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client';

import { leaseClient } from './services/lease/lease.shared';
export type { Lease, LeaseData, LeaseQuery, LeasePatch } from './services/lease/lease.shared';

import { buildingClient } from './services/building/building.shared';
export type {
  Building,
  BuildingData,
  BuildingQuery,
  BuildingPatch,
} from './services/building/building.shared';

import { tenantClient } from './services/tenants/tenants.shared';
export type {
  Tenant,
  TenantData,
  TenantQuery,
  TenantPatch,
} from './services/tenants/tenants.shared';

import { resetPasswordClient } from './services/reset-password/reset-password.shared';
export type {
  CreateResetPassword,
  VerifyResetPassword,
} from './services/reset-password/reset-password.shared';

import { userClient } from './services/users/users.shared';
import { AuthenticationRequest } from '@feathersjs/authentication';
import { Unprocessable } from '@feathersjs/errors';
export type { User, UserData, UserQuery, UserPatch } from './services/users/users.shared';

import { ticketClient } from './services/ticket/ticket.shared';
export type {
  Ticket,
  TicketData,
  TicketQuery,
  Quotation,
  PersonnelAssigned,
  Feedback,
} from './services/ticket/ticket.shared';

export interface Configuration {
  connection: TransportConnection<ServiceTypes>;
}

export interface ServiceTypes {}

export type ClientApplication = Application<ServiceTypes, Configuration> & {
  get2FA(authentication: AuthenticationRequest, params?: Params): Promise<void>;
};

/**
 * Returns a typed client for the project app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = <Configuration = any>(
  connection: TransportConnection<ServiceTypes>,
  authenticationOptions: Partial<AuthenticationClientOptions> = {}
) => {
  const c = feathers() as any;
  c.get2FA = async (authentication: AuthenticationRequest, params?: Params) => {
    try {
      await client.authenticate(authentication, params);
    } catch (e: any) {
      if (!e || !e.code || e.code !== 422) {
        throw e;
      }
    }
  };

  const client: ClientApplication = c as ClientApplication;

  client.configure(connection);
  client.configure(authenticationClient(authenticationOptions));
  client.set('connection', connection);

  client.configure(userClient);
  client.configure(resetPasswordClient);
  // Do not configure 2fa service since it is an internal one
  client.configure(ticketClient);
  // Do not configure sequence generator service since it is an internal one
  client.configure(leaseClient);
  client.configure(tenantClient);
  // Do not configure email service since it is an internal one
  client.configure(buildingClient);

  return client;
};
