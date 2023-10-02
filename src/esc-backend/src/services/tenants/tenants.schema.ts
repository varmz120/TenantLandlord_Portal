// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema';
import { Type, getValidator, querySyntax } from '@feathersjs/typebox';
import { ObjectIdSchema } from '@feathersjs/typebox';
import type { Static } from '@feathersjs/typebox';

import type { HookContext } from '../../declarations';
import { dataValidator, queryValidator } from '../../validators';
import { UserType, user } from '../users/users';

// Main data model schema
export const tenantSchema = Type.Object(
  {
    _id: Type.String(),
    name: Type.String(),
    address: Type.String(),
    leases: Type.Array(Type.String()),
  },
  { $id: 'Tenant', additionalProperties: false }
);
export type Tenant = Static<typeof tenantSchema>;
export const tenantValidator = getValidator(tenantSchema, dataValidator);
export const tenantResolver = resolve<Tenant, HookContext>({});

export const tenantExternalResolver = resolve<Tenant, HookContext>({});

// Schema for creating new entries
export const tenantDataSchema = Type.Pick(tenantSchema, ['_id', 'name', 'address', 'leases'], {
  $id: 'TenantData',
});
export type TenantData = Static<typeof tenantDataSchema>;
export const tenantDataValidator = getValidator(tenantDataSchema, dataValidator);
export const tenantDataResolver = resolve<Tenant, HookContext>({});

// Schema for updating existing entries
export const tenantPatchSchema = Type.Partial(tenantSchema, {
  $id: 'TenantPatch',
});
export type TenantPatch = Static<typeof tenantPatchSchema>;
export const tenantPatchValidator = getValidator(tenantPatchSchema, dataValidator);
export const tenantPatchResolver = resolve<Tenant, HookContext>({});

// Schema for allowed query properties
export const tenantQueryProperties = Type.Pick(tenantSchema, ['_id', 'address', 'leases']);
export const tenantQuerySchema = Type.Intersect(
  [
    querySyntax(tenantQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false }),
  ],
  { additionalProperties: false }
);
export type TenantQuery = Static<typeof tenantQuerySchema>;
export const tenantQueryValidator = getValidator(tenantQuerySchema, queryValidator);
export const tenantQueryResolver = resolve<TenantQuery, HookContext>({
  leases: async (value, tenant, context) => {
    if (context.params.user && context.params.user.typ === UserType.Tenant) {
      return context.params.user.leaseId;
    }
    return value;
  },
});
