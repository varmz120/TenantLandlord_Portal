"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperagentClient = void 0;
const base_1 = require("./base");
class SuperagentClient extends base_1.Base {
    request(options, params) {
        const superagent = this.connection(options.method, options.url)
            .set(this.options.headers || {})
            .set('Accept', 'application/json')
            .set(params.connection || {})
            .set(options.headers || {})
            .type(options.type || 'json');
        return new Promise((resolve, reject) => {
            superagent.set(options.headers);
            if (options.body) {
                superagent.send(options.body);
            }
            superagent.end(function (error, res) {
                if (error) {
                    try {
                        const response = error.response;
                        error = JSON.parse(error.response.text);
                        error.response = response;
                    }
                    catch (e) { }
                    return reject(error);
                }
                resolve(res && res.body);
            });
        });
    }
}
exports.SuperagentClient = SuperagentClient;
//# sourceMappingURL=superagent.js.map