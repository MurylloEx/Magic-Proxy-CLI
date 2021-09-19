import { OnApplicationBootstrap } from '@nestjs/common';
import { ProxyConfig } from 'magic-reverse-proxy';
import { ProxyService } from './proxy.service';
import { SettingsService } from './settings.service';
import { TlsService } from './tls.service';
import { UsersService } from './users.service';
export declare class MagicProxyService implements OnApplicationBootstrap {
    private settingsService;
    private tlsService;
    private proxyService;
    private userService;
    private m_IsRunning;
    private m_ProxyTrigger;
    constructor(settingsService: SettingsService, tlsService: TlsService, proxyService: ProxyService, userService: UsersService);
    createAdmin(): void;
    onApplicationBootstrap(): Promise<void>;
    reloadProxy(): Promise<void>;
    buildProxy(options: ProxyConfig): void;
    bindProxy(): void;
    unbindProxy(): void;
}
