// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { SequenceGenerator } from './sequence-generator.class';

export type { SequenceGenerator };

export const sequenceGeneratorPath = 'sequence-generator';

export const sequenceGeneratorMethods = ['nextValue'] as const;
