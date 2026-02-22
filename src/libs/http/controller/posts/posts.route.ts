import type { FastifyInstance } from "fastify";
import { registerPost } from "./register-post.controller";
import { listPosts } from "./list-posts.controller";
import { getPost } from "./get-post.controller";
import { updatePost } from "./update-post.controller";
import { deletePost } from "./delete-post.controller";

export async function postsRoutes(app: FastifyInstance) {
    app.post('/', registerPost)
    app.get('/', listPosts)
    app.get('/:publicId', getPost)
    app.patch('/:publicId', updatePost)
    app.delete('/:publicId', deletePost)
}