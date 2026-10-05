import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import Joi from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: Joi.ObjectSchema) {}
  transform(value: any, _metadata: ArgumentMetadata) {
    // Use the validated value so Joi conversions and defaults are applied
    const { error, value: validated } = this.schema.validate(value, {
      abortEarly: false,
    });
    if (error) {
      const transformedMessage = error.details.map((detail) => ({
        message: detail.message,
        field: detail.path.join('.'),
      }));

      Logger.debug(transformedMessage, 'JoiValidationPipe');

      throw new BadRequestException(transformedMessage);
    }
    const { page, pageSize, orderBy, sortOrder, ...res } = validated;
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
