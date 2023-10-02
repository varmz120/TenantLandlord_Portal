"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthService = exports.redirectHook = exports.OAuthError = void 0;
const commons_1 = require("@feathersjs/commons");
const errors_1 = require("@feathersjs/errors");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const grant_1 = __importDefault(require("grant/lib/grant"));
const utils_1 = require("./utils");
const debug = (0, commons_1.createDebug)('@feathersjs/authentication-oauth/services');
class OAuthError extends errors_1.FeathersError {
    constructor(message, data, location) {
        super(message, 'NotAuthenticated', 401, 'not-authenticated', data);
        this.location = location;
    }
}
exports.OAuthError = OAuthError;
const redirectHook = () => async (context, next) => {
    try {
        await next();
        const { location } = context.result;
        debug(`oAuth redirect to ${location}`);
        if (location) {
            context.http = {
                ...context.http,
                location
            };
        }
    }
    catch (error) {
        if (error.location) {
            context.http = {
                ...context.http,
                location: error.location
            };
            context.result = typeof error.toJSON === 'function' ? error.toJSON() : error;
        }
        else {
            throw error;
        }
    }
};
exports.redirectHook = redirectHook;
class OAuthService {
    constructor(service, settings) {
        this.service = service;
        this.settings = settings;
        const config = (0, utils_1.getGrantConfig)(service);
        this.grant = (0, grant_1.default)({ config });
    }
    async handler(method, params, body, override) {
        const { session, state, query, route: { provider } } = params;
        const result = await this.grant({
            params: { provider, override },
            state: state.grant,
            session: session.grant,
            query,
            method,
            body
        });
        session.grant = result.session;
        state.grant = result.state;
        return result;
    }
    async authenticate(params, result) {
        var _a, _b;
        const name = params.route.provider;
        const { linkStrategy, authService } = this.settings;
        const { accessToken, grant, headers, query = {}, redirect } = params.session;
        const strategy = this.service.getStrategy(name);
        const authParams = {
            ...params,
            headers,
            authStrategies: [name],
            authentication: accessToken
                ? {
                    strategy: linkStrategy,
                    accessToken
                }
                : null,
            query,
            redirect
        };
        const payload = (grant === null || grant === void 0 ? void 0 : grant.response) || ((_a = result === null || result === void 0 ? void 0 : result.session) === null || _a === void 0 ? void 0 : _a.response) || ((_b = result === null || result === void 0 ? void 0 : result.state) === null || _b === void 0 ? void 0 : _b.response) || params.query;
        const authentication = {
            strategy: name,
            ...payload
        };
        try {
            debug(`Calling ${authService}.create authentication with strategy ${name}`);
            const authResult = await this.service.create(authentication, authParams);
            debug('Successful oAuth authentication, sending response');
            const location = await strategy.getRedirect(authResult, authParams);
            if (typeof params.session.destroy === 'function') {
                await params.session.destroy();
            }
            return {
                ...authResult,
                location
            };
        }
        catch (error) {
            const location = await strategy.getRedirect(error, authParams);
            const e = new OAuthError(error.message, error.data, location);
            if (typeof params.session.destroy === 'function') {
                await params.session.destroy();
            }
            e.stack = error.stack;
            throw e;
        }
    }
    async find(params) {
        const { session, query, headers } = params;
        const { feathers_token, redirect, ...restQuery } = query;
        const handlerParams = {
            ...params,
            query: restQuery
        };
        if (feathers_token) {
            debug('Got feathers_token query parameter to link accounts', feathers_token);
            session.accessToken = feathers_token;
        }
        session.redirect = redirect;
        session.query = restQuery;
        session.headers = headers;
        return this.handler('GET', handlerParams, {});
    }
    async get(override, params) {
        const result = await this.handler('GET', params, {}, override);
        if (override === 'callback') {
            return this.authenticate(params, result);
        }
        return result;
    }
    async create(data, params) {
        return this.handler('POST', params, data);
    }
}
exports.OAuthService = OAuthService;
//# sourceMappingURL=service.js.map