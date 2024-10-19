import Joi from 'joi';

export interface CustomJoi extends Joi.Root {
  japanPhoneNumber(): Joi.StringSchema;
}
