// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers';
import { MongoDBService } from '@feathersjs/mongodb';
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb';

import type { Application } from '../../declarations';
import type { Lease, LeaseData, LeasePatch, LeaseQuery } from './lease.schema';

export type { Lease, LeaseData, LeasePatch, LeaseQuery };

export interface LeaseParams extends MongoDBAdapterParams<LeaseQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class LeaseService<ServiceParams extends Params = LeaseParams> extends MongoDBService<
  Lease,
  LeaseData,
  LeaseParams,
  LeasePatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('lease')),
  };
};
