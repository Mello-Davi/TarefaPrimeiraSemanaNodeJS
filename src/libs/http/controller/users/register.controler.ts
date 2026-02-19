import z from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
import { RegisterUserUseCase } from "@/use-cases/users/register"
import { PrismaUsuariosReporistory } from "@/repositories/prisma/users-prisma-repository"
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error"


export async function register (request: FastifyRequest, reply: FastifyReply) {
    try {
        const registerBodySchema = z.object({
            nome: z.string().trim().min(1).max(100),
            email: z.email().min(1).max(100),
            password: z.string().min(8).max(100),
            foto: z.string().optional()
        })
    
        const {nome, email, password, foto} = registerBodySchema.parse(request.body)
    
        const usuariosRepository = new PrismaUsuariosReporistory()
    
        const { user } = await new RegisterUserUseCase(usuariosRepository).execute({
            nome,
            email,
            password,
            ...(foto !== undefined && {foto})
        })
    
        return reply.status(201).send(user)
    } catch (error){
        if(error instanceof UserAlreadyExistsError){
            return reply.status(409).send({
                message: error.message
            })
        }
        throw error
    }


}