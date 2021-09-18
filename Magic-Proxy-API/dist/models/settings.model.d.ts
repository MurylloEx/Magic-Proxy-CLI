import { BaseEntity } from "typeorm";
export declare class SettingsModel extends BaseEntity {
    id?: string;
    timestamp?: number;
    allowUnknownHost?: boolean;
    allowWebsockets?: boolean;
    httpEnabled?: boolean;
    httpsEnabled?: boolean;
    httpPort?: number;
    httpsPort?: number;
    hstsEnabled?: boolean;
    validate(): Promise<void>;
}
