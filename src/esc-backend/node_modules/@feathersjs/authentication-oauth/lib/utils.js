"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationServiceOptions = exports.setKoaParams = exports.setExpressParams = exports.getGrantConfig = void 0;
require("@feathersjs/koa");
require("@feathersjs/express");
const cookie_session_1 = __importDefault(require("cookie-session"));
const koa_session_1 = __importDefault(require("koa-session"));
const lodash_1 = require("lodash");
const getGrantConfig = (service) => {
    const { app, configuration: { oauth } } = service;
    // Set up all the defaults
    const port = app.get('port');
    let host = app.get('host');
    let protocol = 'https';
    // Development environments commonly run on HTTP with an extended port
    if (process.env.NODE_ENV !== 'production') {
        protocol = 'http';
        if (String(port) !== '80') {
            host += `:${port}`;
        }
    }
    const grant = (0, lodash_1.defaultsDeep)({}, (0, lodash_1.omit)(oauth, ['redirect', 'origins']), {
        defaults: {
            prefix: '/oauth',
            origin: `${protocol}://${host}`,
            transport: 'state',
            response: ['tokens', 'raw', 'profile']
        }
    });
    const getUrl = (url) => {
        const { defaults } = grant;
        return `${defaults.origin}${defaults.prefix}/${url}`;
    };
    (0, lodash_1.each)(grant, (value, name) => {
        if (name !== 'defaults') {
            value.redirect_uri = value.redirect_uri || getUrl(`${name}/callback`);
        }
    });
    return grant;
};
exports.getGrantConfig = getGrantConfig;
const setExpressParams = (req, res, next) => {
    var _a;
    (_a = req.session).destroy || (_a.destroy = () => {
        req.session = null;
    });
    req.feathers = {
        ...req.feathers,
        session: req.session,
        state: res.locals
    };
    next();
};
exports.setExpressParams = setExpressParams;
const setKoaParams = async (ctx, next) => {
    var _a;
    (_a = ctx.session).destroy || (_a.destroy = () => {
        ctx.session = null;
    });
    ctx.feathers = {
        ...ctx.feathers,
        session: ctx.session,
        state: ctx.state
    };
    await next();
};
exports.setKoaParams = setKoaParams;
const authenticationServiceOptions = (service, settings) => {
    const { secret } = service.configuration;
    const koaApp = service.app;
    if (koaApp.context) {
        koaApp.keys = [secret];
        const { koaSession = (0, koa_session_1.default)({ key: 'feathers.oauth' }, koaApp) } = settings;
        return {
            koa: {
                before: [koaSession, exports.setKoaParams]
            }
        };
    }
    const { expressSession = (0, cookie_session_1.default)({
        name: 'feathers.oauth',
        keys: [secret]
    }) } = settings;
    return {
        express: {
            before: [expressSession, exports.setExpressParams]
        }
    };
};
exports.authenticationServiceOptions = authenticationServiceOptions;
//# sourceMappingURL=utils.js.map