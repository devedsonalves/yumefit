require('dotenv').config({ path: `${__dirname}/.env` })

module.exports = {
  type: process.env.TYPEORM_TYPE || 'postgres',
  host: process.env.TYPEORM_HOST || 'localhost',
  port: Number(process.env.TYPEORM_PORT) || 5432,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  logging: true,
  migrations: [`${__dirname}/src/shared/infrastructure/typeorm/migrations/*.ts`],
  entities: [`${__dirname}/src/modules/**/infrastructure/typeorm/entities/*.ts`],
  cli: {
    migrationsDir: `${__dirname}/src/shared/infrastructure/typeorm/migrations`,
  },
}
