"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./modules/auth.module");
const users_module_1 = require("./modules/users.module");
const database_module_1 = require("./modules/database.module");
const tls_service_1 = require("./services/tls.service");
const proxy_service_1 = require("./services/proxy.service");
const settings_service_1 = require("./services/settings.service");
const tls_model_1 = require("./models/tls.model");
const proxy_model_1 = require("./models/proxy.model");
const settings_model_1 = require("./models/settings.model");
const tls_controller_1 = require("./controllers/tls.controller");
const proxy_controller_1 = require("./controllers/proxy.controller");
const settings_controller_1 = require("./controllers/settings.controller");
const magic_proxy_service_1 = require("./services/magic.proxy.service");
const response_service_1 = require("./services/response.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            typeorm_1.TypeOrmModule.forFeature([proxy_model_1.ProxyModel]),
            typeorm_1.TypeOrmModule.forFeature([settings_model_1.SettingsModel]),
            typeorm_1.TypeOrmModule.forFeature([tls_model_1.TlsModel])
        ],
        providers: [
            proxy_service_1.ProxyService,
            settings_service_1.SettingsService,
            tls_service_1.TlsService,
            magic_proxy_service_1.MagicProxyService,
            response_service_1.ResponseService
        ],
        controllers: [
            proxy_controller_1.ProxyController,
            settings_controller_1.SettingsController,
            tls_controller_1.TlsController
        ],
        exports: [
            proxy_service_1.ProxyService,
            settings_service_1.SettingsService,
            tls_service_1.TlsService,
            magic_proxy_service_1.MagicProxyService,
            response_service_1.ResponseService
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map