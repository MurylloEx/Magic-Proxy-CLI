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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginData = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_json_1 = __importDefault(require("../docs/swagger.json"));
class LoginData {
}
__decorate([
    (0, swagger_1.ApiProperty)(swagger_json_1.default.datas.login.fields.name),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.MaxLength)(64),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9_\-@$!#.]+$/m),
    __metadata("design:type", String)
], LoginData.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(swagger_json_1.default.datas.login.fields.token),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], LoginData.prototype, "token", void 0);
exports.LoginData = LoginData;
//# sourceMappingURL=login.data.js.map