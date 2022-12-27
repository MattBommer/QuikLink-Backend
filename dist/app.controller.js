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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth/auth.service");
const user_dto_1 = require("./user/user.dto");
class TokenDto {
}
let AppController = class AppController {
    constructor(authService) {
        this.authService = authService;
    }
    async signUp(userDto) {
        return this.authService.signUp(userDto.username, userDto.password);
    }
    login(userDto) {
        return this.authService.login(userDto.username, userDto.password);
    }
    verifyAccess(tokenDto) {
        return this.authService.verifyAccessToken(tokenDto.token);
    }
    verifyRefresh(tokenDto) {
        return this.authService.verifyRefreshToken(tokenDto.token);
    }
};
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('verify/access'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TokenDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "verifyAccess", null);
__decorate([
    (0, common_1.Post)('verify/refresh'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TokenDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "verifyRefresh", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map