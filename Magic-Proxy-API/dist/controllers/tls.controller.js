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
exports.TlsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const roles_enum_1 = require("../security/roles.enum");
const roles_decorator_1 = require("../security/roles.decorator");
const tls_service_1 = require("../services/tls.service");
const http_exception_filter_1 = require("../filters/http-exception.filter");
const authorize_guard_1 = require("../security/guards/authorize.guard");
const tls_model_1 = require("../models/tls.model");
const magic_proxy_service_1 = require("../services/magic.proxy.service");
const swagger_1 = require("@nestjs/swagger");
const response_service_1 = require("../services/response.service");
let TlsController = class TlsController {
    constructor(tlsService, magicProxyService, response) {
        this.tlsService = tlsService;
        this.magicProxyService = magicProxyService;
        this.response = response;
    }
    getTls() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.response.build(yield this.tlsService.findAll());
        });
    }
    addTls(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.tlsService.insert(data);
            yield this.magicProxyService.reloadProxy();
            return this.response.build(response);
        });
    }
    deleteTls(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.tlsService.remove(id);
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
], TlsController.prototype, "getTls", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(roles_enum_1.Roles.Manager),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tls_model_1.TlsModel]),
    __metadata("design:returntype", Promise)
], TlsController.prototype, "addTls", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Roles.Manager),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TlsController.prototype, "deleteTls", null);
TlsController = __decorate([
    (0, common_1.Controller)('tls'),
    (0, common_1.UseGuards)(authorize_guard_1.AuthorizeGuard),
    (0, common_1.UseFilters)(http_exception_filter_1.HttpExceptionFilter),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [tls_service_1.TlsService,
        magic_proxy_service_1.MagicProxyService,
        response_service_1.ResponseService])
], TlsController);
exports.TlsController = TlsController;
//# sourceMappingURL=tls.controller.js.map