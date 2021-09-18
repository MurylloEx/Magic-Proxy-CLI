import { SettingsService } from 'src/services/settings.service';
import { SettingsModel } from 'src/models/settings.model';
import { MagicProxyService } from 'src/services/magic.proxy.service';
import { ResponseService } from 'src/services/response.service';
export declare class SettingsController {
    private settingsService;
    private magicProxyService;
    private response;
    constructor(settingsService: SettingsService, magicProxyService: MagicProxyService, response: ResponseService);
    getSettings(): Promise<any>;
    addSetting(data: SettingsModel): Promise<any>;
    deleteSetting(id: string): Promise<any>;
}
