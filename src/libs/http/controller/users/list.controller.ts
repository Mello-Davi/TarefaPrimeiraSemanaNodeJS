import type { FastifyReply, FastifyRequest } from "fastify"
import { UserPresenter } from "../../presenters/user-presenter"
import { makeListUseCase } from "@/use-cases/factories/make-list-users"


export async function list (_request: FastifyRequest, reply: FastifyReply) {
    try {
        const listUserUseCase = makeListUseCase()
        
        const { users } = await listUserUseCase.execute()
    
        return reply.status(200).send(UserPresenter.toHTTP(users))
    } catch (error){

        throw error
    }


}