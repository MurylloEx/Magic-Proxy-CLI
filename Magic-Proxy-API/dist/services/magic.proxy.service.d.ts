import { ProxyConfig } from 'magic-reverse-proxy';
import { ProxyService } from './proxy.service';
import { SettingsService } from './settings.service';
import { TlsService } from './tls.service';
export declare class MagicProxyService {
    private settingsService;
    private tlsService;
    private proxyService;
    private m_IsRunning;
    private m_ProxyTrigger;
    constructor(settingsService: SettingsService, tlsService: TlsService, proxyService: ProxyService);
    reloadProxy(): Promise<void>;
    buildProxy(options: ProxyConfig): void;
    bindProxy(): void;
    unbindProxy(): void;
}
