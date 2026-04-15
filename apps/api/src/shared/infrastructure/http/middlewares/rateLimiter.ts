import { Request, Response, NextFunction } from 'express'
import { createClient } from 'redis'
import { RateLimiterRedis } from 'rate-limiter-flexible'

import AppError from '@shared/errors/AppError'

import { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } from '@shared/utils/environment'

const redisClient = createClient({
  host: REDIS_HOST,
  port: Number(REDIS_PORT),
  password: REDIS_PASSWORD || undefined,
})

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimiter',
  points: 4,
  duration: 1,
})

async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(request.ip!)

    return next()
  } catch (error) {
    throw new AppError('Too many request', 429)
  }
}

export default rateLimiter
