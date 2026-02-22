
import type { PostsRepository } from "@/repositories/posts-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeletePostUseCaseRequest {
    publicId: string
}

export class DeletePostUseCase {
    constructor (private postsRepository: PostsRepository){}
    
    async execute ({
        publicId
    }: DeletePostUseCaseRequest){
        
        const postToDelete = await this.postsRepository.findBy({publicId})
 
        if (!postToDelete){
            throw new ResourceNotFoundError()
        }

        await this.postsRepository.delete(postToDelete.id)
    }
}