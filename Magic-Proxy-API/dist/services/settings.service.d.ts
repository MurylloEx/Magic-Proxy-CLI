import { SettingsModel } from 'src/models/settings.model';
import { Repository } from 'typeorm';
export declare class SettingsService {
    private Settings;
    constructor(Settings: Repository<SettingsModel>);
    findAll(): Promise<SettingsModel[]>;
    findOne(id: string): Promise<SettingsModel>;
    findLast(): Promise<SettingsModel>;
    updateOne(id: string, user: Partial<SettingsModel>): Promise<SettingsModel>;
    insert(data: SettingsModel): Promise<SettingsModel>;
    remove(id: string): Promise<void>;
}
