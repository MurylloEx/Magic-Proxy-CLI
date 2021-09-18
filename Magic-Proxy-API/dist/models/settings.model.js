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
exports.SettingsModel = void 0;
const swagger_json_1 = require("../docs/swagger.json");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let SettingsModel = class SettingsModel extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.timestamp = +new Date;
        this.allowUnknownHost = false;
        this.allowWebsockets = false;
        this.httpEnabled = true;
        this.httpsEnabled = false;
        this.httpPort = 8080;
        this.httpsPort = 8443;
        this.hstsEnabled = false;
    }
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, class_validator_1.validateOrReject)(this);
        });
    }
};
__decorate([
    (0, swagger_1.ApiProperty)(swagger_json_1.models.settings.fields.id),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SettingsModel.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(swagger_json_1.models.settings.fields.timestamp),
    (0, class_validator_1.ValidateIf)(o => false),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SettingsModel.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(swagger_json_1.models.settings.fields.allowUnknownHost),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsBoolean)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], SettingsModel.prototype, "allowUnknownHost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(swagger_json_1.models.settings.fields.allowWebsockets),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsBoolean)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], SettingsModel.prototype, "allowWebsockets", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(swagger_json_1.models.settings.fields.httpEnabled),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsBoolean)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], SettingsModel.prototype, "httpEnabled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(swagger_json_1.models.settings.fields.httpsEnabled),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsBoolean)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], SettingsModel.prototype, "httpsEnabled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(swagger_json_1.models.settings.fields.httpPort),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Max)(65535),
    (0, class_validator_1.Min)(0),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SettingsModel.prototype, "httpPort", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(swagger_json_1.models.settings.fields.httpsPort),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Max)(65535),
    (0, class_validator_1.Min)(0),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SettingsModel.prototype, "httpsPort", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(swagger_json_1.models.settings.fields.hstsEnabled),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsBoolean)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], SettingsModel.prototype, "hstsEnabled", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SettingsModel.prototype, "validate", null);
SettingsModel = __decorate([
    (0, typeorm_1.Entity)({ name: 'sys_settings' })
], SettingsModel);
exports.SettingsModel = SettingsModel;
//# sourceMappingURL=settings.model.js.map