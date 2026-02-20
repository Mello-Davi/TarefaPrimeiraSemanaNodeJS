import z  from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
import { makeUpdateUseCase } from "@/use-cases/factories/make-update-user"
import { UserPresenter } from "../../presenters/user-presenter"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"

export async function update (request: FastifyRequest, reply: FastifyReply) {
    try {
        const updateParamsSchema = z.object({
            publicId: z.string(),
        })
    
        const { publicId } = updateParamsSchema.parse(request.params)

        const updateBodySchema = z.object({
            nome: z.string().trim().min(1).max(100).optional(),
            email: z.email().min(1).max(100).optional(),
            foto: z.string().optional()
        })
    
        const {nome, email, foto} = updateBodySchema.parse(request.body)
   
        const updateUserUseCase = makeUpdateUseCase()
        const { user } = await updateUserUseCase.execute({
            publicId,
            nome,
            email,
            foto,
        })
    
        return reply.status(200).send(UserPresenter.toHTTP(user))
    } catch (error){
        if(error instanceof ResourceNotFoundError){
            return reply.status(404).send({message: error.message})
        }
        throw error
    }


}