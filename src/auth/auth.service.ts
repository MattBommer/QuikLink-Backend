import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthTokensDto } from './auth.tokens.dto';
import { RefreshJWTRedisService } from '../token/refresh.token.redis.service';

import * as bcrypt from 'bcrypt'
import * as crypto from 'crypto'

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private refreshJWTRedisService: RefreshJWTRedisService,
        @Inject('RefreshJWTService') private refreshJWTService: JwtService,
        @Inject('AccessJWTService') private accessJWTService: JwtService,
    ) {}

    async login(username: string, password: string): Promise<AuthTokensDto | undefined> {
        let user = await this.userService.retrieve(username)
        if (user && await bcrypt.compare(password, user.password)) {
            let uuid = crypto.randomUUID()
            let tokens = await this._generateTokens(user.id, uuid)
            
            this.refreshJWTRedisService.set(username, uuid)
            return tokens
        }        
    }

    async signUp(username: string, password: string): Promise<boolean> {
        let user = await this.userService.retrieve(username)
        let userCreated = false
        if (!user) {
            let saltRounds = 10
            let hash = await bcrypt.hash(password, saltRounds)
            await this.userService.create(username, hash)
            userCreated = true
        }

        return userCreated
    }

    private async _generateTokens(userId: string, refreshTokenId: string) {
        let access_token = await this.accessJWTService.signAsync({ sub: userId, type: 'access' })
        let refresh_token = await this.refreshJWTService.signAsync({ sub: userId, type: 'refresh', jti: refreshTokenId })
        return {
            access_token: access_token,
            refresh_token: refresh_token
        }
    }

    async verifyAccessToken(access_token: string): Promise<string | undefined> {
        try {
            let decoded = await this.accessJWTService.verifyAsync(access_token)
            return decoded.sub
        } catch (_) {}
    }

    async verifyRefreshToken(refreshToken: string): Promise<AuthTokensDto | undefined> {
        try {
            // Decode our payload to get username
            let decoded = this.refreshJWTService.decode(refreshToken)
            
            // Look up username in refresh token redis db.
            let id = await this.refreshJWTRedisService.get(decoded.sub)

            // Match jwt id found in cache with the one given to us.
            await this.refreshJWTService.verifyAsync(refreshToken, { jwtid: id })

            // Create new UUID for identifying a unique refresh token.
            let uuid = crypto.randomUUID()

            // Generate new access and refresh token.
            let tokens = await this._generateTokens(decoded.sub, uuid)

            // Update redis db to store the new unique identifier for a users refresh token.
            this.refreshJWTRedisService.set(decoded.sub, uuid)

            return tokens
        } catch (_) {}
    }
}
