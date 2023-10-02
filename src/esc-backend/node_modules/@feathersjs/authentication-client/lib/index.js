"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaults = exports.defaultStorage = exports.hooks = exports.MemoryStorage = exports.AuthenticationClient = exports.getDefaultStorage = void 0;
const core_1 = require("./core");
Object.defineProperty(exports, "AuthenticationClient", { enumerable: true, get: function () { return core_1.AuthenticationClient; } });
const hooks = __importStar(require("./hooks"));
exports.hooks = hooks;
const storage_1 = require("./storage");
Object.defineProperty(exports, "MemoryStorage", { enumerable: true, get: function () { return storage_1.MemoryStorage; } });
const getDefaultStorage = () => {
    try {
        return new storage_1.StorageWrapper(window.localStorage);
    }
    catch (error) { }
    return new storage_1.MemoryStorage();
};
exports.getDefaultStorage = getDefaultStorage;
exports.defaultStorage = (0, exports.getDefaultStorage)();
exports.defaults = {
    header: 'Authorization',
    scheme: 'Bearer',
    storageKey: 'feathers-jwt',
    locationKey: 'access_token',
    locationErrorKey: 'error',
    jwtStrategy: 'jwt',
    path: '/authentication',
    Authentication: core_1.AuthenticationClient,
    storage: exports.defaultStorage
};
const init = (_options = {}) => {
    const options = Object.assign({}, exports.defaults, _options);
    const { Authentication } = options;
    return (app) => {
        const authentication = new Authentication(app, options);
        app.authentication = authentication;
        app.authenticate = authentication.authenticate.bind(authentication);
        app.reAuthenticate = authentication.reAuthenticate.bind(authentication);
        app.logout = authentication.logout.bind(authentication);
        app.hooks([hooks.authentication(), hooks.populateHeader()]);
    };
};
exports.default = init;
if (typeof module !== 'undefined') {
    module.exports = Object.assign(init, module.exports);
}
//# sourceMappingURL=index.js.map