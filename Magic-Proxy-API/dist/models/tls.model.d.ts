import { BaseEntity } from "typeorm";
export declare class TlsModel extends BaseEntity {
    id?: string;
    timestamp?: number;
    certificate?: string;
    privateKey?: string;
    validate(): Promise<void>;
}
