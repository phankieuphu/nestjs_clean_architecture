import * as dotenv from 'dotenv';

dotenv.config();

export default {
  ENV: {
    NODE_ENV: process.env.NODE_ENV || 'development',
    APP_HOST: process.env.APP_HOST,
    PORT: parseInt(process.env.APP_PORT, 10) || 3000,
  },
  DATABASE: {
    HOST: process.env.DB_HOST || 'localhost',
    PORT: parseInt(process.env.DB_PORT, 10) || 3306,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    NAME: process.env.DB_NAME,
  },
  REDIS: {
    HOST: process.env.REDIS_HOST || 'localhost',
    PORT: parseInt(process.env.REDIS_PORT, 10) || 6379,
  },
  JWT: {
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_TOKEN_EXPIRE: process.env.JWT_TOKEN_EXPIRE || '1d',
  },
  AUTH: {
    API_KEY: process.env.AUTH_TOKEN,
  },
  CORS: {
    CORS_ORIGINS: process.env.CORS_ORIGINS,
  },
};
