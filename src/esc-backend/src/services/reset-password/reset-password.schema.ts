// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema';
import { Type, getValidator } from '@feathersjs/typebox';
import type { Static } from '@feathersjs/typebox';

import type { HookContext } from '../../declarations';
import { dataValidator } from '../../validators';

// Schema for creating new entries
export const resetPasswordDataSchema = Type.Object(
  { user_id: Type.String() },
  { $id: 'ResetPasswordToken', additionalProperties: false }
);
export type CreateResetPassword = Static<typeof resetPasswordDataSchema>;
export const resetPasswordDataValidator = getValidator(resetPasswordDataSchema, dataValidator);
export const resetPasswordDataResolver = resolve<CreateResetPassword, HookContext>({});

// Schema for updating existing entries
export const resetPasswordResetSchema = Type.Object(
  { user_id: Type.String(), token: Type.String(), password: Type.String() },
  { $id: 'ResetPassword', additionalProperties: false }
);
export type VerifyResetPassword = Static<typeof resetPasswordResetSchema>;
export const resetPasswordResetValidator = getValidator(resetPasswordResetSchema, dataValidator);
export const resetPasswordResetResolver = resolve<VerifyResetPassword, HookContext>({});
