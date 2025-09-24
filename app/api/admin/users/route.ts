import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const sql = neon(process.env.DATABASE_URL!)

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

    const users = await sql`
      SELECT id, first_name, last_name, email, phone, role, status, created_at, address, date_of_birth
      FROM users 
      ORDER BY created_at DESC
    `

    return NextResponse.json({ users })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
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

    const { first_name, last_name, email, phone, role, password } = await request.json()

    // Validate required fields
    if (!first_name || !last_name || !email || !password || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `

    if (existingUser.length > 0) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const newUser = await sql`
      INSERT INTO users (first_name, last_name, email, phone, role, password_hash, status, created_at, updated_at)
      VALUES (${first_name}, ${last_name}, ${email}, ${phone || null}, ${role}, ${hashedPassword}, 'active', NOW(), NOW())
      RETURNING id, first_name, last_name, email, phone, role, status, created_at
    `

    return NextResponse.json({ user: newUser[0] }, { status: 201 })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
