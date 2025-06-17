import { type NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"
import { getUserById, deleteUser, updateUser } from "@/lib/auth"

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")

async function getAuthenticatedUser(request: NextRequest) {
  try {
    // Try Authorization header first
    const authHeader = request.headers.get("authorization")
    let token = null

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7)
      console.log("[SERVER] Token found in Authorization header")
    } else {
      // Fallback to cookie
      token = request.cookies.get("auth-token")?.value
      console.log("[SERVER] Token found in cookie:", !!token)
    }

    if (!token) {
      console.log("[SERVER] No auth token found")
      return null
    }

    const { payload } = await jwtVerify(token, secret)
    console.log("[SERVER] JWT payload:", payload)

    const userId = payload.userId as number
    const user = await getUserById(userId)
    console.log("[SERVER] User from database:", user)

    if (!user || user.role !== "admin") {
      console.log("[SERVER] User not admin or not found, role:", user?.role)
      return null
    }

    return user
  } catch (error) {
    console.error("[SERVER] Auth error:", error)
    return null
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log("[SERVER] Get user API called for ID:", params.id)

    const authenticatedUser = await getAuthenticatedUser(request)
    if (!authenticatedUser) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const targetUserId = Number.parseInt(params.id)
    console.log("[SERVER] Getting user ID:", targetUserId)

    const targetUser = await getUserById(targetUserId)
    console.log("[SERVER] Target user found:", !!targetUser)

    if (!targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user: targetUser })
  } catch (error) {
    console.error("[SERVER] Get user API error:", error)
    return NextResponse.json({ error: "Failed to get user" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log("[SERVER] Update user API called for ID:", params.id)

    const authenticatedUser = await getAuthenticatedUser(request)
    if (!authenticatedUser) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const targetUserId = Number.parseInt(params.id)
    const updateData = await request.json()
    console.log("[SERVER] Update data:", updateData)

    const updatedUser = await updateUser(targetUserId, updateData)
    console.log("[SERVER] User updated:", !!updatedUser)

    if (!updatedUser) {
      return NextResponse.json({ error: "Failed to update user" }, { status: 400 })
    }

    return NextResponse.json({ user: updatedUser })
  } catch (error) {
    console.error("[SERVER] Update user API error:", error)
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log("[SERVER] Delete user API called for ID:", params.id)

    const authenticatedUser = await getAuthenticatedUser(request)
    if (!authenticatedUser) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const userIdToDelete = Number.parseInt(params.id)
    console.log("[SERVER] Deleting user ID:", userIdToDelete)

    const success = await deleteUser(userIdToDelete)
    console.log("[SERVER] User deleted successfully:", success)

    if (!success) {
      return NextResponse.json({ error: "Failed to delete user" }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[SERVER] Delete user API error:", error)
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
}
