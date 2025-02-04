import { Type } from '@sinclair/typebox'
import AuthService from '../services/auth.service'
import type { FastifyTypebox } from '../utils/types'

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 */
const authController = async (fastify: FastifyTypebox) => {
  const authService = AuthService()

  /**
   * Register route
   */
  fastify.put(
    '/register',
    {
      schema: {
        body: Type.Object({
          name: Type.String(),
          email: Type.String({ format: 'email' }),
          password: Type.String()
        })
      }
    },
    async (request, reply) => {
      const user = await authService.register(request.body)
      reply.code(201).send(user)
    }
  )

  /**
   * Login route
   */
  fastify.post(
    '/login',
    {
      schema: {
        body: Type.Object({
          email: Type.String({ format: 'email' }),
          password: Type.String()
        })
      }
    },
    async (request, reply) => {
      console.log(request.body)
      const user = await authService.login(request.body)
      reply.code(200).send(user)
    }
  )
}

export default authController
