import { Type } from '@sinclair/typebox'
import AuthService from '../services/auth.service'
import type { FastifyTypebox } from '../utils/types'

/**
 * Authentication routes
 * @param {FastifyTypebox} fastify Encapsulated Fastify Instance
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
          phone: Type.String(),
          street: Type.String(),
          'postal-code': Type.Number(),
          city: Type.String(),
          password: Type.String(),
          'repeat-password': Type.String()
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
      const user = await authService.login(request.body)
      reply.code(200).send(user)
    }
  )
}

export default authController
