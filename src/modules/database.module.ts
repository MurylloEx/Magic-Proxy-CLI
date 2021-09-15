import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProxyModel } from 'src/models/proxy.model';
import { SettingsModel } from 'src/models/settings.model';
import { TlsModel } from 'src/models/tls.model';
import { UserModel } from 'src/models/user.model';
import { TlsModule } from './tls.module';
import { ProxyModule } from './proxy.module';
import { AuthModule } from './auth.module';

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
    ProxyModule,
    AuthModule
  ],
  providers: []
})
export class DatabaseModule {}
