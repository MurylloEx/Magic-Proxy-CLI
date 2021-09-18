import { TlsModel } from 'src/models/tls.model';
import { Repository } from 'typeorm';
export declare class TlsService {
    private Tls;
    constructor(Tls: Repository<TlsModel>);
    findAll(): Promise<TlsModel[]>;
    findOne(id: string): Promise<TlsModel>;
    findLast(): Promise<TlsModel>;
    updateOne(id: string, user: Partial<TlsModel>): Promise<TlsModel>;
    insert(data: TlsModel): Promise<TlsModel>;
    remove(id: string): Promise<void>;
}
