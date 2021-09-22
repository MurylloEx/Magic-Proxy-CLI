import { Account, Challenge } from 'acme-client/types/rfc8555';
import { Client, Order, Authorization } from 'acme-client';
export interface ChallengeResponse {
    auth?: Authorization;
    challenge?: Challenge;
    key?: string;
    success?: boolean;
}
export interface OrderResponse {
    client?: Client;
    account?: Account;
    order?: Order;
}
export declare class AcmeService {
    createOrders(email: string, domains: string[]): Promise<OrderResponse>;
    getChallenges(client: Client, order: Order): Promise<ChallengeResponse[]>;
    waitForChallenges(client: Client, challenges: ChallengeResponse[]): Promise<number>;
    generateCertificates(client: Client, order: Order, commonName: string, altNames: string[]): Promise<{
        csr: Buffer;
        key: Buffer;
        cert: Buffer;
    }>;
}
