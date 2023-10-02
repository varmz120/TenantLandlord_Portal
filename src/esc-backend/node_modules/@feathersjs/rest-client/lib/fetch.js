"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchClient = void 0;
const errors_1 = require("@feathersjs/errors");
const base_1 = require("./base");
class FetchClient extends base_1.Base {
    request(options, params) {
        const fetchOptions = Object.assign({}, options, params.connection);
        fetchOptions.headers = Object.assign({
            Accept: 'application/json'
        }, this.options.headers, fetchOptions.headers);
        if (options.body) {
            fetchOptions.body = JSON.stringify(options.body);
        }
        return this.connection(options.url, fetchOptions)
            .then(this.checkStatus)
            .then((response) => {
            if (response.status === 204) {
                return null;
            }
            return response.json();
        });
    }
    checkStatus(response) {
        if (response.ok) {
            return response;
        }
        return response
            .json()
            .catch(() => {
            const ErrorClass = errors_1.errors[response.status] || Error;
            return new ErrorClass('JSON parsing error');
        })
            .then((error) => {
            error.response = response;
            throw error;
        });
    }
}
exports.FetchClient = FetchClient;
//# sourceMappingURL=fetch.js.map