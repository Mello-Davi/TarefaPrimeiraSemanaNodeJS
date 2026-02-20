import { Prisma, type Post } from "@/@types/prisma/client"

export interface PostsRepository{
    create(data: Prisma.PostCreateInput): Promise<Post>
    findBy(where: Prisma.PostWhereInput): Promise<Post | null>
    list(): Promise<Post[]>
    delete(id: number): Promise<void>
    update(id: number, data: Prisma.PostUpdateInput): Promise<Post>
}