import { Module } from '@nestjs/common';
import { ProxyController } from 'src/controllers/proxy.controller';
import { ProxyService } from 'src/services/proxy.service';

@Module({
  imports: [],
  controllers: [ProxyController],
  providers: [ProxyService]
})
export class ProxyModule {}
