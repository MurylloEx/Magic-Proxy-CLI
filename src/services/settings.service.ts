import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SettingsModel } from 'src/models/settings.model';
import { Repository } from 'typeorm';

@Injectable()
export class SettingsService {

  constructor(
    @InjectRepository(SettingsModel)
    private Settings: Repository<SettingsModel>) { }

  async findAll(): Promise<SettingsModel[]> {
    return this.Settings.find();
  }

  async findOne(id: string): Promise<SettingsModel> {
    return this.Settings.findOne(id);
  }

  async findLast(): Promise<SettingsModel>{
    return this.Settings.findOne({ 
      order: { timestamp: 'DESC' } 
    });
  }

  async updateOne(id: string, user: Partial<SettingsModel>): Promise<SettingsModel> {
    let found = await this.Settings.findOne(id);
    if (!found)
      return null;
    await this.Settings.update({ id }, user);
    return this.Settings.merge(found, user);
  }

  async insert(data: SettingsModel): Promise<SettingsModel> {
    return await this.Settings.save(data);
  }

  async remove(id: string): Promise<void> {
    await this.Settings.delete(id);
  }
}
