import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis'

@Injectable()
export class RefreshJWTRedisService {
    redis: Redis

    constructor(private configService: ConfigService) {
        this.redis = new Redis(
            this.configService.get<number>('REFRESH_JWT_CACHE_PORT'),
            this.configService.get<string>('REFRESH_JWT_CACHE_HOST'), 
            { password: this.configService.get<string>('REFRESH_JWT_CACHE_PASSWORD') }
        )
    }

    set(key: string, value: string) {
        this.redis.set(key, value)
    }

    get(key: string): Promise<string | null> {
        return this.redis.get(key)
    }
}

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