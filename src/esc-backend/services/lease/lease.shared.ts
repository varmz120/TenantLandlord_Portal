// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers';
import type { ClientApplication } from '../../client';
import type { Lease, LeaseData, LeasePatch, LeaseQuery, LeaseService } from './lease.class';

export type { Lease, LeaseData, LeasePatch, LeaseQuery };

export type LeaseClientService = Pick<
  LeaseService<Params<LeaseQuery>>,
  (typeof leaseMethods)[number]
>;

export const leasePath = 'lease';

export const leaseMethods = ['find', 'get', 'create', 'patch', 'remove'] as const;

export const leaseClient = (client: ClientApplication) => {
  const connection = client.get('connection');

  client.use(leasePath, connection.service(leasePath), {
    methods: leaseMethods,
  });
};

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [leasePath]: LeaseClientService;
  }
}
