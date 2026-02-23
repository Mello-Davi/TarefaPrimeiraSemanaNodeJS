import { PrismaUsuariosReporistory } from "@/repositories/prisma/users-prisma-repository";
import { AuthenticateUsuarioUseCase } from "../users/authenticate"; 

export function makeAuthenticateUseCase(){
    const usuariosRepository = new PrismaUsuariosReporistory()
    const authenticateUserUseCase = new AuthenticateUsuarioUseCase(usuariosRepository)

    return authenticateUserUseCase
}