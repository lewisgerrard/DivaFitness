import { type NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"
import { getUserById, updateUser, deleteUser } from "@/lib/auth"

// Force dynamic rendering
export const dynamic = "force-dynamic"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
const secret = new TextEncoder().encode(JWT_SECRET)

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authHeader = request.headers.get("authorization")
    const cookieToken = request.cookies.get("auth-token")?.value

    let token = null

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7)
    } else if (cookieToken) {
      token = cookieToken
    }

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const { payload } = await jwtVerify(token, secret)

    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 })
    }

    const userId = Number.parseInt(params.id)
    const user = await getUserById(userId)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Get user API error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authHeader = request.headers.get("authorization")
    const cookieToken = request.cookies.get("auth-token")?.value

    let token = null

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7)
    } else if (cookieToken) {
      token = cookieToken
    }

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const { payload } = await jwtVerify(token, secret)

    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 })
    }

    const userId = Number.parseInt(params.id)
    const updateData = await request.json()

    const updatedUser = await updateUser(userId, updateData)

    if (!updatedUser) {
      return NextResponse.json({ error: "Failed to update user" }, { status: 400 })
    }

    return NextResponse.json({ user: updatedUser })
  } catch (error) {
    console.error("Update user API error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authHeader = request.headers.get("authorization")
    const cookieToken = request.cookies.get("auth-token")?.value

    let token = null

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7)
    } else if (cookieToken) {
      token = cookieToken
    }

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const { payload } = await jwtVerify(token, secret)

    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 })
    }

    const userId = Number.parseInt(params.id)
    const success = await deleteUser(userId)

    if (!success) {
      return NextResponse.json({ error: "Failed to delete user" }, { status: 400 })
    }

    return NextResponse.json({ message: "User deleted successfully" })
  } catch (error) {
    console.error("Delete user API error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
