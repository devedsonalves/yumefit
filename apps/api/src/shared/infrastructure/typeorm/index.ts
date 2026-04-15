import { createConnection } from 'typeorm'
import {
  TYPEORM_TYPE,
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE,
} from '@shared/utils/environment'

createConnection({
  type: (TYPEORM_TYPE as any) || 'postgres',
  host: TYPEORM_HOST || 'localhost',
  port: Number(TYPEORM_PORT) || 5432,
  username: TYPEORM_USERNAME,
  password: TYPEORM_PASSWORD,
  database: TYPEORM_DATABASE,
  logging: true,
  migrations: [`${__dirname}/migrations/*.ts`],
  entities: [`${__dirname}/../../../modules/**/infrastructure/typeorm/entities/*.ts`],
})
  .then(() => console.log('[TypeORM] Database connected successfully.'))
  .catch((err) => console.error('[TypeORM] CreateConnection failed:', err))
