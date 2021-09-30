/// <reference types="node" />
import { AcmeRequestData } from 'src/data/acme-request.data';
import { Account, Challenge } from 'acme-client/types/rfc8555';
import { Client, Order, Authorization } from 'acme-client';
export interface ChallengeResponse {
    auth: Authorization;
    challenge?: Challenge;
    key: string;
    success: boolean;
}
export interface OrderResponse {
    client: Client;
    account: Account;
    order: Order;
}
export interface AcmeOrderChallenge {
    orderResponse: OrderResponse;
    challengeResponses: ChallengeResponse[];
    acmeRequestData: AcmeRequestData;
}
export declare class AcmeService {
    private AcmeOrders;
    createOrders(email: string, domains: string[]): Promise<OrderResponse>;
    getChallenges(client: Client, order: Order): Promise<ChallengeResponse[]>;
    waitForChallenges(client: Client, challenges: ChallengeResponse[]): Promise<number>;
    generateCertificates(client: Client, order: Order, commonName: string, altNames: string[]): Promise<false | {
        csr: Buffer;
        key: Buffer;
        cert: Buffer;
    }>;
    createRequest(data: AcmeRequestData): Promise<{
        id: number;
        challenges: ChallengeResponse[];
    }>;
    completeChallenges(requestId: number): Promise<boolean>;
    getCertificates(requestId: number): Promise<{
        cert: string;
        key: string;
        csr: string;
    }>;
}
