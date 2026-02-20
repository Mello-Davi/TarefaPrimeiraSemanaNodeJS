import type { UsuariosRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteUserUseCaseRequest {
    publicId: string
}

export class DeleteUserUseCase {
    constructor (private usuariosRepository: UsuariosRepository){}
    
    async execute ({
        publicId
    }: DeleteUserUseCaseRequest){
        
        const userToDelete = await this.usuariosRepository.findBy({publicId})
 
        if (!userToDelete){
            throw new ResourceNotFoundError()
        }

        await this.usuariosRepository.delete(userToDelete.id)
    }
}