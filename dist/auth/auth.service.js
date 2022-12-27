"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const refresh_token_redis_service_1 = require("../token/refresh.token.redis.service");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
let AuthService = class AuthService {
    constructor(userService, refreshJWTRedisService, refreshJWTService, accessJWTService) {
        this.userService = userService;
        this.refreshJWTRedisService = refreshJWTRedisService;
        this.refreshJWTService = refreshJWTService;
        this.accessJWTService = accessJWTService;
    }
    async login(username, password) {
        let user = await this.userService.retrieve(username);
        if (user && await bcrypt.compare(password, user.password)) {
            let uuid = crypto.randomUUID();
            let tokens = await this._generateTokens(username, uuid);
            this.refreshJWTRedisService.set(username, uuid);
            return tokens;
        }
    }
    async signUp(username, password) {
        let user = await this.userService.retrieve(username);
        let userCreated = false;
        if (!user) {
            let saltRounds = 10;
            let hash = await bcrypt.hash(password, saltRounds);
            await this.userService.create(username, hash);
            userCreated = true;
        }
        return userCreated;
    }
    async _generateTokens(username, uuid) {
        let access_token = await this.accessJWTService.signAsync({ sub: username, type: 'access' });
        let refresh_token = await this.refreshJWTService.signAsync({ sub: username, type: 'refresh', jti: uuid });
        return {
            access_token: access_token,
            refresh_token: refresh_token
        };
    }
    async verifyAccessToken(access_token) {
        try {
            let decoded = await this.accessJWTService.verifyAsync(access_token);
            return decoded.sub;
        }
        catch (_) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async verifyRefreshToken(refreshToken) {
        try {
            let decoded = this.refreshJWTService.decode(refreshToken);
            let id = this.refreshJWTRedisService.get(decoded.sub);
            await this.refreshJWTService.verifyAsync(refreshToken, { jwtid: id });
            let uuid = crypto.randomUUID();
            let tokens = await this._generateTokens(decoded.sub, uuid);
            this.refreshJWTRedisService.set(decoded.sub, uuid);
            return tokens;
        }
        catch (err) {
            console.log(err);
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)('RefreshJWTService')),
    __param(3, (0, common_1.Inject)('AccessJWTService')),
    __metadata("design:paramtypes", [user_service_1.UserService,
        refresh_token_redis_service_1.RefreshJWTRedisService,
        jwt_1.JwtService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map