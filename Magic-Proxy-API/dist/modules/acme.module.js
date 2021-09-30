"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcmeModule = void 0;
const common_1 = require("@nestjs/common");
const acme_controller_1 = require("../controllers/acme.controller");
const acme_service_1 = require("../services/acme.service");
const response_service_1 = require("../services/response.service");
let AcmeModule = class AcmeModule {
};
AcmeModule = __decorate([
    (0, common_1.Module)({
        providers: [acme_service_1.AcmeService, response_service_1.ResponseService],
        controllers: [acme_controller_1.AcmeController],
        exports: [acme_service_1.AcmeService]
    })
], AcmeModule);
exports.AcmeModule = AcmeModule;
//# sourceMappingURL=acme.module.js.map