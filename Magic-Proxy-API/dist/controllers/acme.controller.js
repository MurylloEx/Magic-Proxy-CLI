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
exports.AcmeController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const acme_request_data_1 = require("../data/acme-request.data");
const http_exception_filter_1 = require("../filters/http-exception.filter");
const authorize_guard_1 = require("../security/guards/authorize.guard");
const roles_decorator_1 = require("../security/roles.decorator");
const acme_service_1 = require("../services/acme.service");
const response_service_1 = require("../services/response.service");
const roles_enum_1 = require("../security/roles.enum");
let AcmeController = class AcmeController {
    constructor(acmeService, responseService) {
        this.acmeService = acmeService;
        this.responseService = responseService;
    }
    requestCertificate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let acmeRequest = yield this.acmeService.createRequest(data);
            return this.responseService.build(acmeRequest, false);
        });
    }
    completeRequest(requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            let success = yield this.acmeService.completeChallenges(requestId);
            return this.responseService.build({}, !success);
        });
    }
    getCertificate(requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            let certificate = yield this.acmeService.getCertificates(requestId);
            return this.responseService.build(certificate, false);
        });
    }
};
__decorate([
    (0, common_1.Post)('request'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Roles.Manager),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [acme_request_data_1.AcmeRequestData]),
    __metadata("design:returntype", Promise)
], AcmeController.prototype, "requestCertificate", null);
__decorate([
    (0, common_1.Post)('request/:id/complete'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Roles.Manager),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AcmeController.prototype, "completeRequest", null);
__decorate([
    (0, common_1.Post)('request/:id/certificate'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Roles.Manager),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AcmeController.prototype, "getCertificate", null);
AcmeController = __decorate([
    (0, common_1.Controller)('acme'),
    (0, common_1.UseGuards)(authorize_guard_1.AuthorizeGuard),
    (0, common_1.UseFilters)(http_exception_filter_1.HttpExceptionFilter),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [acme_service_1.AcmeService,
        response_service_1.ResponseService])
], AcmeController);
exports.AcmeController = AcmeController;
//# sourceMappingURL=acme.controller.js.map