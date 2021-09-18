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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const login_data_1 = require("../data/login.data");
const http_exception_filter_1 = require("../filters/http-exception.filter");
const auth_service_1 = require("../services/auth.service");
const response_service_1 = require("../services/response.service");
const users_service_1 = require("../services/users.service");
let AuthController = class AuthController {
    constructor(authService, userService, response) {
        this.authService = authService;
        this.userService = userService;
        this.response = response;
    }
    doLogin(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.authService.checkCredentials(data.name, data.token)))
                throw new common_1.UnauthorizedException();
            const [user] = yield this.userService.findByName(data.name);
            if (!user)
                throw new common_1.UnauthorizedException();
            const token = yield this.authService.buildToken(user);
            return this.response.build({ token, user });
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_data_1.LoginData]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "doLogin", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, common_1.UseFilters)(http_exception_filter_1.HttpExceptionFilter),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService,
        response_service_1.ResponseService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map