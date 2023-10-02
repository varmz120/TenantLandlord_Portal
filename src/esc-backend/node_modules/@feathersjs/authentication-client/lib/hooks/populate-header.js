"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.populateHeader = void 0;
const populateHeader = () => {
    return (context, next) => {
        const { app, params: { accessToken } } = context;
        const authentication = app.authentication;
        // Set REST header if necessary
        if (app.rest && accessToken) {
            const { scheme, header } = authentication.options;
            const authHeader = `${scheme} ${accessToken}`;
            context.params.headers = Object.assign({}, {
                [header]: authHeader
            }, context.params.headers);
        }
        return next();
    };
};
exports.populateHeader = populateHeader;
//# sourceMappingURL=populate-header.js.map