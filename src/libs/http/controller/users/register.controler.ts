import z from "zod"
import { prisma } from "@/libs/prisma.js"
import type { FastifyReply, FastifyRequest } from "fastify"
import { hash } from "bcryptjs"
import { env } from "@/env/index.js"

export async function register (request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        nome: z.string().trim().min(1).max(100),
        email: z.email().min(1).max(100),
        password: z.string().min(8).max(100),
        foto: z.string().optional().nullable()
    })

    const {nome, email, password, foto} = registerBodySchema.parse(request.body)

    const passwordHash = await hash(password, env.HASH_SALT_ROUNDS)

    const user = await prisma.usuario.create({
        data: {
            nome,
            email,
            passwordHash,
            foto: foto ?? null
            
        }   
    })
    return reply.status(201).send(user)
}