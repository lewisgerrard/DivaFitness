import { type NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"
import { getAllUsers } from "@/lib/auth"

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")

export async function GET(request: NextRequest) {
  try {
    console.log("Admin users API called")

    const token = request.cookies.get("auth-token")?.value
    console.log("Token found:", !!token)

    if (!token) {
      console.log("No auth token found")
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const { payload } = await jwtVerify(token, secret)
    console.log("JWT payload:", payload)

    const userId = payload.userId as number
    console.log("User ID from token:", userId)

    // Get user to check role
    const { getUserById } = await import("@/lib/auth")
    const user = await getUserById(userId)
    console.log("User from database:", user)

    if (!user) {
      console.log("User not found in database")
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (user.role !== "admin") {
      console.log("User is not admin, role:", user.role)
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    console.log("User is admin, fetching all users")
    const users = await getAllUsers()
    console.log("Found users:", users.length)

    return NextResponse.json({ users })
  } catch (error) {
    console.error("Admin users API error:", error)
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }
}
