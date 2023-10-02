"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauth = exports.OAuthStrategy = void 0;
const commons_1 = require("@feathersjs/commons");
const schema_1 = require("@feathersjs/schema");
const strategy_1 = require("./strategy");
Object.defineProperty(exports, "OAuthStrategy", { enumerable: true, get: function () { return strategy_1.OAuthStrategy; } });
const service_1 = require("./service");
const utils_1 = require("./utils");
const debug = (0, commons_1.createDebug)('@feathersjs/authentication-oauth');
const oauth = (settings = {}) => (app) => {
    const authService = app.defaultAuthentication ? app.defaultAuthentication(settings.authService) : null;
    if (!authService) {
        throw new Error('An authentication service must exist before registering @feathersjs/authentication-oauth');
    }
    if (!authService.configuration.oauth) {
        debug('No oauth configuration found in authentication configuration. Skipping oAuth setup.');
        return;
    }
    const oauthOptions = {
        linkStrategy: 'jwt',
        ...settings
    };
    const grantConfig = (0, utils_1.getGrantConfig)(authService);
    const serviceOptions = (0, utils_1.authenticationServiceOptions)(authService, oauthOptions);
    const servicePath = `${grantConfig.defaults.prefix || 'oauth'}/:provider`;
    app.use(servicePath, new service_1.OAuthService(authService, oauthOptions), serviceOptions);
    const oauthService = app.service(servicePath);
    oauthService.hooks({
        around: { all: [(0, schema_1.resolveDispatch)(), (0, service_1.redirectHook)()] }
    });
    if (typeof oauthService.publish === 'function') {
        app.service(servicePath).publish(() => null);
    }
};
exports.oauth = oauth;
//# sourceMappingURL=index.js.map