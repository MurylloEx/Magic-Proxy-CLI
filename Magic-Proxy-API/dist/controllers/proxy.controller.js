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
exports.ProxyController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const http_exception_filter_1 = require("../filters/http-exception.filter");
const authorize_guard_1 = require("../security/guards/authorize.guard");
const roles_enum_1 = require("../security/roles.enum");
const roles_decorator_1 = require("../security/roles.decorator");
const proxy_service_1 = require("../services/proxy.service");
const proxy_model_1 = require("../models/proxy.model");
const magic_proxy_service_1 = require("../services/magic.proxy.service");
const swagger_1 = require("@nestjs/swagger");
const response_service_1 = require("../services/response.service");
let ProxyController = class ProxyController {
    constructor(proxyService, magicProxyService, response) {
        this.proxyService = proxyService;
        this.magicProxyService = magicProxyService;
        this.response = response;
    }
    getProxies() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.response.build(yield this.proxyService.findAll());
        });
    }
    addProxy(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.proxyService.insert(data);
            yield this.magicProxyService.reloadProxy();
            return this.response.build(response);
        });
    }
    updateProxy(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.proxyService.updateOne(id, data);
            yield this.magicProxyService.reloadProxy();
            return this.response.build(response);
        });
    }
    deleteProxy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.proxyService.remove(id);
            yield this.magicProxyService.reloadProxy();
            return this.response.build();
        });
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(roles_enum_1.Roles.Manager),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProxyController.prototype, "getProxies", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(roles_enum_1.Roles.Manager),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [proxy_model_1.ProxyModel]),
    __metadata("design:returntype", Promise)
], ProxyController.prototype, "addProxy", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Roles.Manager),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, proxy_model_1.ProxyModel]),
    __metadata("design:returntype", Promise)
], ProxyController.prototype, "updateProxy", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Roles.Manager),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProxyController.prototype, "deleteProxy", null);
ProxyController = __decorate([
    (0, common_1.Controller)('proxy'),
    (0, common_1.UseGuards)(authorize_guard_1.AuthorizeGuard),
    (0, common_1.UseFilters)(http_exception_filter_1.HttpExceptionFilter),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [proxy_service_1.ProxyService,
        magic_proxy_service_1.MagicProxyService,
        response_service_1.ResponseService])
], ProxyController);
exports.ProxyController = ProxyController;
//# sourceMappingURL=proxy.controller.js.map