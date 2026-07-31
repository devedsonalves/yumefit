import 'reflect-metadata'
import 'express-async-errors'

import '@shared/container'

import express, { Request, Response, NextFunction } from 'express'
import cookieParser from 'cookie-parser'
import { isCelebrateError } from 'celebrate'

import '@shared/infrastructure/typeorm'
import '@shared/container'

import routes from '@shared/infrastructure/http/routes'
import AppError from '@shared/errors/AppError'
import { apiReference } from '@scalar/express-api-reference'
import { swaggerSpec } from './swagger'
import { CORS_ORIGIN } from '@shared/utils/environment'

interface ValidationError {
  [key: string]: string
}

export const app = express()

const allowedOrigins = (CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use((request, response, next) => {
  const origin = request.headers.origin

  if (origin && allowedOrigins.includes(origin)) {
    response.header('Access-Control-Allow-Origin', origin)
    response.header('Access-Control-Allow-Credentials', 'true')
    response.header('Vary', 'Origin')
  }

  response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')

  if (request.method === 'OPTIONS') {
    return response.status(204).send()
  }

  return next()
})

app.use(cookieParser())
app.use(express.json())

app.use(
  '/docs',
  apiReference({
    spec: {
      content: swaggerSpec,
    },
    theme: 'default',
    darkMode: true,
  }),
)

app.use(routes)

app.use((errors: Error, request: Request, response: Response, _: NextFunction) => {
  if (errors instanceof AppError) {
    return response.status(errors.statusCode).json({
      status: 'error',
      message: errors.message,
    })
  }

  if (isCelebrateError(errors)) {
    let validateErrors: ValidationError = {}

    errors.details.forEach((error) => {
      error.details.map((validateError) => {
        validateErrors[validateError.path[0]] = validateError.message
      })
    })

    return response.status(400).json({
      status: 'Validate Fails',
      errors: validateErrors,
    })
  }

  console.log(errors)

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  })
})
