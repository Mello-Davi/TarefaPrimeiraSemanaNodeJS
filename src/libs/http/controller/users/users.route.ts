import type { FastifyInstance } from "fastify"
import { register } from "./register.controller.js"
import { get } from "./get-user.controller.js"
import { list } from "./list.controller.js"
import { deleteUser } from "./delete-user.controller.js"
import { update } from "./update-user.controller.js"

export async function usersRoutes (app: FastifyInstance){
    app.post('/', register)

    app.get('/:publicId', get)
    app.get('/', list)
    app.delete('/:publicId', deleteUser)
    app.patch('/:publicId', update)


}