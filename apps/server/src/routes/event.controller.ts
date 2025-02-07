import EventService from '../services/event.service'
import type { FastifyTypebox } from '../utils/types'

/**
 * Event routes
 * @param {FastifyTypebox} fastify Encapsulated Fastify Instance
 */
const eventController = async (fastify: FastifyTypebox) => {
  const eventService = EventService()
  /**
   * Get all events
   */
  fastify.get('/', async (request, reply) => {
    const events = await eventService.findAll()
    reply.code(200).send(events)
  })
  /**
   * Get one event by id
   */
  fastify.get<{
    Params: {
      eventId: string
    }
  }>('/:eventId', async (request, reply) => {
    const event = await eventService.findOneById(request.params.eventId)
    reply.code(200).send(event)
  })
}

export default eventController
