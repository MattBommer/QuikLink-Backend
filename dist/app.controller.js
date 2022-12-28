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
const auth_guard_1 = require("./auth/auth.guard");
const auth_service_1 = require("./auth/auth.service");
const verify_decorator_1 = require("./auth/verify.decorator");
const user_dto_1 = require("./user/user.dto");
const auth_response_dto_1 = require("./auth/auth.response.dto");
let AppController = class AppController {
    constructor(authService) {
        this.authService = authService;
    }
    async signUp(userDto) {
        let signUpStatus = await this.authService.signUp(userDto.username, userDto.password) ? auth_response_dto_1.AuthResponseStatus.SUCCESS : auth_response_dto_1.AuthResponseStatus.FAILURE;
        let message;
        switch (signUpStatus) {
            case auth_response_dto_1.AuthResponseStatus.SUCCESS:
                message = "Check you email for confirmation email.";
                break;
            case auth_response_dto_1.AuthResponseStatus.FAILURE:
                message = "Email may already be in use. Try sign in or using a different email. ";
                break;
        }
        return { status: signUpStatus, message: message };
    }
    async login(userDto) {
        let tokens = await this.authService.login(userDto.username, userDto.password);
        let loginStatus = tokens ? auth_response_dto_1.AuthResponseStatus.SUCCESS : auth_response_dto_1.AuthResponseStatus.FAILURE;
        let message;
        if (loginStatus === auth_response_dto_1.AuthResponseStatus.FAILURE)
            message = "Incorrect password or email given. Try again";
        return { status: loginStatus, data: tokens, message };
    }
    verifyAccess(req) {
        return req['user'];
    }
    async verifyRefresh(req) {
        if (!req['tokens']) {
            throw new common_1.UnauthorizedException();
        }
        return { status: auth_response_dto_1.AuthResponseStatus.SUCCESS, data: req['tokens'] };
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
    (0, common_1.Post)('guard'),
    (0, common_1.UseGuards)(auth_guard_1.ResourceAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "verifyAccess", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, verify_decorator_1.Verify)('refresh'),
    (0, common_1.UseGuards)(auth_guard_1.ResourceAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "verifyRefresh", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map