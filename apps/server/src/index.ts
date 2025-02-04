import cors from '@fastify/cors'
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import fastify from 'fastify'
import authController from './routes/auth.controller'
import bookingController from './routes/booking.controller'
import concertController from './routes/concert.controller'
import { wait } from './utils/wait.util'

const server = fastify({ logger: true }).withTypeProvider<TypeBoxTypeProvider>()

server.register(cors, {
  origin: true, // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  credentials: true // Allow credentials (e.g., cookies)
})

server.get('/', async (request, reply) => {
  //! fake delay
  await wait()
  reply.send({
    statusCode: 200,
    message: 'Server is online',
    responseTime: reply.elapsedTime
  })
})
server.register(authController, { prefix: '/auth' })
server.register(concertController, { prefix: '/concerts' })
server.register(bookingController, { prefix: '/bookings' })

server.listen({ port: 4000 }, (err, address) => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
  console.info(`\x1b[33m✨ Server listening at ${address}\x1b[0m`)
})
