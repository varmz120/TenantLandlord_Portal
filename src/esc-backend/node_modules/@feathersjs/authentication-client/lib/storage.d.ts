export interface Storage {
    getItem(key: string): any;
    setItem?(key: string, value: any): any;
    removeItem?(key: string): any;
}
export declare class MemoryStorage implements Storage {
    store: {
        [key: string]: any;
    };
    constructor();
    getItem(key: string): Promise<any>;
    setItem(key: string, value: any): Promise<any>;
    removeItem(key: string): Promise<any>;
}
export declare class StorageWrapper implements Storage {
    storage: any;
    constructor(storage: any);
    getItem(key: string): Promise<any>;
    setItem(key: string, value: any): Promise<any>;
    removeItem(key: string): Promise<any>;
}
