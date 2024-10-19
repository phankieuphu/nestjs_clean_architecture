import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { getStatusCodeMessage } from '../constant/error.constant';
import { Request } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let errorMessage: any = '';
    errorMessage = exception.getResponse();

    const params = request.params;
    const query = request.query;
    const body = request.body;
    const url = request.url;
    Logger.debug(
      `API: ${url} - Request Parameters - Params: ${JSON.stringify(params)}, Query: ${JSON.stringify(query)}, Body: ${JSON.stringify(body)}`,
      exception.stack,
    );
    res.setHeader('X-Xss-Protection', '1; mode=block');

    return res.status(status).json({
      status,
      data: status != 500 ? errorMessage : getStatusCodeMessage(status),
    });
  }
}
