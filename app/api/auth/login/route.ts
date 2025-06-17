import { type NextRequest, NextResponse } from "next/server"
import { SignJWT } from "jose"
import { authenticateUser } from "@/lib/auth"

// Make sure we use the same secret everywhere
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
const secret = new TextEncoder().encode(JWT_SECRET)

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const user = await authenticateUser(email, password)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Create JWT token with consistent structure
    const token = await new SignJWT({
      sub: String(user.id), // Use standard 'sub' claim
      userId: user.id,
      email: user.email,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(secret)

    console.log("🔑 JWT token created with secret:", JWT_SECRET.substring(0, 3) + "...")
    console.log("📝 JWT payload:", { userId: user.id, email: user.email, role: user.role })
    console.log("🎫 Token length:", token.length)

    // Create response
    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
      },
    })

    // Set cookie with explicit domain and path
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: false, // Set to false for development
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
      domain: undefined, // Let browser set domain automatically
    })

    console.log("✅ Login successful for user:", user.email, "Role:", user.role)
    console.log("🍪 Cookie set with token")

    return response
  } catch (error) {
    console.error("❌ Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
