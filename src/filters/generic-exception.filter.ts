import { Request, Response } from 'express';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class GenericExceptionFilter implements ExceptionFilter {

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        error: true,
        statusCode: status,
        timestamp: new Date().toISOString(),
        data: exception.getResponse(),
        path: request.url,
      });
  }

}
