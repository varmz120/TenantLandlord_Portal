"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperagentClient = exports.FetchClient = exports.AxiosClient = void 0;
const feathers_1 = require("@feathersjs/feathers");
const base_1 = require("./base");
const axios_1 = require("./axios");
Object.defineProperty(exports, "AxiosClient", { enumerable: true, get: function () { return axios_1.AxiosClient; } });
const fetch_1 = require("./fetch");
Object.defineProperty(exports, "FetchClient", { enumerable: true, get: function () { return fetch_1.FetchClient; } });
const superagent_1 = require("./superagent");
Object.defineProperty(exports, "SuperagentClient", { enumerable: true, get: function () { return superagent_1.SuperagentClient; } });
const transports = {
    superagent: superagent_1.SuperagentClient,
    fetch: fetch_1.FetchClient,
    axios: axios_1.AxiosClient
};
function restClient(base = '') {
    const result = { Base: base_1.Base };
    Object.keys(transports).forEach((key) => {
        result[key] = function (connection, options = {}, Service = transports[key]) {
            if (!connection) {
                throw new Error(`${key} has to be provided to feathers-rest`);
            }
            if (typeof options === 'function') {
                Service = options;
                options = {};
            }
            const defaultService = function (name) {
                return new Service({ base, name, connection, options });
            };
            const initialize = (app) => {
                if (app.rest !== undefined) {
                    throw new Error('Only one default client provider can be configured');
                }
                app.rest = connection;
                app.defaultService = defaultService;
                app.mixins.unshift((service, _location, options) => {
                    if (options && options.methods && service instanceof base_1.Base) {
                        const customMethods = options.methods.filter((name) => !feathers_1.defaultServiceMethods.includes(name));
                        service.methods(...customMethods);
                    }
                });
            };
            initialize.Service = Service;
            initialize.service = defaultService;
            return initialize;
        };
    });
    return result;
}
exports.default = restClient;
if (typeof module !== 'undefined') {
    module.exports = Object.assign(restClient, module.exports);
}
//# sourceMappingURL=index.js.map