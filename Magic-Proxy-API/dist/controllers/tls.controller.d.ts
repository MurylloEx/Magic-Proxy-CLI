import { TlsService } from 'src/services/tls.service';
import { TlsModel } from 'src/models/tls.model';
import { MagicProxyService } from 'src/services/magic.proxy.service';
import { ResponseService } from 'src/services/response.service';
export declare class TlsController {
    private tlsService;
    private magicProxyService;
    private response;
    constructor(tlsService: TlsService, magicProxyService: MagicProxyService, response: ResponseService);
    getTls(): Promise<any>;
    addTls(data: TlsModel): Promise<any>;
    deleteTls(id: string): Promise<any>;
}
