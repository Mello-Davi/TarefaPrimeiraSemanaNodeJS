import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error.js'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate'
import { UserPresenter } from '../../presenters/user-presenter'

const authenticateSchema = z.object({
  email: z.string().trim().min(1),
  password: z.string().trim().min(1),
})

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { email, password } = authenticateSchema.parse(request.body)

    const authenticateUserUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUserUseCase.execute({ email, password })

    const token = await reply.jwtSign(
      { sub: user.publicId},
      { expiresIn: '1d' },
    )

    return reply.status(200).send({ token, user: UserPresenter.toHTTP(user) })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}