import { registerAs } from '@nestjs/config';
import config from './env.config';
export default registerAs('database', () => ({
  type: 'mysql',
  host: config.DATABASE.HOST,
  port: config.DATABASE.PORT,
  username: config.DATABASE.USER,
  password: config.DATABASE.PASSWORD,
  database: config.DATABASE.NAME,
  entities: ['dist/**/*.entity.js'],
  synchronize: config.ENV.NODE_ENV === 'development',
  logging: config.ENV.NODE_ENV === 'development',
  migrations: [`${__dirname}/../../db/migrations/*s{.ts,.js}`],
  migrationsTableName: 'migrations',
  autoLoadEntities: true,
}));
