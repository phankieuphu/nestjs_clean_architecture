import * as Joi from 'joi';

export const configValidationsSchema = Joi.object({
  DB_NAME: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_HOST: Joi.string().required(),

  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),

  SLACK_API_URL: Joi.string().required(),
  SLACK_STAFF_TOKEN: Joi.string().required(),
  SLACK_STAFF_TOKENS: Joi.string().required(),

  JWT_SECRET_KEY: Joi.string().required(),
  JWT_TOKEN_EXPIRE: Joi.string().required(),

  SALUS_SAML_CER: Joi.string().required(),
  SAML_ENTRY_POINT: Joi.string().required(),
  SAML_ISSUER: Joi.string().required(),
  SAML_CALLBACK_URL: Joi.string().required(),

  FRONT_BASE_URL: Joi.string().required(),
  FRONT_PUBLIC_URL: Joi.string().required(),

  S3_REGION: Joi.string().required(),
}).allow();
