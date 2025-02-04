import ConcertService from '../services/concert.service'
import type { FastifyTypebox } from '../utils/types'

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 */
const concertController = async (fastify: FastifyTypebox) => {
  const concertService = ConcertService()
  /**
   * Get all concerts
   */
  fastify.get('/', async (request, reply) => {
    const concerts = await concertService.findAll()
    reply.code(200).send(concerts)
  })
}

export default concertController
