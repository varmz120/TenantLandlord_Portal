import { HookContext, NextFunction, Params } from '@feathersjs/feathers';
import { FeathersError } from '@feathersjs/errors';
import { AuthenticationService } from '@feathersjs/authentication';
import { OauthSetupSettings } from './utils';
export type GrantResponse = {
    location: string;
    session: any;
    state: any;
};
export type OAuthParams = Omit<Params, 'route'> & {
    session: any;
    state: Record<string, any>;
    route: {
        provider: string;
    };
};
export declare class OAuthError extends FeathersError {
    location: string;
    constructor(message: string, data: any, location: string);
}
export declare const redirectHook: () => (context: HookContext, next: NextFunction) => Promise<void>;
export declare class OAuthService {
    service: AuthenticationService;
    settings: OauthSetupSettings;
    grant: any;
    constructor(service: AuthenticationService, settings: OauthSetupSettings);
    handler(method: string, params: OAuthParams, body?: any, override?: string): Promise<GrantResponse>;
    authenticate(params: OAuthParams, result: GrantResponse): Promise<{
        location: string;
    }>;
    find(params: OAuthParams): Promise<GrantResponse>;
    get(override: string, params: OAuthParams): Promise<{
        location: string;
    }>;
    create(data: any, params: OAuthParams): Promise<GrantResponse>;
}
