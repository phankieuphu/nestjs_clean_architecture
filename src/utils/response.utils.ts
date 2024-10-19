import { Injectable, Res } from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { Response } from 'express';
import { getStatusCodeMessage } from 'src/constant/error.constant';
import { IResponse } from 'src/interfaces';
import { ServiceLogger } from 'src/services/logger.service';

@Injectable()
export class ResponseUtils {
  constructor(private readonly loggerServices: ServiceLogger) {}
  failed(response: IResponse, @Res() res: Response) {
    const status_code = response.status_code ?? HttpStatusCode.BadRequest;
    const result = {
      status_code,
      message: response.message || getStatusCodeMessage(status_code),
    };
    this.loggerServices.error(
      res.req.originalUrl,
      `Response data ${JSON.stringify(result)}`,
    );
    res.setHeader('X-Xss-Protection', '1; mode=block');

    return res.status(status_code).json(result);
  }
  success(response: IResponse, @Res() res: Response) {
    const status_code = response.status_code ?? HttpStatusCode.Ok;
    const result = {
      data:
        response.data || response.message || getStatusCodeMessage(status_code),
      meta: response.meta,
    };
    res.setHeader('X-Xss-Protection', '1; mode=block');
    return res.status(status_code).json(result);
  }

  successWithScim(responseData: IResponse, @Res() res: Response) {
    const status_code = responseData.status_code ?? HttpStatusCode.Ok;

    // Set the Content-Type header to application/scim+json
    res.setHeader('Content-Type', 'application/scim+json');

    return res.status(status_code).json(responseData.data ?? {});
  }
}
