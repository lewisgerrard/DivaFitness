import { type NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"
import { sql } from "@/lib/database"

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

    // Get all clients from the database
    const clients = await sql`
      SELECT * FROM clients 
      ORDER BY created_at DESC
    `

    return NextResponse.json({ clients })
  } catch (error) {
    console.error("Get clients error:", error)
    return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 })
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
    const { name, email, phone, service_interest, status, notes } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    // Create new client in the database
    const result = await sql`
      INSERT INTO clients (name, email, phone, service_interest, status, notes)
      VALUES (${name}, ${email}, ${phone || null}, ${service_interest || null}, ${status || "active"}, ${notes || null})
      RETURNING *
    `

    const client = result[0]

    return NextResponse.json({ client }, { status: 201 })
  } catch (error) {
    console.error("Create client error:", error)
    return NextResponse.json({ error: "Failed to create client" }, { status: 500 })
  }
}
