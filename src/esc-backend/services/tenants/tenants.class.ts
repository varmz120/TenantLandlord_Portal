// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers';
import { MongoDBService } from '@feathersjs/mongodb';
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb';

import type { Application } from '../../declarations';
import type { Tenant, TenantData, TenantPatch, TenantQuery } from './tenants.schema';

export type { Tenant, TenantData, TenantPatch, TenantQuery };

export interface TenantParams extends MongoDBAdapterParams<TenantQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class TenantService<ServiceParams extends Params = TenantParams> extends MongoDBService<
  Tenant,
  TenantData,
  TenantParams,
  TenantPatch
> {
  async addLease(tenantId: string, leaseId: string, params?: ServiceParams) {
    await this._patch(
      tenantId,
      // cast as any because the type system thinks this is an error. However, it is allowed
      { $push: { leases: leaseId } } as any,
      params
    );
  }

  async modifyLease(tenantId: string, leaseId: string, params?: ServiceParams) {
    await this._patch(
      tenantId,
      // cast as any because the type system thinks this is an error. However, it is allowed
      { $set: { leases: leaseId } } as any,
      params
    );
  }

  async removeLease(tenantId: string, leaseId: string, params?: ServiceParams) {
    await this._patch(
      tenantId,
      // cast as any because the type system thinks this is an error. However, it is allowed
      { $pull: { leases: leaseId } } as any,
      params
    );
  }
}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('tenants')),
  };
};
