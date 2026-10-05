import { Injectable, Logger } from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { Response } from 'express';
import { getStatusCodeMessage } from 'src/constant/error.constant';
import { IResponse } from 'src/interfaces';

@Injectable()
export class ResponseUtils {
  private readonly logger = new Logger(ResponseUtils.name);

  failed(response: IResponse, res: Response) {
    const status_code = response.status_code ?? HttpStatusCode.BadRequest;
    const result = {
      status_code,
      message: response.message || getStatusCodeMessage(status_code),
    };
    this.logger.error(
      `${res.req?.originalUrl} - Response data ${JSON.stringify(result)}`,
    );
    res.setHeader('X-Xss-Protection', '1; mode=block');

    return res.status(status_code).json(result);
  }
  success(response: IResponse, res: Response) {
    const status_code = response.status_code ?? HttpStatusCode.Ok;
    res.setHeader('X-Xss-Protection', '1; mode=block');
    // 204 must not carry a body
    if (status_code === HttpStatusCode.NoContent) {
      return res.status(status_code).send();
    }
    const result = {
      data:
        response.data ?? response.message ?? getStatusCodeMessage(status_code),
      meta: response.meta,
    };
    return res.status(status_code).json(result);
  }

  successWithScim(responseData: IResponse, res: Response) {
    const status_code = responseData.status_code ?? HttpStatusCode.Ok;

    // Set the Content-Type header to application/scim+json
    res.setHeader('Content-Type', 'application/scim+json');

    return res.status(status_code).json(responseData.data ?? {});
  }
}
