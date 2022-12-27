import { Injectable } from "@nestjs/common";

@Injectable()
export class MockRefreshJWTRedisService {
    database: Map<string, string>

    constructor() {
        this.database = new Map<string, string>()
    }

    set(key: string, value: string) {
        this.database.set(key, value)
    }

    get(key: string): string | null {
        return this.database.get(key)
    }

}