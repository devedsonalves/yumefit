import { createConnection } from 'typeorm'
import {
  TYPEORM_TYPE,
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE,
} from '@shared/utils/environment'

const fileExtension = __filename.endsWith('.js') ? 'js' : 'ts'

export const databaseConnection = createConnection({
  type: (TYPEORM_TYPE as any) || 'postgres',
  host: TYPEORM_HOST || 'localhost',
  port: Number(TYPEORM_PORT) || 5432,
  username: TYPEORM_USERNAME,
  password: TYPEORM_PASSWORD,
  database: TYPEORM_DATABASE,
  logging: true,
  migrationsRun: true,
  migrations: [`${__dirname}/migrations/*.${fileExtension}`],
  entities: [`${__dirname}/../../../modules/**/infrastructure/typeorm/entities/*.${fileExtension}`],
})
  .then((connection) => {
    console.log('[TypeORM] Database connected successfully.')
    return connection
  })
  .catch((err) => {
    console.error('[TypeORM] CreateConnection failed:', err)
    return null
  })
