import { Module } from '@nestjs/common';
import { AcmeController } from 'src/controllers/acme.controller';
import { AcmeService } from 'src/services/acme.service';
import { ResponseService } from 'src/services/response.service';

@Module({
  providers: [AcmeService, ResponseService],
  controllers: [AcmeController],
  exports: [AcmeService]
})
export class AcmeModule {}
