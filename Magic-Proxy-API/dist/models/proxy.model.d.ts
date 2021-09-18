import { BaseEntity } from "typeorm";
export declare class ProxyModel extends BaseEntity {
    id?: string;
    timestamp?: number;
    isDefault?: boolean;
    domain?: string;
    timeout?: number;
    round?: number;
    destinations?: string;
    websockDestinations?: string;
    validate(): Promise<void>;
}
