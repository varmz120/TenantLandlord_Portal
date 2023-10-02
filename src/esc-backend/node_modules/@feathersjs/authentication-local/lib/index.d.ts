import { HookContext } from '@feathersjs/feathers';
import hashPassword from './hooks/hash-password';
import { LocalStrategy } from './strategy';
export declare const hooks: {
    hashPassword: typeof hashPassword;
    protect: (...fields: string[]) => (context: HookContext<import("@feathersjs/feathers").Application<any, any>, any>, next?: import("@feathersjs/feathers").NextFunction) => Promise<void>;
};
export { LocalStrategy };
/**
 * Returns as property resolver that hashes a given plain text password using a Local
 * authentication strategy.
 *
 * @param options The authentication `service` and `strategy` name
 * @returns
 */
export declare const passwordHash: (options: {
    service?: string;
    strategy: string;
}) => <H extends HookContext<any, any>>(value: string | undefined, _data: any, context: H) => Promise<string>;
