"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthStrategy = void 0;
const authentication_1 = require("@feathersjs/authentication");
const errors_1 = require("@feathersjs/errors");
const commons_1 = require("@feathersjs/commons");
const qs_1 = __importDefault(require("qs"));
const debug = (0, commons_1.createDebug)('@feathersjs/authentication-oauth/strategy');
class OAuthStrategy extends authentication_1.AuthenticationBaseStrategy {
    get configuration() {
        const { entity, service, entityId, oauth } = this.authentication.configuration;
        const config = oauth[this.name];
        return {
            entity,
            service,
            entityId,
            ...config
        };
    }
    get entityId() {
        const { entityService } = this;
        return this.configuration.entityId || (entityService && entityService.id);
    }
    async getEntityQuery(profile, _params) {
        return {
            [`${this.name}Id`]: profile.sub || profile.id
        };
    }
    async getEntityData(profile, _existingEntity, _params) {
        return {
            [`${this.name}Id`]: profile.sub || profile.id
        };
    }
    async getProfile(data, _params) {
        return data.profile;
    }
    async getCurrentEntity(params) {
        const { authentication } = params;
        const { entity } = this.configuration;
        if (authentication && authentication.strategy) {
            debug('getCurrentEntity with authentication', authentication);
            const { strategy } = authentication;
            const authResult = await this.authentication.authenticate(authentication, params, strategy);
            return authResult[entity];
        }
        return null;
    }
    async getAllowedOrigin(params) {
        var _a;
        const { redirect, origins = this.app.get('origins') } = this.authentication.configuration.oauth;
        if (Array.isArray(origins)) {
            const referer = ((_a = params === null || params === void 0 ? void 0 : params.headers) === null || _a === void 0 ? void 0 : _a.referer) || origins[0];
            const allowedOrigin = origins.find((current) => referer.toLowerCase().startsWith(current.toLowerCase()));
            if (!allowedOrigin) {
                throw new errors_1.NotAuthenticated(`Referer "${referer}" is not allowed.`);
            }
            return allowedOrigin;
        }
        return redirect;
    }
    async getRedirect(data, params) {
        const queryRedirect = (params && params.redirect) || '';
        const redirect = await this.getAllowedOrigin(params);
        if (!redirect) {
            return null;
        }
        const redirectUrl = `${redirect}${queryRedirect}`;
        const separator = redirectUrl.endsWith('?') ? '' : redirect.indexOf('#') !== -1 ? '?' : '#';
        const authResult = data;
        const query = authResult.accessToken
            ? { access_token: authResult.accessToken }
            : { error: data.message || 'OAuth Authentication not successful' };
        return `${redirectUrl}${separator}${qs_1.default.stringify(query)}`;
    }
    async findEntity(profile, params) {
        const query = await this.getEntityQuery(profile, params);
        debug('findEntity with query', query);
        const result = await this.entityService.find({
            ...params,
            query
        });
        const [entity = null] = result.data ? result.data : result;
        debug('findEntity returning', entity);
        return entity;
    }
    async createEntity(profile, params) {
        const data = await this.getEntityData(profile, null, params);
        debug('createEntity with data', data);
        return this.entityService.create(data, commons_1._.omit(params, 'query'));
    }
    async updateEntity(entity, profile, params) {
        const id = entity[this.entityId];
        const data = await this.getEntityData(profile, entity, params);
        debug(`updateEntity with id ${id} and data`, data);
        return this.entityService.patch(id, data, commons_1._.omit(params, 'query'));
    }
    async getEntity(result, params) {
        const { entityService } = this;
        const { entityId = entityService.id, entity } = this.configuration;
        if (!entityId || result[entityId] === undefined) {
            throw new errors_1.NotAuthenticated('Could not get oAuth entity');
        }
        if (!params.provider) {
            return result;
        }
        return entityService.get(result[entityId], {
            ...commons_1._.omit(params, 'query'),
            [entity]: result
        });
    }
    async authenticate(authentication, originalParams) {
        const entity = this.configuration.entity;
        const { provider, ...params } = originalParams;
        const profile = await this.getProfile(authentication, params);
        const existingEntity = (await this.findEntity(profile, params)) || (await this.getCurrentEntity(params));
        debug('authenticate with (existing) entity', existingEntity);
        const authEntity = !existingEntity
            ? await this.createEntity(profile, params)
            : await this.updateEntity(existingEntity, profile, params);
        return {
            authentication: { strategy: this.name },
            [entity]: await this.getEntity(authEntity, originalParams)
        };
    }
}
exports.OAuthStrategy = OAuthStrategy;
//# sourceMappingURL=strategy.js.map