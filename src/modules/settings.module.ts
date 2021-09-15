import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsModel } from 'src/models/settings.model';
import { SettingsService } from 'src/services/settings.service';
import { SettingsController } from 'src/controllers/settings.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SettingsModel])],
  controllers: [SettingsController],
  providers: [SettingsService]
})
export class SettingsModule {}
