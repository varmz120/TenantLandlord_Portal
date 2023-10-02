import { Application } from '@feathersjs/feathers';
import { OAuthStrategy, OAuthProfile } from './strategy';
import { OauthSetupSettings } from './utils';
export { OauthSetupSettings, OAuthStrategy, OAuthProfile };
export declare const oauth: (settings?: Partial<OauthSetupSettings>) => (app: Application) => void;
