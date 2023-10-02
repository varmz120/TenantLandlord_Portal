import { sequenceGenerator } from './sequence-generator/sequence-generator';
import { lease } from './lease/lease';
import { email } from './email/email';
import { building } from './building/building';
import { tenant } from './tenants/tenants';
import { twoFactorAuthentication } from './2fa/2fa';
import { resetPassword } from './reset-password/reset-password';
import { user } from './users/users';
import { ticket } from './ticket/ticket';
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations';

export const services = (app: Application) => {
  app.configure(sequenceGenerator);
  app.configure(email);
  app.configure(building);
  app.configure(tenant);
  app.configure(lease);
  app.configure(twoFactorAuthentication);
  app.configure(user);
  app.configure(resetPassword);
  app.configure(ticket);
  // All services will be registered here
};
