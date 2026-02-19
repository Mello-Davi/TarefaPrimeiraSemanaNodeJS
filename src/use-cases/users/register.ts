import type { Usuario } from "@/@types/prisma/client";
import { prisma } from "@/libs/prisma";
import { hash } from "bcryptjs"
import { env } from "@/env/index.js"

interface RegisterUserUseCaseRequest {
    nome: string;
    email: string;
    password: string;
    foto?: string
}

type RegisterUserUseCaseResponse = {
    user: Usuario
}

export class RegisterUserUseCase {
    async execute ({
        nome,
        email,
        password,
        foto
    }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse>{
        const userWithSameEmail = await prisma.usuario.findFirst( ({
            where:{
                email
            }
        }))
    
        if(userWithSameEmail){
            throw new Error('Email already in use.')
        }
    
        const passwordHash = await hash(password, Number(env.HASH_SALT_ROUNDS))
    
        const user = await prisma.usuario.create({
            data: {
                nome,
                email,
                passwordHash,
                ...(foto !== undefined && { foto })
            }   
        })
        return {user}
    }
}