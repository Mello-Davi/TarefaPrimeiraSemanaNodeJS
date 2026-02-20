import type { PostCreateInput, PostUpdateInput, PostWhereInput } from "@/@types/prisma/models";
import type { PostsRepository } from "../posts-repository";
import { prisma } from "@/libs/prisma";

export class PrismaPostsRepository implements PostsRepository {
    async create(data: PostCreateInput){
        return await prisma.post.create({ data });
    }
    
    async findBy(where: PostWhereInput) {
        return await prisma.post.findFirst({ where });
    }
    
    async list() {
        return await prisma.post.findMany();
    }
    
    async delete(id: number) {
        await prisma.post.delete({ where: { id }})
    }
    
    async update(id: number, data: PostUpdateInput) {
        return await prisma.post.update({
            where: {id}, 
            data
        })
    }
}
