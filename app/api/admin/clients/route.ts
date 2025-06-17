import { type NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"
import { getAllUsers, createUser } from "@/lib/auth"

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const { payload } = await jwtVerify(token, secret)

    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    // Get all users from the consolidated users table
    const users = await getAllUsers()

    return NextResponse.json({ users })
  } catch (error) {
    console.error("Get users error:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const { payload } = await jwtVerify(token, secret)

    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const body = await request.json()
    const {
      name,
      first_name,
      last_name,
      email,
      phone,
      password,
      role,
      address,
      date_of_birth,
      emergency_contact_name,
      emergency_contact_phone,
      service_interest,
      notes,
    } = body

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    // Create new user in the consolidated users table
    const user = await createUser({
      name,
      first_name,
      last_name,
      email,
      phone,
      password,
      role: role || "user",
      address,
      date_of_birth,
      emergency_contact_name,
      emergency_contact_phone,
      service_interest,
      notes,
    })

    if (!user) {
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
    }

    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    console.error("Create user error:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}
