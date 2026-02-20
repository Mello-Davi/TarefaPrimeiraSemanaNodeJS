import { PrismaUsuariosReporistory } from "@/repositories/prisma/users-prisma-repository";
import { UpdateUserUseCase } from "../users/update-user";

export function makeUpdateUseCase(){
    const usuariosRepository = new PrismaUsuariosReporistory()
    const updateUserUseCase = new UpdateUserUseCase(usuariosRepository)

    return updateUserUseCase
}