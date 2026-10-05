import { DataSource } from 'typeorm';
import config from '../src/config/env.config';

// DataSource used by the TypeORM CLI (see the migration:* scripts in package.json)
export default new DataSource({
  type: 'mysql',
  host: config.DATABASE.HOST,
  port: config.DATABASE.PORT,
  username: config.DATABASE.USER,
  password: config.DATABASE.PASSWORD,
  database: config.DATABASE.NAME,
  entities: [`${__dirname}/../src/**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  migrationsTableName: 'migrations',
});
