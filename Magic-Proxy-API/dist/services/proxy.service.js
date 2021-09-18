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
exports.ProxyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const proxy_model_1 = require("../models/proxy.model");
const typeorm_2 = require("typeorm");
let ProxyService = class ProxyService {
    constructor(Proxies) {
        this.Proxies = Proxies;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Proxies.find();
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Proxies.findOne(id);
        });
    }
    updateOne(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            let found = yield this.Proxies.findOne(id);
            if (!found)
                return null;
            yield this.Proxies.update({ id }, user);
            return this.Proxies.merge(found, user);
        });
    }
    insert(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.Proxies.save(data);
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.Proxies.delete(id);
        });
    }
};
ProxyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(proxy_model_1.ProxyModel)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProxyService);
exports.ProxyService = ProxyService;
//# sourceMappingURL=proxy.service.js.map