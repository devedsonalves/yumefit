import Fastify from 'fastify'
import { healthMessage } from '@repo/core'

const app = Fastify()

app.get('/health', async () => {
  return {
    ok: true,
    message: healthMessage(),
    service: 'forgefit-api',
  }
})

const start = async () => {
  try {
    await app.listen({ port: 3333, host: '0.0.0.0' })
    console.log('API running on http://localhost:3333')
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

start()
