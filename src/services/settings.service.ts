import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SettingsModel } from 'src/models/settings.model';
import { Repository } from 'typeorm';

@Injectable()
export class SettingsService {

  constructor(
    @InjectRepository(SettingsModel)
    private Settings: Repository<SettingsModel>){}

}
