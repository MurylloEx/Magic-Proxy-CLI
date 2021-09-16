import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProxyController } from 'src/controllers/proxy.controller';
import { ProxyModel } from 'src/models/proxy.model';
import { ProxyService } from 'src/services/proxy.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProxyModel])],
  controllers: [ProxyController],
  providers: [ProxyService],
  exports: [ProxyService]
})
export class ProxyModule {}
