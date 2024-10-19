import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import Joi from 'joi';
import ja from './languages/joi.ja.json';
import { _customFieldErrorJoi } from 'src/utils/joi.util';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: Joi.ObjectSchema) {}
  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value, {
      abortEarly: false,
      messages: ja,
    });
    if (error) {
      const transformedMessage = error.details.map((detail) => ({
        message: detail.message,
        field: _customFieldErrorJoi(detail.path),
      }));

      Logger.debug(transformedMessage, 'JoiValidationPipe');

      throw new BadRequestException(transformedMessage);
    }
    const { page, pageSize, orderBy, sortOrder, ...res } = value;
    const meta = {
      page,
      pageSize,
      orderBy,
      sortOrder,
    };
    return this.getMeta(meta) ? { ...res, meta } : res;
  }
  getMeta(meta) {
    if (
      meta.page === undefined &&
      meta.pageSize === undefined &&
      meta.orderBy === undefined &&
      meta.sortOrder === undefined
    ) {
      return null;
    }
    return meta;
  }
}
