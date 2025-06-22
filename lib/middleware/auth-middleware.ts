import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

export interface AuthenticatedRequest extends NextRequest {
  user: {
    userId: number
    email: string
    role: string
  }
}

export async function authenticateRequest(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  const cookieToken = request.cookies.get("auth-token")?.value

  const token = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : cookieToken

  if (!token) {
    throw new Error("No authentication token provided")
  }

  try {
    const { payload } = await jwtVerify(token, secret)
    return {
      userId: payload.userId as number,
      email: payload.email as string,
      role: payload.role as string,
    }
  } catch (error) {
    throw new Error("Invalid or expired token")
  }
}

export function requireRole(allowedRoles: string[]) {
  return (user: { role: string }) => {
    if (!allowedRoles.includes(user.role)) {
      throw new Error("Insufficient permissions")
    }
  }
}
