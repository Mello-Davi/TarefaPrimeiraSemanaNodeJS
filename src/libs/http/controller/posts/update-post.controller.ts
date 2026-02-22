import z  from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
import { PostPresenter } from "../../presenters/post-presenter"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { makeUpdatePostUseCase } from "@/use-cases/factories/make-update-post"

export async function updatePost (request: FastifyRequest, reply: FastifyReply) {
    try {
        const updateParamsSchema = z.object({
            publicId: z.string(),
            conteudo: z.string().optional()
        })
    
        const { publicId } = updateParamsSchema.parse(request.params)

        const updateBodySchema = z.object({
            conteudo: z.string().min(1).max(1000).optional(),
        })
    
        const {conteudo} = updateBodySchema.parse(request.body)
   
        const updatePostUseCase = makeUpdatePostUseCase()
        const { post } = await updatePostUseCase.execute({
            publicId,
            conteudo
        })
    
        return reply.status(200).send(PostPresenter.toHTTP(post))
    } catch (error){
        if(error instanceof ResourceNotFoundError){
            return reply.status(404).send({message: error.message})
        }
        throw error
    }


}