import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import jwt from "jsonwebtoken"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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

    const clientId = params.id

    const client = await sql`
      SELECT id, first_name, last_name, email, phone, role, status, created_at, address, date_of_birth
      FROM users 
      WHERE id = ${clientId} AND role = 'client'
    `

    if (client.length === 0) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 })
    }

    return NextResponse.json({ client: client[0] })
  } catch (error) {
    console.error("Error fetching client:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
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

    const clientId = params.id
    const body = await request.json()

    const updatedClient = await sql`
      UPDATE users 
      SET 
        first_name = COALESCE(${body.first_name}, first_name),
        last_name = COALESCE(${body.last_name}, last_name),
        email = COALESCE(${body.email}, email),
        phone = COALESCE(${body.phone}, phone),
        status = COALESCE(${body.status}, status),
        address = COALESCE(${body.address}, address),
        date_of_birth = COALESCE(${body.date_of_birth}, date_of_birth),
        updated_at = NOW()
      WHERE id = ${clientId} AND role = 'client'
      RETURNING id, first_name, last_name, email, phone, status, created_at, address, date_of_birth
    `

    if (updatedClient.length === 0) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 })
    }

    return NextResponse.json({ client: updatedClient[0] })
  } catch (error) {
    console.error("Error updating client:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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

    const clientId = params.id

    const deletedClient = await sql`
      DELETE FROM users 
      WHERE id = ${clientId} AND role = 'client'
      RETURNING id
    `

    if (deletedClient.length === 0) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Client deleted successfully" })
  } catch (error) {
    console.error("Error deleting client:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
