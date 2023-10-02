import type { RequestHandler } from 'express';
import type { Middleware } from '@feathersjs/koa';
import type { ServiceOptions } from '@feathersjs/feathers';
import '@feathersjs/koa';
import '@feathersjs/express';
import { AuthenticationService } from '@feathersjs/authentication';
import { GrantConfig } from 'grant';
export interface OauthSetupSettings {
    linkStrategy: string;
    authService?: string;
    expressSession?: RequestHandler;
    koaSession?: Middleware;
}
export declare const getGrantConfig: (service: AuthenticationService) => GrantConfig;
export declare const setExpressParams: RequestHandler;
export declare const setKoaParams: Middleware;
export declare const authenticationServiceOptions: (service: AuthenticationService, settings: OauthSetupSettings) => ServiceOptions;
