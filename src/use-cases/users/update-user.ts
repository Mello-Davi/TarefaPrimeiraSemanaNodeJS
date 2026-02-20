import type { Usuario } from "@/@types/prisma/client";
import type { UsuariosRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface UpdateUserUseCaseRequest {
    publicId: string,
    nome?: string,
    email?: string,
    foto?: string
}

type UpdateUserUseCaseResponse = {
    user: Usuario
}

export class UpdateUserUseCase {
    constructor (private usuariosRepository: UsuariosRepository){}
    async execute ({
        publicId,
        nome,
        email,
        foto,
    }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse>{
        
        const userToUpdate = await this.usuariosRepository.findBy({publicId})

        if (!userToUpdate){
            throw new ResourceNotFoundError()
        }

        const user = await this.usuariosRepository.update(userToUpdate.id, {
            nome,
            email,
            foto
        })

        return {user}
    }
}