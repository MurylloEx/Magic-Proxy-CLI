import { Request } from 'express';
export declare class ResponseService {
    private readonly request;
    constructor(request: Request);
    build(data?: any, error?: boolean): any;
}
