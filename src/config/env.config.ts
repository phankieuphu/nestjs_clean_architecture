import * as dotenv from 'dotenv';

dotenv.config();

export default {
  ENV: {
    NODE_ENV: process.env.NODE_ENV || 'development',

    APP_ENV: process.env.APP_ENV,
    APP_HOST: process.env.APP_HOST,
    PORT: process.env.APP_PORT || 3000,

    COMPONENT: process.env.COMPONENT,
    VERSION: process.env.VERSION,
    COMMIT_HASH: process.env.COMMIT_HASH,
  },
  DATABASE: {
    HOST: process.env.DB_HOST || 'localhost',
    PORT: parseInt(process.env.DB_PORT, 10) || 3306,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    NAME: process.env.DB_NAME,
  },
  REDIS: {
    HOST: process.env.REDIS_HOST || 'salus-cache',
    PORT: process.env.REDIS_PORT || 6379,
  },
  EXPIRE_LINK: process.env.EXPIRE_LINK || 86400,

  SLACK: {
    STAFF_TOKEN: process.env.SLACK_STAFF_TOKEN || '',
    ADMIN_TOKEN: process.env.SLACK_ADMIN_TOKEN || '',
    STAFF_TOKENS: process.env.SLACK_STAFF_TOKENS?.split(',') || '',
    URL: process.env.SLACK_API_URL || '',
    MAX_REQUEST_ON_TIMES: process.env.SLACK_MAX_REQUEST_ON_TIMES || 50,
    SLACK_DISASTER_CHANNEL_WEBHOOK: process.env.SLACK_DISASTER_CHANNEL_WEBHOOK,
    SLACK_ADMIN_CHANNEL_WEBHOOK: process.env.SLACK_ADMIN_CHANNEL_WEBHOOK,
  },
  AWS: {
    ACCESS_KEY: process.env.AWS_ACCESS_KEY_ID,
    SECRET_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    REGION: process.env.AWS_REGION,
    SESSION_TOKEN: process.env.AWS_SESSION_TOKEN,
  },
  S3: {
    KCCS_INPUT_BUCKET: process.env.KCCS_INPUT_BUCKET,
    S3_REGION: process.env.S3_REGION,
    S3_ENDPOINT: process.env.S3_ENDPOINT,
    S3_STATIC_FILE_BUCKET: process.env.S3_STATIC_FILE_BUCKET,
  },
  SES: {
    SOURCE: process.env.SES_MAIL_SOURCE || '',
    ALLOWED_VIETLINK_EMAILS: process.env.ALLOWED_VIETLINK_EMAILS,
    SES_LIMIT_PER_SECOND: Number.parseInt(process.env.SES_LIMIT_PER_SECOND),
  },
  QUEUE: {
    ALERT_STAFF_INIT: process.env.SQS_ALERT_STAFF_INIT || '',
    ALERT_SERVICE_INIT: process.env.SQS_ALERT_SERVICE_INIT || '',
    ALERT_STOP: process.env.SQS_ALERT_STOP || '',
  },

  FRONT_END: {
    BASE_URL: process.env.FRONT_BASE_URL || '',
    COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,
  },
  FRONT_PUBLIC_URL: process.env.FRONT_PUBLIC_URL || '',
  ALERT: {
    MAX_ALERT_PERIOD_HOURS: process.env.MAX_ALERT_PERIOD_HOURS || 24,
  },
  SAML: {
    SALUS_SAML_CER: process.env.SALUS_SAML_CER,
    SAML_ENTRY_POINT: process.env.SAML_ENTRY_POINT,
    SAML_ISSUER: process.env.SAML_ISSUER,
    SAML_CALLBACK_URL: process.env.SAML_CALLBACK_URL,
  },
  JWT: {
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_TOKEN_EXPIRE: process.env.JWT_TOKEN_EXPIRE,
  },
  KCCS_AUDIENCE: process.env.KCCS_AUDIENCE,
  CORS: {
    CORS_ORIGINS: process.env.CORS_ORIGINS,
  },
  MANUAL_FILE: {
    MANUAL_FILE_PATH: process.env.MANUAL_FILE_PATH,
    ADMIN_MANUAL_FILE_PATH: process.env.ADMIN_MANUAL_FILE_PATH,

    MANUAL_FILE_NAME: process.env.MANUAL_FILE_NAME,
    ADMIN_MANUAL_FILE_NAME: process.env.ADMIN_MANUAL_FILE_NAME,
  },
};
