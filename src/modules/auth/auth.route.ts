import type { FastifyInstance } from "fastify"
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox"
import { requireAuth } from "../../hooks/auth.hook.js"
import { login, logout } from "./auth.controller.js"
import { LoginBody } from "./auth.schema.js"

export async function authRoutes(app: FastifyInstance) {
  const server = app.withTypeProvider<TypeBoxTypeProvider>()

  // POST /auth/login
  server.post("/login", { schema: { body: LoginBody } }, login)

  // POST /auth/logout
  server.post("/logout", { preHandler: [requireAuth] }, logout)
}
