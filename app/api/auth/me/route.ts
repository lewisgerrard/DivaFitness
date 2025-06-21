import { type NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"
import { getUserById } from "@/lib/auth"

// Force dynamic rendering
export const dynamic = "force-dynamic"

// Make sure we use the same secret everywhere
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
const secret = new TextEncoder().encode(JWT_SECRET)

export async function GET(request: NextRequest) {
  try {
    console.log("Auth me API called")

    // Try to get token from Authorization header first
    const authHeader = request.headers.get("authorization")
    let token = null

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7)
      console.log("✅ Token found in Authorization header, length:", token.length)
    } else {
      // Fallback to cookie
      token = request.cookies.get("auth-token")?.value
      if (token) {
        console.log("✅ Token found in cookie, length:", token.length)
      }
    }

    console.log("Token found in /me:", !!token)

    if (!token) {
      console.log("❌ No token found in Authorization header or cookies")
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    console.log("🔍 Verifying token with secret:", JWT_SECRET.substring(0, 3) + "...")
    const { payload } = await jwtVerify(token, secret)
    console.log("✅ JWT verified in /me, payload:", payload)

    // Get user from database to ensure they still exist
    const userId = (payload.userId as number) || (payload.sub as string)
    const user = await getUserById(Number(userId))

    if (!user) {
      console.log("❌ User not found in database for ID:", userId)
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    console.log("✅ Returning user from /me:", user.email, user.role)

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("❌ Auth me error:", error)
    if (error instanceof Error && error.message.includes("JWTExpired")) {
      console.log("🔄 Token expired")
      return NextResponse.json({ error: "Token expired" }, { status: 401 })
    }
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }
}
