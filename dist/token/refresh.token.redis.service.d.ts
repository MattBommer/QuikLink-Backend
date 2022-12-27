export declare class RefreshJWTRedisService {
    database: Map<string, string>;
    constructor();
    set(key: string, value: string): void;
    get(key: string): string | null;
}
export declare class MockRefreshJWTRedisService {
    database: Map<string, string>;
    constructor();
    set(key: string, value: string): void;
    get(key: string): string | null;
}
