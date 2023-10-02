"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosClient = void 0;
const base_1 = require("./base");
class AxiosClient extends base_1.Base {
    request(options, params) {
        const config = Object.assign({
            url: options.url,
            method: options.method,
            data: options.body,
            headers: Object.assign({
                Accept: 'application/json'
            }, this.options.headers, options.headers)
        }, params.connection);
        return this.connection
            .request(config)
            .then((res) => res.data)
            .catch((error) => {
            const response = error.response || error;
            throw response instanceof Error ? response : response.data || response;
        });
    }
}
exports.AxiosClient = AxiosClient;
//# sourceMappingURL=axios.js.map