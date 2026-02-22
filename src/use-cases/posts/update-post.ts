import type { Post } from "@/@types/prisma/client";
import type { PostsRepository } from "@/repositories/posts-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface UpdatePostUseCaseRequest {
    publicId: string,
    conteudo?: string
}

type UpdatePostUseCaseResponse = {
    post: Post
}

export class UpdatePostUseCase {
    constructor (private PostsRepository: PostsRepository){}
    async execute ({
        publicId,
        conteudo
    }: UpdatePostUseCaseRequest): Promise<UpdatePostUseCaseResponse>{
        
        const postToUpdate = await this.PostsRepository.findBy({publicId})

        if (!postToUpdate){
            throw new ResourceNotFoundError()
        }

        const post = await this.PostsRepository.update(postToUpdate.id, {
            conteudo
        })

        return {post}
    }
}