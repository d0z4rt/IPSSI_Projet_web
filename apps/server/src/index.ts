import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import fastify from 'fastify'
import authController from './routes/auth.controller'

const server = fastify({ logger: true }).withTypeProvider<TypeBoxTypeProvider>()

server.get('/', async (request, reply) => {
  return { hello: 'pong' }
})

server.register(authController, { prefix: '/auth' })

server.listen({ port: 4000 }, (err, address) => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
  console.info(`\x1b[33m✨ Server listening at ${address}\x1b[0m`)
})
