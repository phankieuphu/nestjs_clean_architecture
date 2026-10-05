import * as Joi from 'joi';

export const configValidationsSchema = Joi.object({
  NODE_ENV: Joi.string().default('development'),
  APP_PORT: Joi.number().default(3000),

  DB_NAME: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().allow('').default(''),
  DB_PORT: Joi.number().required(),
  DB_HOST: Joi.string().required(),

  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),

  JWT_SECRET_KEY: Joi.string().required(),
  JWT_TOKEN_EXPIRE: Joi.string().required(),

  AUTH_TOKEN: Joi.string().optional(),
  CORS_ORIGINS: Joi.string().optional(),
});
