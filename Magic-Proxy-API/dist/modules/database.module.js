"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const proxy_model_1 = require("../models/proxy.model");
const settings_model_1 = require("../models/settings.model");
const tls_model_1 = require("../models/tls.model");
const user_model_1 = require("../models/user.model");
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                name: 'default',
                type: 'sqlite',
                database: 'database/db.sqlite',
                logging: false,
                synchronize: true,
                entities: [
                    tls_model_1.TlsModel,
                    user_model_1.UserModel,
                    proxy_model_1.ProxyModel,
                    settings_model_1.SettingsModel
                ]
            })
        ],
        providers: []
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;
//# sourceMappingURL=database.module.js.map