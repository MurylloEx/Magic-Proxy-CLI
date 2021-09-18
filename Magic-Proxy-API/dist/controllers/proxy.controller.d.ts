import { ProxyService } from 'src/services/proxy.service';
import { ProxyModel } from 'src/models/proxy.model';
import { MagicProxyService } from 'src/services/magic.proxy.service';
import { ResponseService } from 'src/services/response.service';
export declare class ProxyController {
    private proxyService;
    private magicProxyService;
    private response;
    constructor(proxyService: ProxyService, magicProxyService: MagicProxyService, response: ResponseService);
    getProxies(): Promise<any>;
    addProxy(data: ProxyModel): Promise<any>;
    updateProxy(id: string, data: ProxyModel): Promise<any>;
    deleteProxy(id: string): Promise<any>;
}
