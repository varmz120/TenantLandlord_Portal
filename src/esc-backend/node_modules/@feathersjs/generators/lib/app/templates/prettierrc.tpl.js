"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
const pinion_1 = require("@feathershq/pinion");
const commons_1 = require("../../commons");
const generate = (ctx) => (0, pinion_1.generator)(ctx).then((0, pinion_1.writeJSON)((ctx) => ({
    ...commons_1.PRETTIERRC,
    parser: ctx.language === 'ts' ? 'typescript' : 'babel'
}), (0, pinion_1.toFile)('.prettierrc')));
exports.generate = generate;
//# sourceMappingURL=prettierrc.tpl.js.map