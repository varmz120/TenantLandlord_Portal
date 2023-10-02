// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type {
  TwoFactorAuthentication,
  TwoFactorAuthenticationData,
  TwoFactorAuthenticationService,
} from './2fa.class';

export type { TwoFactorAuthentication, TwoFactorAuthenticationData };

export type TwoFactorAuthenticationClientService = Pick<
  TwoFactorAuthenticationService,
  (typeof twoFactorAuthenticationMethods)[number]
>;

export const twoFactorAuthenticationPath = '2fa';

export const twoFactorAuthenticationMethods = ['create_code', 'authenticate'] as const;
