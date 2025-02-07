import { Type } from '@sinclair/typebox'
import EventSubscriptionService from '../services/event-subscription.service'
import type { FastifyTypebox } from '../utils/types'

/**
 * EventSubscription routes
 * @param {FastifyTypebox} fastify encapsulated Fastify Instance
 */
const eventSubscriptionController = async (fastify: FastifyTypebox) => {
  const eventSubscriptionService = EventSubscriptionService()
  /**
   * Create a new eventSubscription
   */
  fastify.put(
    '/',
    {
      schema: {
        body: Type.Object({
          userId: Type.String(),
          eventId: Type.String()
        })
      }
    },
    async (request, reply) => {
      const eventSubscription = await eventSubscriptionService.create(
        request.body
      )
      reply.code(201).send(eventSubscription)
    }
  )

  /**
   * Get eventSubscriptions by user id
   */
  fastify.get<{
    Params: {
      userId: string
    }
  }>('/:userId', async (request, reply) => {
    const eventSubscriptions = await eventSubscriptionService.findAllByUserId(
      request.params.userId
    )
    reply.code(200).send(eventSubscriptions)
  })

  /**
   * Delete a eventSubscription by id
   */
  fastify.delete<{
    Params: {
      eventSubscriptionId: string
    }
  }>('/:eventSubscriptionId', async (request, reply) => {
    const eventSubscription = await eventSubscriptionService.delete(
      request.params.eventSubscriptionId
    )
    reply.code(200).send(eventSubscription.id)
  })
}

export default eventSubscriptionController
