// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers';
import type { ClientApplication } from '../../client';
import type {
  CreateResetPassword,
  VerifyResetPassword,
  ResetPasswordService,
} from './reset-password.class';

export type { CreateResetPassword, VerifyResetPassword };

export type ResetPasswordClientService = Pick<
  ResetPasswordService<Params>,
  (typeof resetPasswordMethods)[number]
>;

export const resetPasswordPath = 'reset-password';

export const resetPasswordMethods = ['create', 'reset'] as const;

export const resetPasswordClient = (client: ClientApplication) => {
  const connection = client.get('connection');

  client.use(resetPasswordPath, connection.service(resetPasswordPath), {
    methods: resetPasswordMethods,
  });
};

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [resetPasswordPath]: ResetPasswordClientService;
  }
}
