import { type NextRequest, NextResponse } from "next/server"
import { SignJWT } from "jose"
import { authenticateUser } from "@/lib/auth"

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    console.log("🔐 Login attempt for:", email)

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    const user = await authenticateUser(email, password)

    if (!user) {
      console.log("❌ Authentication failed for:", email)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    console.log("✅ Authentication successful for:", email, "Role:", user.role)

    // Create JWT token
    const token = await new SignJWT({
      userId: user.id,
      email: user.email,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(secret)

    console.log("🎫 JWT token created, length:", token.length)

    // Return token in response body instead of cookie
    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
      },
      token: token, // Include token in response
    })

    console.log("✅ Login successful, token included in response")

    return response
  } catch (error) {
    console.error("❌ Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
