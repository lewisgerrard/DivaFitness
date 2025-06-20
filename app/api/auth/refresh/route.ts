import { type NextRequest, NextResponse } from "next/server"
import { jwtVerify, SignJWT } from "jose"
import { getUserById } from "@/lib/auth"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
const secret = new TextEncoder().encode(JWT_SECRET)

export async function POST(request: NextRequest) {
  try {
    console.log("🔄 Token refresh requested")

    // Try to get token from cookie first
    const cookieToken = request.cookies.get("auth-token")?.value

    if (!cookieToken) {
      console.log("❌ No refresh token found in cookies")
      return NextResponse.json({ error: "No refresh token" }, { status: 401 })
    }

    // Verify the existing token (even if expired, we can still get user info)
    try {
      const { payload } = await jwtVerify(cookieToken, secret)
      const userId = (payload.userId as number) || (payload.sub as string)

      // Get fresh user data
      const user = await getUserById(Number(userId))
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }

      // Create new token
      const newToken = await new SignJWT({
        userId: user.id,
        email: user.email,
        role: user.role,
      })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(secret)

      console.log("✅ Token refreshed successfully for user:", user.email)

      const response = NextResponse.json({
        token: newToken,
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
        },
      })

      // Set new cookie
      response.cookies.set("auth-token", newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
      })

      return response
    } catch (jwtError) {
      console.log("❌ Token verification failed during refresh:", jwtError)
      return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 })
    }
  } catch (error) {
    console.error("❌ Token refresh error:", error)
    return NextResponse.json({ error: "Refresh failed" }, { status: 500 })
  }
}
