import { Type } from '@sinclair/typebox'
import BookingService from '../services/booking.service'
import type { FastifyTypebox } from '../utils/types'

/**
 * Booking routes
 * @param {FastifyTypebox} fastify encapsulated Fastify Instance
 */
const bookingController = async (fastify: FastifyTypebox) => {
  const bookingService = BookingService()
  /**
   * Create a new booking
   */
  fastify.put(
    '/',
    {
      schema: {
        body: Type.Object({
          userId: Type.String(),
          concertId: Type.String()
        })
      }
    },
    async (request, reply) => {
      const booking = await bookingService.create(request.body)
      reply.code(201).send(booking)
    }
  )

  /**
   * Get bookings by user id
   */
  fastify.get<{
    Params: {
      userId: string
    }
  }>('/:userId', async (request, reply) => {
    const bookings = await bookingService.findAllByUserId(request.params.userId)
    reply.code(200).send(bookings)
  })

  /**
   * Delete a booking by id
   */
  fastify.delete<{
    Params: {
      bookingId: string
    }
  }>('/:bookingId', async (request, reply) => {
    const booking = await bookingService.delete(request.params.bookingId)
    reply.code(200).send(booking.id)
  })
}

export default bookingController
