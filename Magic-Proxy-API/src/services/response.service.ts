import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { Inject, Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class ResponseService {

  constructor(@Inject(REQUEST) private readonly request: Request){}

  build(data?: any, error?: boolean): any {
    return {
      error: typeof error == 'undefined' ? false : error,
      timestamp: new Date().toISOString(),
      data: !!data ? data : null,
      path: this.request.url
    }
  }

}
