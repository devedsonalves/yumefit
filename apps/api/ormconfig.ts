import {
  TYPEORM_TYPE,
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_PASSWORD,
  TYPEORM_USERNAME,
  TYPEORM_DATABASE,
} from './src/shared/utils/environment'

module.exports = {
  type: TYPEORM_TYPE,
  host: TYPEORM_HOST,
  port: Number(TYPEORM_PORT),
  username: TYPEORM_USERNAME,
  password: TYPEORM_PASSWORD,
  database: TYPEORM_DATABASE,
  logging: true,
  migrations: ['./src/shared/infrastructure/typeorm/migrations/*.ts'],
  entities: ['./src/modules/**/infrastructure/typeorm/entities/*.ts'],
  cli: {
    migrationsDir: './src/shared/infrastructure/typeorm/migrations',
  },
}
