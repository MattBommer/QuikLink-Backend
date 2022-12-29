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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const auth_service_1 = require("./auth.service");
let ResourceAuthGuard = class ResourceAuthGuard {
    constructor(authService, reflector) {
        this.authService = authService;
        this.reflector = reflector;
    }
    canActivate(context) {
        var _a, _b;
        console.log(context.getHandler());
        let tokenVerificationType = (_a = this.reflector.get('verify', context.getHandler())) !== null && _a !== void 0 ? _a : "access";
        let ctx = context.switchToHttp();
        let request = ctx.getRequest();
        let tokenHeader = (_b = request.headers['authorization']) !== null && _b !== void 0 ? _b : "";
        let authHeaderArray = tokenHeader.split(' ');
        let authType = authHeaderArray[0];
        let token = authHeaderArray[1];
        if (authHeaderArray.length === 2, authType.toLowerCase() === 'bearer') {
            switch (tokenVerificationType) {
                case 'access':
                    return this.authService.verifyAccessToken(token).then((username) => {
                        request['user'] = username;
                        return (username !== undefined);
                    });
                case 'refresh':
                    return this.authService.verifyRefreshToken(token).then((tokens) => {
                        request['tokens'] = tokens;
                        return (tokens !== undefined);
                    });
            }
        }
        return false;
    }
};
ResourceAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        core_1.Reflector])
], ResourceAuthGuard);
exports.ResourceAuthGuard = ResourceAuthGuard;
//# sourceMappingURL=auth.guard.js.map