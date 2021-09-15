import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProxyModel } from 'src/models/proxy.model';
import { SettingsModel } from 'src/models/settings.model';
import { TlsModel } from 'src/models/tls.model';
import { UserModel } from 'src/models/user.model';
import { SettingsModule } from './settings.module';
import { TlsModule } from './tls.module';
import { ProxyModule } from './proxy.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'sqlite',
      database: 'database/db.sqlite',
      logging: true,
      synchronize: true,
      entities: [
        TlsModel,
        UserModel,
        ProxyModel,
        SettingsModel
      ]
    }),
    TlsModule,
    ProxyModule
  ],
  providers: []
})
export class DatabaseModule {}
