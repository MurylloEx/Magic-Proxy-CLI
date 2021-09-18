import { ProxyModel } from 'src/models/proxy.model';
import { Repository } from 'typeorm';
export declare class ProxyService {
    private Proxies;
    constructor(Proxies: Repository<ProxyModel>);
    findAll(): Promise<ProxyModel[]>;
    findOne(id: string): Promise<ProxyModel>;
    updateOne(id: string, user: Partial<ProxyModel>): Promise<ProxyModel>;
    insert(data: ProxyModel): Promise<ProxyModel>;
    remove(id: string): Promise<void>;
}
