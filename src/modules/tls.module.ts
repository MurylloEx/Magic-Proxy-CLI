import { Module } from '@nestjs/common';
import { TlsController } from 'src/controllers/tls.controller';
import { TlsService } from 'src/services/tls.service';

@Module({
  imports: [],
  controllers: [TlsController],
  providers: [TlsService]
})
export class TlsModule {}
