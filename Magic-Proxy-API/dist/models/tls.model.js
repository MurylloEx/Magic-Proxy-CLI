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
exports.TlsModel = void 0;
const swagger_json_1 = require("../docs/swagger.json");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let TlsModel = class TlsModel extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.timestamp = +new Date;
    }
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, class_validator_1.validateOrReject)(this);
        });
    }
};
__decorate([
    (0, swagger_1.ApiProperty)(swagger_json_1.models.tls.fields.id),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TlsModel.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(swagger_json_1.models.tls.fields.timestamp),
    (0, class_validator_1.ValidateIf)(o => false),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TlsModel.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(swagger_json_1.models.tls.fields.certificate),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.MaxLength)(131072),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TlsModel.prototype, "certificate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(swagger_json_1.models.tls.fields.privateKey),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.MaxLength)(131072),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TlsModel.prototype, "privateKey", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TlsModel.prototype, "validate", null);
TlsModel = __decorate([
    (0, typeorm_1.Entity)({ name: 'sys_tls' })
], TlsModel);
exports.TlsModel = TlsModel;
//# sourceMappingURL=tls.model.js.map