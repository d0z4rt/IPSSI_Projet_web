import ConcertService from '../services/concert.service'
import type { FastifyTypebox } from '../utils/types'

/**
 * Concert routes
 * @param {FastifyTypebox} fastify Encapsulated Fastify Instance
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
  /**
   * Get one concert by id
   */
  fastify.get<{
    Params: {
      concertId: string
    }
  }>('/:concertId', async (request, reply) => {
    const concert = await concertService.findOneById(request.params.concertId)
    reply.code(200).send(concert)
  })
}

export default concertController
