import { PrismaPostsRepository } from "@/repositories/prisma/posts-prisma-repository";
import { UpdatePostUseCase } from "../posts/update-post";


export function makeUpdatePostUseCase(){
    const postsRepository = new PrismaPostsRepository()
    const updatePostsUseCase = new UpdatePostUseCase(postsRepository)

    return updatePostsUseCase
}