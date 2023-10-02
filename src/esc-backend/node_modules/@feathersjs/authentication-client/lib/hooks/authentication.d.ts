import { HookContext, NextFunction } from '@feathersjs/feathers';
export declare const authentication: () => (context: HookContext, next: NextFunction) => Promise<any>;
