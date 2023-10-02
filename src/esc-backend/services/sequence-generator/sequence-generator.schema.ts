// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { Type } from '@feathersjs/typebox';
import type { Static } from '@feathersjs/typebox';

// Main data model schema
export const sequenceGeneratorSchema = Type.Object(
  {
    _id: Type.String(),
    value: Type.Number(),
  },
  { $id: 'SequenceGenerator', additionalProperties: false }
);
export type SequenceGenerator = Static<typeof sequenceGeneratorSchema>;
