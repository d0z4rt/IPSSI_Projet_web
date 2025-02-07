import cors from '@fastify/cors'
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import fastify from 'fastify'
import authController from './routes/auth.controller'
import bookingController from './routes/booking.controller'
import concertController from './routes/concert.controller'
import eventSubscriptionController from './routes/event-subscription.controller'
import eventController from './routes/event.controller'

/**
 * Create the fastify instance with correct typings
 */
const server = fastify({ logger: true }).withTypeProvider<TypeBoxTypeProvider>()

/**
 * Set cors for the server
 * ! FIXME: for now accept all domains but you need to restrict it in prod
 */
server.register(cors, {
  origin: true, // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  credentials: true // Allow credentials (e.g., cookies)
})

/**
 * Simple GET route on `/` for healthchecks
 */
server.get('/', async (request, reply) => {
  reply.send({
    statusCode: 200,
    message: 'Server is online',
    responseTime: reply.elapsedTime
  })
})

/**
 * Register the server routes
 */
server.register(authController, { prefix: '/auth' })
server.register(concertController, { prefix: '/concerts' })
server.register(bookingController, { prefix: '/bookings' })
server.register(eventController, { prefix: '/events' })
server.register(eventSubscriptionController, {
  prefix: '/events-subscriptions'
})

/**
 * Start the server
 */
server.listen({ port: 4000 }, (err, address) => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
  console.info(`\x1b[33m✨ Server listening at ${address}\x1b[0m`)
})
