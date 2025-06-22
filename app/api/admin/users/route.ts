import type { NextRequest } from "next/server"
import { UserService } from "@/lib/services/user-service"
import { authenticateRequest, requireRole } from "@/lib/middleware/auth-middleware"
import { ApiResponse } from "@/lib/utils/api-response"

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateRequest(request)
    requireRole(["admin"])(user)

    const users = await UserService.getAll()
    return ApiResponse.success({ users })
  } catch (error) {
    if (error.message.includes("token")) {
      return ApiResponse.unauthorized()
    }
    if (error.message.includes("permissions")) {
      return ApiResponse.forbidden()
    }
    return ApiResponse.serverError()
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await authenticateRequest(request)
    requireRole(["admin"])(user)

    const userData = await request.json()
    const newUser = await UserService.create(userData)

    return ApiResponse.success({ user: newUser }, 201)
  } catch (error) {
    if (error.message.includes("token")) {
      return ApiResponse.unauthorized()
    }
    if (error.message.includes("permissions")) {
      return ApiResponse.forbidden()
    }
    if (error.message.includes("validation") || error.message.includes("required")) {
      return ApiResponse.error(error.message, 400)
    }
    return ApiResponse.serverError()
  }
}
