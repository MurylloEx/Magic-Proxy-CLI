"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.AcmeService = void 0;
const common_1 = require("@nestjs/common");
const acme_client_1 = require("acme-client");
let AcmeService = class AcmeService {
    createOrders(email, domains) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = new acme_client_1.Client({
                directoryUrl: acme_client_1.directory.letsencrypt.staging,
                accountKey: yield acme_client_1.forge.createPrivateKey()
            });
            const account = yield client.createAccount({
                termsOfServiceAgreed: true,
                contact: ['mailto:' + email]
            });
            const order = yield client.createOrder({
                identifiers: domains.map(v => {
                    return { type: 'dns', value: v };
                })
            });
            return { client, account, order };
        });
    }
    getChallenges(client, order) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorizations = yield client.getAuthorizations(order);
            const responses = authorizations.map((auth) => __awaiter(this, void 0, void 0, function* () {
                const { challenges } = auth;
                let challenge = challenges.filter(({ type }) => type == "dns-01").pop();
                if (!challenge)
                    return { auth, challenge, key: '', success: false };
                const key = yield client.getChallengeKeyAuthorization(challenge);
                return { auth, challenge, key, success: true };
            }));
            return Promise.all(responses);
        });
    }
    waitForChallenges(client, challenges) {
        return __awaiter(this, void 0, void 0, function* () {
            let e = 0;
            for (let c = 0; c < challenges.length; c++) {
                const { challenge, auth } = challenges[c];
                try {
                    if (!challenge || !auth)
                        throw new Error();
                    yield client.verifyChallenge(auth, challenge);
                    yield client.completeChallenge(challenge);
                    yield client.waitForValidStatus(challenge);
                }
                catch (_) {
                    e++;
                }
            }
            return e;
        });
    }
    generateCertificates(client, order, commonName, altNames) {
        return __awaiter(this, void 0, void 0, function* () {
            const [key, csr] = yield acme_client_1.forge.createCsr({
                commonName: commonName,
                altNames: altNames
            });
            yield client.finalizeOrder(order, csr);
            const cert = Buffer.from(yield client.getCertificate(order));
            return { csr, key, cert };
        });
    }
};
AcmeService = __decorate([
    (0, common_1.Injectable)()
], AcmeService);
exports.AcmeService = AcmeService;
//# sourceMappingURL=acme.service.js.map