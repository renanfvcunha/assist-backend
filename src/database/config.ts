import { resolve } from 'path';

export const ormConfig = () => ({
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  entities: [resolve(__dirname, '..', 'app', '**', '*.entity{.ts,.js}')],
  migrations: [resolve(__dirname, 'migrations', '*{.ts,.js}')],
  cli: {
    migrationsDir: resolve(__dirname, 'migrations'),
    entitiesDir: resolve(__dirname, '..', 'app'),
  },
  synchronize: false,
});

const config = ormConfig();

export default config;
