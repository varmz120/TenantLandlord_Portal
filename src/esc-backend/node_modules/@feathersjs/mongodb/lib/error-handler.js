"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errors_1 = require("@feathersjs/errors");
function errorHandler(error) {
    // See https://github.com/mongodb/mongo/blob/master/docs/errors.md
    if (error && error.name && error.name.startsWith('Mongo')) {
        throw new errors_1.GeneralError(error, {
            name: error.name,
            code: error.code
        });
    }
    throw error;
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handler.js.map