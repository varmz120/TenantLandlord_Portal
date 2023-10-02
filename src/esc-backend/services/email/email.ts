// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations';
import { Service as EmailService } from 'feathers-mailer';

export { EmailService };
export const emailPath = 'email';

// A configure function that registers the service and its hooks via `app.configure`
export const email = (app: Application) => {
  const user = app.get('gmail');
  const pass = app.get('gmailPassword');

  // Register our service on the Feathers application
  app.use(
    emailPath,
    new EmailService({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      requireTLS: true,
      auth: { user, pass },
    })
  );
};

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [emailPath]: EmailService;
  }
}
