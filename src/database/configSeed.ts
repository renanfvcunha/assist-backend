import { resolve } from 'path';

import ormConfig from '~/database/config';

export const ormConfigSeed = () => ({
  ...ormConfig,
  migrations: [resolve(__dirname, 'seeds', '*{.ts,.js}')],
  cli: {
    migrationsDir: resolve(__dirname, 'seeds'),
    entitiesDir: resolve(__dirname, '..', 'app'),
  },
});

const config = ormConfigSeed();

export default config;
