"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const commons_1 = require("@feathersjs/commons");
const authentication = () => {
    return (context, next) => {
        const { app, params, path, method, app: { authentication: service } } = context;
        if ((0, commons_1.stripSlashes)(service.options.path) === path && method === 'create') {
            return next();
        }
        return Promise.resolve(app.get('authentication'))
            .then((authResult) => {
            if (authResult) {
                context.params = Object.assign({}, authResult, params);
            }
        })
            .then(next);
    };
};
exports.authentication = authentication;
//# sourceMappingURL=authentication.js.map