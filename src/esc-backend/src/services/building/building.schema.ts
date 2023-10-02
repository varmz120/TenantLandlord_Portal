// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema';
import { Type, getValidator, querySyntax } from '@feathersjs/typebox';
import type { Static } from '@feathersjs/typebox';

import type { HookContext } from '../../declarations';
import { dataValidator, queryValidator } from '../../validators';

// Main data model schema
export const buildingSchema = Type.Object(
  {
    _id: Type.String(),
    name: Type.String({ minLength: 1 }),
    address: Type.String({ minLength: 1 }),
    requestTypes: Type.Array(Type.String()),
  },
  { $id: 'Building', additionalProperties: false }
);
export type Building = Static<typeof buildingSchema>;
export const buildingValidator = getValidator(buildingSchema, dataValidator);
export const buildingResolver = resolve<Building, HookContext>({});

export const buildingExternalResolver = resolve<Building, HookContext>({});

// Schema for creating new entries
export const buildingDataSchema = Type.Pick(
  buildingSchema,
  ['_id', 'name', 'address', 'requestTypes'],
  {
    $id: 'BuildingData',
  }
);
export type BuildingData = Static<typeof buildingDataSchema>;
export const buildingDataValidator = getValidator(buildingDataSchema, dataValidator);
export const buildingDataResolver = resolve<Building, HookContext>({});

// Schema for updating existing entries
export const buildingPatchSchema = Type.Partial(buildingSchema, {
  $id: 'BuildingPatch',
});
export type BuildingPatch = Static<typeof buildingPatchSchema>;
export const buildingPatchValidator = getValidator(buildingPatchSchema, dataValidator);
export const buildingPatchResolver = resolve<Building, HookContext>({});

// Schema for allowed query properties
export const buildingQueryProperties = Type.Pick(buildingSchema, ['_id', 'name']);
export const buildingQuerySchema = Type.Intersect(
  [
    querySyntax(buildingQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false }),
  ],
  { additionalProperties: false }
);
export type BuildingQuery = Static<typeof buildingQuerySchema>;
export const buildingQueryValidator = getValidator(buildingQuerySchema, queryValidator);
export const buildingQueryResolver = resolve<BuildingQuery, HookContext>({});
