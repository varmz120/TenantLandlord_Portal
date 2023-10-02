"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordHash = exports.LocalStrategy = exports.hooks = void 0;
const hash_password_1 = __importDefault(require("./hooks/hash-password"));
const protect_1 = __importDefault(require("./hooks/protect"));
const strategy_1 = require("./strategy");
Object.defineProperty(exports, "LocalStrategy", { enumerable: true, get: function () { return strategy_1.LocalStrategy; } });
exports.hooks = { hashPassword: hash_password_1.default, protect: protect_1.default };
/**
 * Returns as property resolver that hashes a given plain text password using a Local
 * authentication strategy.
 *
 * @param options The authentication `service` and `strategy` name
 * @returns
 */
const passwordHash = (options) => async (value, _data, context) => {
    if (value === undefined) {
        return value;
    }
    const { app, params } = context;
    const authService = app.defaultAuthentication(options.service);
    const localStrategy = authService.getStrategy(options.strategy);
    return localStrategy.hashPassword(value, params);
};
exports.passwordHash = passwordHash;
//# sourceMappingURL=index.js.map