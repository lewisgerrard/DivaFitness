import { type NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"
import { getAllUsers } from "@/lib/auth"

// Make sure we use the same secret everywhere
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
const secret = new TextEncoder().encode(JWT_SECRET)

export async function GET(request: NextRequest) {
  console.log("=== Admin users API called ===")

  try {
    // Debug: Log all cookies
    const allCookies = request.cookies.getAll()
    console.log(
      "All cookies received:",
      allCookies.map((c) => ({ name: c.name, hasValue: !!c.value })),
    )

    // Get token from cookie
    const token = request.cookies.get("auth-token")?.value
    console.log("Auth token found:", !!token)
    console.log("Token length:", token?.length || 0)

    if (!token) {
      console.log("❌ No auth token found in cookies")
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Verify token
    console.log("🔍 Verifying token with secret:", JWT_SECRET.substring(0, 3) + "...")
    const { payload } = await jwtVerify(token, secret)
    console.log("✅ JWT payload verified:", payload)

    // Check if user has admin role
    if (payload.role !== "admin") {
      console.log("❌ User is not admin:", payload.role)
      return NextResponse.json({ error: "Not authorized" }, { status: 403 })
    }

    console.log("✅ User is admin, fetching users...")

    // Get all users
    const users = await getAllUsers()
    console.log("✅ Found users:", users.length)

    return NextResponse.json({ users })
  } catch (error) {
    console.error("❌ Admin users API error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
