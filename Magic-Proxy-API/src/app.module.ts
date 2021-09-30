import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AuthModule } from './modules/auth.module';
import { AcmeModule } from './modules/acme.module';
import { UsersModule } from './modules/users.module';
import { DatabaseModule } from './modules/database.module';

import { TlsService } from './services/tls.service';
import { ProxyService } from './services/proxy.service';
import { SettingsService } from './services/settings.service';

import { TlsModel } from './models/tls.model';
import { ProxyModel } from './models/proxy.model';
import { SettingsModel } from './models/settings.model';

import { TlsController } from './controllers/tls.controller';
import { ResponseService } from './services/response.service';
import { MagicProxyService } from './services/magic.proxy.service';

import { ProxyController } from './controllers/proxy.controller';
import { SettingsController } from './controllers/settings.controller';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    AcmeModule,
    TypeOrmModule.forFeature([ProxyModel]),
    TypeOrmModule.forFeature([SettingsModel]),
    TypeOrmModule.forFeature([TlsModel]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'assets')
    })
  ],
  providers: [
    ProxyService,
    SettingsService,
    TlsService,
    MagicProxyService,
    ResponseService
  ],
  controllers: [
    ProxyController,
    SettingsController,
    TlsController
  ],
  exports: [
    ProxyService,
    SettingsService,
    TlsService,
    MagicProxyService,
    ResponseService
  ]
})
export class AppModule {}
