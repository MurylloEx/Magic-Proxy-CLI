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
exports.MagicProxyService = void 0;
const common_1 = require("@nestjs/common");
const magic_reverse_proxy_1 = require("magic-reverse-proxy");
const proxy_service_1 = require("./proxy.service");
const settings_service_1 = require("./settings.service");
const tls_service_1 = require("./tls.service");
const users_service_1 = require("./users.service");
const uuid_1 = require("uuid");
const user_model_1 = require("../models/user.model");
let MagicProxyService = class MagicProxyService {
    constructor(settingsService, tlsService, proxyService, userService) {
        this.settingsService = settingsService;
        this.tlsService = tlsService;
        this.proxyService = proxyService;
        this.userService = userService;
        this.m_IsRunning = false;
    }
    createAdmin() {
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            const admin = new user_model_1.UserModel();
            admin.name = 'admin';
            admin.role = 1;
            admin.token = (0, uuid_1.v4)();
            console.log('[Info] This is the first time that you use Magic Proxy.');
            console.log('[Info] A user will be created with a primary token that can be used to access all features.');
            console.log('[Security] Creating the first user of Magic Proxy.');
            console.log('[Security] Generating primary token for user #admin.');
            console.log('[Security] Your security token is ' + admin.token + ' for user #admin.');
            yield this.userService.insert(admin);
        }), 5000);
    }
    onApplicationBootstrap() {
        return __awaiter(this, void 0, void 0, function* () {
            if ((yield this.userService.findAll()).length == 0) {
                this.createAdmin();
            }
            yield this.reloadProxy();
        });
    }
    reloadProxy() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.unbindProxy();
                let tls = yield this.tlsService.findLast();
                let settings = yield this.settingsService.findLast();
                let proxies = yield this.proxyService.findAll();
                let [defaultProxy] = proxies.filter(v => !!v.isDefault);
                this.m_ProxyTrigger = (0, magic_reverse_proxy_1.createProxy)({
                    enable_hsts: settings.hstsEnabled,
                    allow_unknown_host: settings.allowUnknownHost,
                    allow_websockets: settings.allowWebsockets,
                    http: {
                        enabled: settings.httpEnabled,
                        port: settings.httpPort,
                        middlewares: [],
                        start_callback: () => { }
                    },
                    https: {
                        enabled: settings.httpsEnabled,
                        port: settings.httpsPort,
                        middlewares: [],
                        sslkey: tls.privateKey,
                        sslcert: tls.certificate,
                        start_callback: () => { }
                    },
                    proxies: proxies.filter(v => !v.isDefault).map(v => {
                        return {
                            domain: v.domain,
                            timeout: v.timeout,
                            round: v.round,
                            destination: v.destinations.split('//:!//').filter(e => e),
                            sockDestination: v.websockDestinations.split('//:!//').filter(e => e)
                        };
                    }),
                    default_proxy: {
                        timeout: defaultProxy.timeout,
                        round: defaultProxy.round,
                        destination: defaultProxy.destinations.split('//:!//').filter(e => e),
                        sockDestination: defaultProxy.websockDestinations.split('//:!//').filter(e => e)
                    }
                });
                this.bindProxy();
            }
            catch (e) {
                console.log('[Warning] ' + e.message);
            }
        });
    }
    buildProxy(options) {
        this.m_ProxyTrigger = (0, magic_reverse_proxy_1.createProxy)(options);
    }
    bindProxy() {
        if (this.m_IsRunning)
            return;
        try {
            this.m_ProxyTrigger.bind();
            this.m_IsRunning = true;
        }
        catch (e) { }
    }
    unbindProxy() {
        if (!this.m_IsRunning)
            return;
        try {
            this.m_ProxyTrigger.unbind();
            this.m_IsRunning = false;
        }
        catch (e) { }
    }
};
MagicProxyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [settings_service_1.SettingsService,
        tls_service_1.TlsService,
        proxy_service_1.ProxyService,
        users_service_1.UsersService])
], MagicProxyService);
exports.MagicProxyService = MagicProxyService;
//# sourceMappingURL=magic.proxy.service.js.map