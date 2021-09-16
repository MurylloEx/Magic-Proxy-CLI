import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TlsModel } from 'src/models/tls.model';
import { TlsService } from 'src/services/tls.service';
import { TlsController } from 'src/controllers/tls.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TlsModel])],
  controllers: [TlsController],
  providers: [TlsService],
  exports: [TlsService]
})
export class TlsModule {}
