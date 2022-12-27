"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokenModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AccessTokenModule = class AccessTokenModule {
};
AccessTokenModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => {
                    return {
                        secret: configService.get('ACCESS_JWT_SECRET'),
                        signOptions: { expiresIn: '15m', issuer: 'skate-bst' },
                        verifyOptions: { type: 'access', issuer: 'skate-bst' }
                    };
                },
                inject: [config_1.ConfigService]
            })
        ],
        providers: [{
                provide: 'AccessJWTService',
                useExisting: jwt_1.JwtService
            }],
        exports: ['AccessJWTService']
    })
], AccessTokenModule);
exports.AccessTokenModule = AccessTokenModule;
//# sourceMappingURL=access.token.module.js.map