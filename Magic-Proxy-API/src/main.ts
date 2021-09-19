#!/usr/bin/env node
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import Docs from './docs/swagger.json';

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

async function bootstrap() {
  const app = await await NestFactory.create(AppModule);
  app.setGlobalPrefix('/v1/api');
  app.enableCors();
  setupSwagger(app);
  await app.listen(3000);
}

bootstrap();
