// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema';
import { Type, getValidator, querySyntax } from '@feathersjs/typebox';
import type { Static } from '@feathersjs/typebox';

import type { HookContext } from '../../declarations';
import { dataValidator, queryValidator } from '../../validators';
import { UserType } from '../users/users.schema';

export const unitSchema = Type.Object(
  {
    number: Type.String(),
    buildingId: Type.String(),
    leaseId: Type.String(),
  },
  { $id: 'Unit', additionalProperties: false }
);
export type Unit = Static<typeof unitSchema>;

// Main data model schema
export const leaseSchema = Type.Object(
  {
    _id: Type.String(),
    userId: Type.String(),
    tenantId: Type.String(),
    units: Type.Array(unitSchema), //check with luv again
    commencementDate: Type.Number(),
    expiryDate: Type.Number(),
    terminationDate: Type.Optional(Type.Number()),
    monthlyRent: Type.Number(),
    leaseFile: Type.String(),
  },
  { $id: 'Lease', additionalProperties: false }
);
export type Lease = Static<typeof leaseSchema>;
export const leaseValidator = getValidator(leaseSchema, dataValidator);
export const leaseResolver = resolve<Lease, HookContext>({});

export const leaseExternalResolver = resolve<Lease, HookContext>({});

// Schema for creating new entries
export const leaseDataSchema = Type.Pick(
  leaseSchema,
  [
    '_id',
    'userId',
    'tenantId',
    'units',
    'commencementDate',
    'expiryDate',
    'monthlyRent',
    'leaseFile',
  ],
  {
    $id: 'LeaseData',
  }
);
export type LeaseData = Static<typeof leaseDataSchema>;
export const leaseDataValidator = getValidator(leaseDataSchema, dataValidator);
export const leaseDataResolver = resolve<Lease, HookContext>({});

// Schema for updating existing entries
export const leasePatchSchema = Type.Partial(leaseSchema, {
  $id: 'LeasePatch',
});
export type LeasePatch = Static<typeof leasePatchSchema>;
export const leasePatchValidator = getValidator(leasePatchSchema, dataValidator);
export const leasePatchResolver = resolve<Lease, HookContext>({});

// Schema for allowed query properties
export const leaseQueryProperties = Type.Pick(leaseSchema, ['_id', 'userId']);
export const leaseQuerySchema = Type.Intersect(
  [
    querySyntax(leaseQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false }),
  ],
  { additionalProperties: false }
);
export type LeaseQuery = Static<typeof leaseQuerySchema>;
export const leaseQueryValidator = getValidator(leaseQuerySchema, queryValidator);
export const leaseQueryResolver = resolve<LeaseQuery, HookContext>({
  _id: async (value, tenant, context) => {
    if (context.params.user && context.params.user.typ === UserType.Tenant) {
      return context.params.user.leaseId;
    }

    return value;
  },
});
