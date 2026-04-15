import * as dotenv from 'dotenv'

const path = `${__dirname}/../../../.env`

dotenv.config({ path })
export const { SECRET, EXPIRES_IN } = process.env
export const {
  TYPEORM_TYPE,
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE,
} = process.env

export const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env
