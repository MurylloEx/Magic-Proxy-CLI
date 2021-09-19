import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProxyModel } from 'src/models/proxy.model';
import { SettingsModel } from 'src/models/settings.model';
import { TlsModel } from 'src/models/tls.model';
import { UserModel } from 'src/models/user.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'sqlite',
      database: 'database/db.sqlite',
      logging: false,
      synchronize: true,
      entities: [
        TlsModel,
        UserModel,
        ProxyModel,
        SettingsModel
      ]
    })
  ],
  providers: []
})
export class DatabaseModule {}
