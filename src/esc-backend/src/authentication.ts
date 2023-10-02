// For more information about this file see https://dove.feathersjs.com/guides/cli/authentication.html
import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication';
import { LocalStrategy } from '@feathersjs/authentication-local';

import type { Application } from './declarations';
import { NotAuthenticated, Unprocessable } from '@feathersjs/errors';
import { Params } from '@feathersjs/feathers';

declare module './declarations' {
  interface ServiceTypes {
    authentication: AuthenticationService;
  }
}

interface AuthenticationRequest {
  _id: string;
  password: string;
  code?: number;
}

class LocalStrategyWith2FA extends LocalStrategy {
  app: Application;

  constructor(app: Application) {
    super();
    this.app = app;
  }

  async authenticate(data: AuthenticationRequest, params: Params) {
    const { entity, errorMessage } = this.configuration;
    const { _id: user_id, password, code } = data;

    if (!password) {
      // exit early if there is no password
      throw new NotAuthenticated(errorMessage);
    }

    const result = await this.findEntity(user_id, { ...params, provider: undefined });
    await this.comparePassword(result, password);

    if (code === undefined) {
      // Generate and send 2FA code
      this.app.service('2fa').create_code({ user_id, email: result.email });
      // Not a true error. If this error is received by the client then the login details have been
      // verified and 2FA has been sent
      //
      // This is an error so that feathers doesn't assume that the login has finished succesfully
      throw new Unprocessable('Sent 2FA');
    }

    if (!(await this.app.service('2fa').authenticate({ user_id, code }))) {
      throw new NotAuthenticated(errorMessage);
    }

    return {
      authentication: { strategy: this.name ?? 'local' },
      [entity]: await this.getEntity(result, params),
    };
  }
}

export const authentication = (app: Application) => {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategyWith2FA(app));

  app.use('authentication', authentication);
};
