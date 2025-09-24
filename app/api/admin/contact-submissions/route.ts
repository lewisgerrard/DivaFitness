import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import jwt from "jsonwebtoken"

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

    const submissions = await sql`
      SELECT id, name, email, phone, message, status, created_at
      FROM contact_submissions 
      ORDER BY created_at DESC
    `

    return NextResponse.json({ submissions })
  } catch (error) {
    console.error("Error fetching contact submissions:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
