import { type NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"
import { createUser } from "@/lib/auth"
import { neon } from "@neondatabase/serverless"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
const secret = new TextEncoder().encode(JWT_SECRET)
const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  console.log("=== Create user API called ===")

  try {
    // Get token from Authorization header
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ No valid authorization header")
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    console.log("🎫 Token found, verifying...")

    // Verify JWT token
    const { payload } = await jwtVerify(token, secret)
    console.log("✅ JWT verified, user role:", payload.role)

    if (payload.role !== "admin") {
      console.log("❌ User is not admin")
      return NextResponse.json({ error: "Not authorized" }, { status: 403 })
    }

    // Parse request body
    const body = await request.json()
    console.log("📝 Request body:", body)

    // Validate required fields
    if (!body.first_name || !body.last_name || !body.email || !body.password) {
      console.log("❌ Missing required fields")
      return NextResponse.json(
        {
          error: "Missing required fields: first_name, last_name, email, password",
        },
        { status: 400 },
      )
    }

    // Check if email already exists
    console.log("🔍 Checking if email already exists:", body.email)
    const existingUsers = await sql`SELECT id FROM users WHERE email = ${body.email}`

    if (existingUsers.rows && existingUsers.rows.length > 0) {
      console.log("❌ Email already exists:", body.email)
      return NextResponse.json(
        {
          error: "A user with this email already exists",
        },
        { status: 409 },
      )
    }

    // Create user
    console.log("👤 Creating user...")
    const newUser = await createUser({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      password: body.password,
      role: body.role || "member",
      phone: body.phone || null,
      address: body.address || null,
      date_of_birth: body.date_of_birth || null,
      photo_url: body.photo_url || null,
    })

    if (!newUser) {
      console.log("❌ Failed to create user")
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
    }

    console.log("✅ User created successfully:", newUser.id)
    return NextResponse.json(
      {
        message: "User created successfully",
        user: newUser,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("❌ Create user API error:", error)

    // Handle specific database errors
    if (error.message && error.message.includes("duplicate key")) {
      return NextResponse.json(
        {
          error: "A user with this email already exists",
        },
        { status: 409 },
      )
    }

    return NextResponse.json(
      {
        error: "Internal server error: " + error.message,
      },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

    if (decoded.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const clients = await sql`
      SELECT id, first_name, last_name, email, phone, status, created_at, address, date_of_birth
      FROM users 
      WHERE role = 'client'
      ORDER BY created_at DESC
    `

    return NextResponse.json({ clients })
  } catch (error) {
    console.error("Error fetching clients:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
