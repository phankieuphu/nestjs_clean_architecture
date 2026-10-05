import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import config from './env.config';

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: config.DATABASE.HOST,
    port: config.DATABASE.PORT,
    username: config.DATABASE.USER,
    password: config.DATABASE.PASSWORD,
    database: config.DATABASE.NAME,
    // Entities registered via TypeOrmModule.forFeature() are picked up automatically
    autoLoadEntities: true,
    synchronize: config.ENV.NODE_ENV === 'development',
    logging: config.ENV.NODE_ENV === 'development',
    migrations: [`${__dirname}/../../db/migrations/*{.ts,.js}`],
    migrationsTableName: 'migrations',
  }),
);
