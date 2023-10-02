// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers';
import { MongoDBService } from '@feathersjs/mongodb';
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb';

import type { Application } from '../../declarations';
import type { Building, BuildingData, BuildingPatch, BuildingQuery } from './building.schema';

export type { Building, BuildingData, BuildingPatch, BuildingQuery };

export interface BuildingParams extends MongoDBAdapterParams<BuildingQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class BuildingService<ServiceParams extends Params = BuildingParams> extends MongoDBService<
  Building,
  BuildingData,
  BuildingParams,
  BuildingPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('building')),
  };
};
