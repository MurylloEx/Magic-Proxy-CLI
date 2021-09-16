import { Module } from '@nestjs/common';
import { MagicProxyService } from 'src/services/magic.proxy.service';
import { ProxyService } from 'src/services/proxy.service';
import { SettingsService } from 'src/services/settings.service';
import { TlsService } from 'src/services/tls.service';
import { ProxyModule } from './proxy.module';
import { SettingsModule } from './settings.module';
import { TlsModule } from './tls.module';

@Module({
  imports: [
    TlsModule,
    ProxyModule,
    SettingsModule
  ],
  providers: [MagicProxyService],
  exports: [MagicProxyService]
})
export class MagicProxyModule {}
