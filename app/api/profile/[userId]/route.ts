import { type NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"
import { getUserById } from "@/lib/auth"
import { getUserProfile } from "@/lib/profile"

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")

async function getAuthenticatedUser(request: NextRequest) {
  try {
    // Try to get token from Authorization header first
    const authHeader = request.headers.get("authorization")
    let token = null

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7)
      console.log("🎫 Using Bearer token from header")
    } else {
      // Fallback to cookie
      token = request.cookies.get("auth-token")?.value
      console.log("🍪 Using token from cookie")
    }

    if (!token) {
      console.log("❌ No token found in header or cookie")
      return null
    }

    // Validate token format
    const tokenParts = token.split(".")
    if (tokenParts.length !== 3) {
      console.log("❌ Invalid token format")
      return null
    }

    console.log("🔍 Verifying token...")
    const { payload } = await jwtVerify(token, secret)
    console.log("✅ Token verified, user ID:", payload.userId)
    return payload
  } catch (error) {
    console.error("❌ Token verification failed:", error)
    return null
  }
}

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    console.log("📥 Profile GET request for user:", params.userId)

    const payload = await getAuthenticatedUser(request)

    if (!payload) {
      console.log("❌ Authentication failed")
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const userId = Number.parseInt(params.userId)
    console.log("🔍 Requested user ID:", userId, "Authenticated user ID:", payload.userId)

    // Users can only access their own profile, admins can access any profile
    if (payload.userId !== userId && payload.role !== "admin") {
      console.log("❌ Access denied - user can only access own profile")
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    console.log("🔍 Fetching user data...")
    const user = await getUserById(userId)

    if (!user) {
      console.log("❌ User not found")
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // If user table doesn't have profile fields, try to get from user_profiles table
    let profile = null
    if (!user?.first_name) {
      console.log("🔍 Fetching additional profile data...")
      profile = await getUserProfile(userId)
    }

    console.log("✅ Profile data retrieved successfully")
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
    console.error("❌ Get profile error:", error)
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    console.log("📝 Profile PUT request for user:", params.userId)

    const payload = await getAuthenticatedUser(request)

    if (!payload) {
      console.log("❌ Authentication failed")
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const userId = Number.parseInt(params.userId)

    // Users can only update their own profile, admins can update any profile
    if (payload.userId !== userId && payload.role !== "admin") {
      console.log("❌ Access denied - user can only update own profile")
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    const data = await request.json()
    console.log("📝 Updating profile with data:", Object.keys(data))

    // Try to update user table first (works for both combined and separate table structures)
    const { updateUser } = await import("@/lib/auth")
    const updatedUser = await updateUser(userId, data)

    if (!updatedUser) {
      console.log("❌ Failed to update user")
      return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
    }

    console.log("✅ Profile updated successfully")
    return NextResponse.json({ user: updatedUser })
  } catch (error) {
    console.error("❌ Update profile error:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
