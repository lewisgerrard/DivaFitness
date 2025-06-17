import { type NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"
import { getUserById, deleteUser } from "@/lib/auth"

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log("Delete user API called for ID:", params.id)

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

    const userIdToDelete = Number.parseInt(params.id)
    console.log("Deleting user ID:", userIdToDelete)

    await deleteUser(userIdToDelete)
    console.log("User deleted successfully")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete user API error:", error)
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log("Get user API called for ID:", params.id)

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

    const targetUserId = Number.parseInt(params.id)
    console.log("Getting user ID:", targetUserId)

    const targetUser = await getUserById(targetUserId)
    console.log("Target user found:", !!targetUser)

    if (!targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user: targetUser })
  } catch (error) {
    console.error("Get user API error:", error)
    return NextResponse.json({ error: "Failed to get user" }, { status: 500 })
  }
}
