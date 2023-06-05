import { Catch, ArgumentsHost } from '@nestjs/common';
import { Exception } from '../../domain/exceptions/exception';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch(Exception)
export class ExceptionHandler extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<any>();
    const request = ctx.getRequest<any>();

    const status = exception.code;
    const context = exception.context;
    const message = exception.exception;

    response.code(status).send({
      statusCode: status,
      message,
      context,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
