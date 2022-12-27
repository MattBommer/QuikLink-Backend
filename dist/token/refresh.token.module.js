"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const refresh_token_redis_service_1 = require("./refresh.token.redis.service");
let RefreshTokenModule = class RefreshTokenModule {
};
RefreshTokenModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('REFRESH_JWT_SECRET'),
                    signOptions: { expiresIn: '7d', issuer: 'skate-bst' },
                    verifyOptions: { type: 'refresh', issuer: 'skate-bst' }
                }),
                inject: [config_1.ConfigService]
            })
        ],
        providers: [
            {
                provide: 'RefreshJWTService',
                useExisting: jwt_1.JwtService
            },
            refresh_token_redis_service_1.RefreshJWTRedisService
        ],
        exports: ['RefreshJWTService', refresh_token_redis_service_1.RefreshJWTRedisService]
    })
], RefreshTokenModule);
exports.RefreshTokenModule = RefreshTokenModule;
//# sourceMappingURL=refresh.token.module.js.map