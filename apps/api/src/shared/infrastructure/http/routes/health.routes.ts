import { Router } from 'express'
import Redis from 'ioredis'

import RedisConfig from '@config/redis'
import { databaseConnection } from '@shared/infrastructure/typeorm'

const healthRouter = Router()

healthRouter.get('/', async (_, response) => {
  const connection = await databaseConnection
  let databaseStatus = 'down'
  let redisStatus = 'down'

  if (connection?.isConnected) {
    try {
      await connection.query('SELECT 1')
      databaseStatus = 'up'
    } catch {
      databaseStatus = 'down'
    }
  }

  const redis = new Redis({
    ...RedisConfig.config,
    lazyConnect: true,
    enableOfflineQueue: false,
    maxRetriesPerRequest: 1,
  })

  try {
    await redis.connect()
    await redis.ping()
    redisStatus = 'up'
  } catch {
    redisStatus = 'down'
  } finally {
    redis.disconnect()
  }

  const isHealthy = databaseStatus === 'up' && redisStatus === 'up'

  return response.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? 'up' : 'degraded',
    services: {
      api: 'up',
      database: databaseStatus,
      redis: redisStatus,
    },
  })
})

export default healthRouter
