import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './modules/auth.module';
import { UsersModule } from './modules/users.module';
import { DatabaseModule } from './modules/database.module';

import { TlsService } from './services/tls.service';
import { ProxyService } from './services/proxy.service';
import { SettingsService } from './services/settings.service';

import { TlsModel } from './models/tls.model';
import { ProxyModel } from './models/proxy.model';
import { SettingsModel } from './models/settings.model';

import { TlsController } from './controllers/tls.controller';
import { ProxyController } from './controllers/proxy.controller';
import { SettingsController } from './controllers/settings.controller';
import { MagicProxyService } from './services/magic.proxy.service';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    TypeOrmModule.forFeature([ProxyModel]),
    TypeOrmModule.forFeature([SettingsModel]),
    TypeOrmModule.forFeature([TlsModel])
  ],
  providers: [
    ProxyService,
    SettingsService,
    TlsService,
    MagicProxyService
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
    MagicProxyService
  ]
})
export class AppModule {}
