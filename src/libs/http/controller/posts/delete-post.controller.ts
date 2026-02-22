import z  from "zod"
import { makeDeletePostUseCase } from "@/use-cases/factories/make-delete-post"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import type { FastifyReply, FastifyRequest } from "fastify"


export async function deletePost (request: FastifyRequest, reply: FastifyReply) {
    try {
        const deletePostParamsSchema = z.object({
            publicId: z.string()
        })
    
        const { publicId } = deletePostParamsSchema.parse(request.params)
   
        const deletePostUseCase = makeDeletePostUseCase()
        await deletePostUseCase.execute({
            publicId
        })
        return reply.status(200).send()
    } catch (error){
        if(error instanceof ResourceNotFoundError){
            return reply.status(404).send({message: error.message})
        }
        throw error
    }


}