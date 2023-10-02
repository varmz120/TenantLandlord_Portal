"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = void 0;
const qs_1 = __importDefault(require("qs"));
const errors_1 = require("@feathersjs/errors");
const commons_1 = require("@feathersjs/commons");
function toError(error) {
    if (error.code === 'ECONNREFUSED') {
        throw new errors_1.Unavailable(error.message, commons_1._.pick(error, 'address', 'port', 'config'));
    }
    throw (0, errors_1.convert)(error);
}
class Base {
    constructor(settings) {
        this.name = (0, commons_1.stripSlashes)(settings.name);
        this.options = settings.options;
        this.connection = settings.connection;
        this.base = `${settings.base}/${this.name}`;
    }
    makeUrl(query, id) {
        let url = this.base;
        query = query || {};
        if (typeof id !== 'undefined' && id !== null) {
            url += `/${encodeURIComponent(id)}`;
        }
        return url + this.getQuery(query);
    }
    getQuery(query) {
        if (Object.keys(query).length !== 0) {
            const queryString = qs_1.default.stringify(query);
            return `?${queryString}`;
        }
        return '';
    }
    methods(...names) {
        names.forEach((method) => {
            this[method] = function (body, params = {}) {
                return this.request({
                    body,
                    url: this.makeUrl(params.query),
                    method: 'POST',
                    headers: Object.assign({
                        'Content-Type': 'application/json',
                        'X-Service-Method': method
                    }, params.headers)
                }, params).catch(toError);
            };
        });
        return this;
    }
    find(params) {
        return this.request({
            url: this.makeUrl(params.query),
            method: 'GET',
            headers: Object.assign({}, params.headers)
        }, params).catch(toError);
    }
    get(id, params) {
        if (typeof id === 'undefined') {
            return Promise.reject(new Error("id for 'get' can not be undefined"));
        }
        return this.request({
            url: this.makeUrl(params.query, id),
            method: 'GET',
            headers: Object.assign({}, params.headers)
        }, params).catch(toError);
    }
    create(body, params) {
        return this.request({
            url: this.makeUrl(params.query),
            body,
            method: 'POST',
            headers: Object.assign({ 'Content-Type': 'application/json' }, params.headers)
        }, params).catch(toError);
    }
    update(id, body, params) {
        if (typeof id === 'undefined') {
            return Promise.reject(new Error("id for 'update' can not be undefined, only 'null' when updating multiple entries"));
        }
        return this.request({
            url: this.makeUrl(params.query, id),
            body,
            method: 'PUT',
            headers: Object.assign({ 'Content-Type': 'application/json' }, params.headers)
        }, params).catch(toError);
    }
    patch(id, body, params) {
        if (typeof id === 'undefined') {
            return Promise.reject(new Error("id for 'patch' can not be undefined, only 'null' when updating multiple entries"));
        }
        return this.request({
            url: this.makeUrl(params.query, id),
            body,
            method: 'PATCH',
            headers: Object.assign({ 'Content-Type': 'application/json' }, params.headers)
        }, params).catch(toError);
    }
    remove(id, params) {
        if (typeof id === 'undefined') {
            return Promise.reject(new Error("id for 'remove' can not be undefined, only 'null' when removing multiple entries"));
        }
        return this.request({
            url: this.makeUrl(params.query, id),
            method: 'DELETE',
            headers: Object.assign({}, params.headers)
        }, params).catch(toError);
    }
}
exports.Base = Base;
//# sourceMappingURL=base.js.map