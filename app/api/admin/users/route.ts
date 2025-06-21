import { type NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"
import { getAllUsers } from "@/lib/auth"

// Force dynamic rendering
export const dynamic = "force-dynamic"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
const secret = new TextEncoder().encode(JWT_SECRET)

export async function GET(request: NextRequest) {
  console.log("=== Admin users API called ===")

  try {
    // Try to get token from Authorization header first, then cookie
    const authHeader = request.headers.get("authorization")
    const cookieToken = request.cookies.get("auth-token")?.value

    console.log("🎫 Auth header:", authHeader ? "Found" : "Not found")
    console.log("🍪 Cookie token:", cookieToken ? "Found" : "Not found")

    let token = null

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7)
      console.log("✅ Using token from Authorization header")
    } else if (cookieToken) {
      token = cookieToken
      console.log("✅ Using token from cookie")
    }

    if (!token) {
      console.log("❌ No auth token found in header or cookie")
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    console.log("🔍 Verifying token...")
    const { payload } = await jwtVerify(token, secret)
    console.log("✅ JWT payload verified:", payload)

    if (payload.role !== "admin") {
      console.log("❌ User is not admin:", payload.role)
      return NextResponse.json({ error: "Not authorized" }, { status: 403 })
    }

    console.log("✅ User is admin, fetching users...")
    const users = await getAllUsers()
    console.log("✅ Found users:", users.length)

    return NextResponse.json({ users })
  } catch (error) {
    console.error("❌ Admin users API error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
