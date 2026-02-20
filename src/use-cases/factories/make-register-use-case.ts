import { PrismaUsuariosReporistory } from "@/repositories/prisma/users-prisma-repository";
import { RegisterUserUseCase } from "../users/register";

export function makeRegisterUseCase(){
    const usuariosRepository = new PrismaUsuariosReporistory()
    const registerUserUseCase = new RegisterUserUseCase(usuariosRepository)

    return registerUserUseCase
}