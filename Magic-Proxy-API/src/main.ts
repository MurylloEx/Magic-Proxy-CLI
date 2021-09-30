#!/usr/bin/env node
import yargs from 'yargs';
import Docs from './docs/swagger.json';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function setupSwagger(app: INestApplication){
  const config = new DocumentBuilder()
    .setTitle(Docs.title)
    .setDescription(Docs.description)
    .setVersion(Docs.version)
    .addTag(Docs.tag)
    .addBearerAuth()
    .build();
  return SwaggerModule.setup(Docs.path, app, SwaggerModule.createDocument(app, config));
}

async function bootstrap(port: number) {
  const app = await await NestFactory.create(AppModule);
  app.setGlobalPrefix('/v1/api');
  app.enableCors();
  setupSwagger(app);
  await app.listen(port);
}

const argv = yargs
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


