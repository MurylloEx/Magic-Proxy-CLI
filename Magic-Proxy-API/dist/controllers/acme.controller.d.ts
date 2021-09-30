import { AcmeRequestData } from 'src/data/acme-request.data';
import { AcmeService } from 'src/services/acme.service';
import { ResponseService } from 'src/services/response.service';
export declare class AcmeController {
    private acmeService;
    private responseService;
    constructor(acmeService: AcmeService, responseService: ResponseService);
    requestCertificate(data: AcmeRequestData): Promise<any>;
    completeRequest(requestId: number): Promise<any>;
    getCertificate(requestId: number): Promise<any>;
}
