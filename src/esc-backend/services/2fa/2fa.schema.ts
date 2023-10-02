// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema';
import { Type, getValidator } from '@feathersjs/typebox';
import type { Static } from '@feathersjs/typebox';

import type { HookContext } from '../../declarations';
import { dataValidator } from '../../validators';

// Main data model schema
export const twoFactorAuthenticationSchema = Type.Object(
  {
    user_id: Type.String(),
    code: Type.Number(),
    expiry: Type.Number(),
  },
  { $id: 'TwoFactorAuthentication', additionalProperties: false }
);
export type TwoFactorAuthentication = Static<typeof twoFactorAuthenticationSchema>;
export const twoFactorAuthenticationValidator = getValidator(
  twoFactorAuthenticationSchema,
  dataValidator
);
export const twoFactorAuthenticationResolver = resolve<TwoFactorAuthentication, HookContext>({});

// Schema for creating new entries
export const twoFactorAuthenticationDataSchema = Type.Object(
  {
    user_id: Type.String(),
    email: Type.String(),
  },
  {
    $id: 'TwoFactorAuthenticationData',
  }
);
export type TwoFactorAuthenticationData = Static<typeof twoFactorAuthenticationDataSchema>;
export const twoFactorAuthenticationDataValidator = getValidator(
  twoFactorAuthenticationDataSchema,
  dataValidator
);
export const twoFactorAuthenticationDataResolver = resolve<TwoFactorAuthentication, HookContext>(
  {}
);

// Schema for updating existing entries
export const twoFactorAuthenticationAuthenticateSchema = Type.Pick(
  twoFactorAuthenticationSchema,
  ['user_id', 'code'],
  { $id: 'TwoFactorAuthenticationAuthenticate' }
);
export type TwoFactorAuthenticationAuthenticate = Static<
  typeof twoFactorAuthenticationAuthenticateSchema
>;
export const twoFactorAuthenticationAuthenticateValidator = getValidator(
  twoFactorAuthenticationAuthenticateSchema,
  dataValidator
);
export const twoFactorAuthenticationAuthenticateResolver = resolve<
  TwoFactorAuthentication,
  HookContext
>({});
