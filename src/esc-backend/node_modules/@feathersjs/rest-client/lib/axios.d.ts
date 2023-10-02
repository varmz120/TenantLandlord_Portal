import { Params } from '@feathersjs/feathers';
import { Base, RestClientParams } from './base';
export declare class AxiosClient<T = any, D = Partial<T>, P extends Params = RestClientParams> extends Base<T, D, P> {
    request(options: any, params: RestClientParams): any;
}
