import type { Usuario } from "@/@types/prisma/client"
import type { UsuariosRepository } from "@/repositories/users-repository"
import { InvalidCredentialsError } from "../errors/invalid-credentials-error"
import { compare } from "bcryptjs"

interface AuthenticateUsuarioUseCaseRequest {
    email: string
    password: string
}

type AuthenticateUsuarioUseCaseResponse = {
    user: Usuario
}

export class AuthenticateUsuarioUseCase {
    constructor (private usuariosRepository: UsuariosRepository){}

    async execute({
        email, 
        password
    }: AuthenticateUsuarioUseCaseRequest): Promise<AuthenticateUsuarioUseCaseResponse> {
        const user = await this.usuariosRepository.findByEmail(email)

        if(!user){
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatches = await compare(password, user.passwordHash)

        if(!doesPasswordMatches){
            throw new InvalidCredentialsError()
        }
        return {user}
    }
}