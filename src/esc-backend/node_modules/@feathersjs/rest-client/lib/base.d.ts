import { Params, Id, Query, NullableId, ServiceInterface } from '@feathersjs/feathers';
export interface RestClientParams extends Params {
    connection?: any;
}
interface RestClientSettings {
    name: string;
    base: string;
    connection: any;
    options: any;
}
export declare abstract class Base<T = any, D = Partial<T>, P extends Params = RestClientParams> implements ServiceInterface<T, D, P> {
    name: string;
    base: string;
    connection: any;
    options: any;
    constructor(settings: RestClientSettings);
    makeUrl(query: Query, id?: string | number | null): string;
    getQuery(query: Query): string;
    abstract request(options: any, params: P): any;
    methods(this: any, ...names: string[]): any;
    find(params?: P): any;
    get(id: Id, params?: P): any;
    create(body: D, params?: P): any;
    update(id: NullableId, body: D, params?: P): any;
    patch(id: NullableId, body: D, params?: P): any;
    remove(id: NullableId, params?: P): any;
}
export {};
