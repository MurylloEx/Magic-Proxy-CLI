import { BaseEntity } from "typeorm";
export declare class UserModel extends BaseEntity {
    id?: string;
    timestamp?: number;
    name?: string;
    token?: string;
    role?: number;
    validate(): Promise<void>;
}
