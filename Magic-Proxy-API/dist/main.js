#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const swagger_json_1 = __importDefault(require("./docs/swagger.json"));
const app_module_1 = require("./app.module");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
function setupSwagger(app) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle(swagger_json_1.default.title)
        .setDescription(swagger_json_1.default.description)
        .setVersion(swagger_json_1.default.version)
        .addTag(swagger_json_1.default.tag)
        .addBearerAuth()
        .build();
    return swagger_1.SwaggerModule.setup(swagger_json_1.default.path, app, swagger_1.SwaggerModule.createDocument(app, config));
}
function bootstrap(port) {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield yield core_1.NestFactory.create(app_module_1.AppModule);
        app.setGlobalPrefix('/v1/api');
        app.enableCors();
        setupSwagger(app);
        yield app.listen(port);
    });
}
const argv = yargs_1.default
    .command('port', 'Define the port of Magic Proxy Webpanel.', {
    'port': {
        description: 'Define the port of Magic Proxy Webpanel.',
        type: 'number'
    }
})
    .help()
    .alias('help', 'h')
    .argv;
bootstrap(Number(argv['port'] || 3000));
//# sourceMappingURL=main.js.map