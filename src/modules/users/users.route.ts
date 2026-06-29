import type { FastifyInstance } from "fastify"
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox"
import { requireAuth, requireRole } from "../../hooks/auth.hook.js"
import { getMe, getUserByCode } from "./users.controller.js"
import { GetUserByCodeParams } from "./users.schema.js"

export async function usersRoutes(app: FastifyInstance) {
  const server = app.withTypeProvider<TypeBoxTypeProvider>()

  // GET /users/me — ดึงข้อมูลตัวเอง + transaction history
  server.get("/me", { preHandler: [requireAuth] }, getMe)

  // GET /users/code/:code — ค้นหา user จาก 4-digit code (scan QR / manual search)
  server.get(
    "/code/:code",
    {
      schema: { params: GetUserByCodeParams },
      preHandler: [requireRole("STAFF", "ADMIN")],
    },
    getUserByCode
  )
}
