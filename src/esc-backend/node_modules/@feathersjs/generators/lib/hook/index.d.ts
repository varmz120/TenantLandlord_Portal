import { FeathersBaseContext } from '../commons';
export interface HookGeneratorContext extends FeathersBaseContext {
    name: string;
    camelName: string;
    kebabName: string;
    type: 'regular' | 'around';
}
export declare const generate: (ctx: HookGeneratorContext) => Promise<{
    kebabName: string;
    camelName: string;
    name: string;
    type: 'regular' | 'around';
    feathers: import("../commons").FeathersAppInfo;
    pkg: import("../commons").AppPackageJson;
    lib: string;
    test: string;
    language: "ts" | "js";
    dependencyVersions?: import("../commons").DependencyVersions;
    cwd: string;
    _?: (string | number)[];
    pinion: import("@feathershq/pinion").Configuration;
}>;
