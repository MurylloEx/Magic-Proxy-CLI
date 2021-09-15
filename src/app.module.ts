import { Module } from '@nestjs/common';
import { TlsModule } from './modules/tls.module';
import { ProxyModule } from './modules/proxy.module';
import { UsersModule } from './modules/users.module';
import { DatabaseModule } from './modules/database.module';
import { SettingsModule } from './modules/settings.module';
import { AuthModule } from './modules/auth.module';

@Module({
  imports: [
    DatabaseModule,
    SettingsModule,
    UsersModule,
    ProxyModule,
    AuthModule,
    TlsModule
  ],
  providers: [],
  controllers: []
})
export class AppModule {}
