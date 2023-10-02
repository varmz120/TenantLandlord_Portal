"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
const pinion_1 = require("@feathershq/pinion");
const lodash_1 = __importDefault(require("lodash"));
const commons_1 = require("../commons");
const generate = (ctx) => (0, pinion_1.generator)(ctx)
    .then((0, commons_1.initializeBaseContext)())
    .then((0, commons_1.checkPreconditions)())
    .then((0, pinion_1.prompt)(({ type, name }) => [
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of the hook?',
        when: !name
    },
    {
        name: 'type',
        type: 'list',
        when: !type,
        message: 'What kind of hook is it?',
        choices: [
            { value: 'around', name: 'Around' },
            { value: 'regular', name: 'Before, After or Error' }
        ]
    }
]))
    .then((ctx) => {
    const { name } = ctx;
    const kebabName = lodash_1.default.kebabCase(name);
    const camelName = lodash_1.default.camelCase(name);
    return {
        ...ctx,
        kebabName,
        camelName
    };
})
    .then((0, pinion_1.runGenerators)(__dirname, 'templates'));
exports.generate = generate;
//# sourceMappingURL=index.js.map