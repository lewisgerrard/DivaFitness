import { type NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"
import { getUserById } from "@/lib/auth"
import { getUserProfile } from "@/lib/profile"

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const { payload } = await jwtVerify(token, secret)
    const userId = Number.parseInt(params.userId)

    // Users can only access their own profile, admins can access any profile
    if (payload.userId !== userId && payload.role !== "admin") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    const user = await getUserById(userId)

    // If user table doesn't have profile fields, try to get from user_profiles table
    let profile = null
    if (!user?.first_name) {
      profile = await getUserProfile(userId)
    }

    return NextResponse.json({
      user,
      profile: profile || {
        first_name: user?.first_name,
        last_name: user?.last_name,
        phone: user?.phone,
        address: user?.address,
        status: user?.status || "active",
        date_of_birth: user?.date_of_birth,
        emergency_contact_name: user?.emergency_contact_name,
        emergency_contact_phone: user?.emergency_contact_phone,
      },
    })
  } catch (error) {
    console.error("Get profile error:", error)
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const { payload } = await jwtVerify(token, secret)
    const userId = Number.parseInt(params.userId)

    // Users can only update their own profile, admins can update any profile
    if (payload.userId !== userId && payload.role !== "admin") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    const data = await request.json()

    // Try to update user table first (works for both combined and separate table structures)
    const { updateUser } = await import("@/lib/auth")
    const updatedUser = await updateUser(userId, data)

    if (!updatedUser) {
      return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
    }

    return NextResponse.json({ user: updatedUser })
  } catch (error) {
    console.error("Update profile error:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
