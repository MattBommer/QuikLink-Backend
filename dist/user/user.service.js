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
exports.MockUserService = exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
let UserService = class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async create(username, password) {
        let newUser = this.userRepo.create({ username: username, password: password });
        return this.userRepo.save(newUser);
    }
    async retrieve(username) {
        return this.userRepo.findOneBy({ username: username });
    }
    async update(user) {
        await this.userRepo.update(user.id, user);
    }
    async delete(user) {
        let result = await this.userRepo.delete(user);
        return new Promise((resolve, _) => resolve(result.affected === 1));
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
let MockUserService = class MockUserService {
    constructor() {
        this.database = new Map;
    }
    async retrieve(username) {
        var _a;
        return (_a = this.database.get(username)) !== null && _a !== void 0 ? _a : null;
    }
    async create(username, password) {
        this.database.set(username, { id: 0, username: username, password: password });
        return this.database[username];
    }
    async delete(username) {
        return this.database.delete(username);
    }
};
MockUserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MockUserService);
exports.MockUserService = MockUserService;
//# sourceMappingURL=user.service.js.map