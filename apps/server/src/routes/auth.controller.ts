import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { Type } from '@sinclair/typebox'
import type {
  FastifyBaseLogger,
  FastifyInstance,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault
} from 'fastify'
import { login, register } from '../services/auth.service'

type FastifyTypebox = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FastifyBaseLogger,
  TypeBoxTypeProvider
>

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
const authController = async (fastify: FastifyTypebox) => {
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
      const user = await register(request.body)
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
      const user = await login(request.body)
      reply.code(200).send(user)
    }
  )
}

export default authController
