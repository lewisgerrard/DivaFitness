import { sql } from "@/lib/database"
import bcrypt from "bcryptjs"

export interface User {
  id: number
  email: string
  name: string
  role: "user" | "admin" | "client" | "member"
  first_name?: string
  last_name?: string
  phone?: string
  address?: string
  date_of_birth?: string
  emergency_contact_name?: string
  emergency_contact_phone?: string
  service_interest?: string
  notes?: string
  status: string
  created_at: string
  updated_at: string
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  try {
    // Check if the consolidated table structure exists
    const tableCheck = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'first_name'
    `

    const hasConsolidatedFields = tableCheck.length > 0

    let result
    if (hasConsolidatedFields) {
      // Use consolidated table structure
      result = await sql`
        SELECT id, email, password_hash, name, role, first_name, last_name, phone, address, 
               date_of_birth, emergency_contact_name, emergency_contact_phone, 
               service_interest, notes, status, created_at, updated_at
        FROM users 
        WHERE email = ${email}
      `
    } else {
      // Use original table structure
      result = await sql`
        SELECT id, email, password_hash, name, role, created_at, updated_at
        FROM users 
        WHERE email = ${email}
      `
    }

    if (result.length === 0) return null

    const user = result[0] as any
    const isValidPassword = await bcrypt.compare(password, user.password_hash)

    if (!isValidPassword) return null

    // Return user without password_hash, with default values for missing fields
    const { password_hash, ...userWithoutPassword } = user
    return {
      ...userWithoutPassword,
      first_name: user.first_name || null,
      last_name: user.last_name || null,
      phone: user.phone || null,
      address: user.address || null,
      date_of_birth: user.date_of_birth || null,
      emergency_contact_name: user.emergency_contact_name || null,
      emergency_contact_phone: user.emergency_contact_phone || null,
      service_interest: user.service_interest || null,
      notes: user.notes || null,
      status: user.status || "active",
    } as User
  } catch (error) {
    console.error("Authentication error:", error)
    return null
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    // Check if consolidated table exists
    const tableCheck = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'first_name'
    `

    const hasConsolidatedFields = tableCheck.length > 0

    let result
    if (hasConsolidatedFields) {
      result = await sql`
        SELECT id, email, name, role, first_name, last_name, phone, address, 
               date_of_birth, emergency_contact_name, emergency_contact_phone, 
               service_interest, notes, status, created_at, updated_at
        FROM users 
        ORDER BY created_at DESC
      `
    } else {
      result = await sql`
        SELECT id, email, name, role, created_at, updated_at
        FROM users 
        ORDER BY created_at DESC
      `
    }

    return result.map((user: any) => ({
      ...user,
      first_name: user.first_name || null,
      last_name: user.last_name || null,
      phone: user.phone || null,
      address: user.address || null,
      date_of_birth: user.date_of_birth || null,
      emergency_contact_name: user.emergency_contact_name || null,
      emergency_contact_phone: user.emergency_contact_phone || null,
      service_interest: user.service_interest || null,
      notes: user.notes || null,
      status: user.status || "active",
    })) as User[]
  } catch (error) {
    console.error("Get users error:", error)
    return []
  }
}

export async function getUserById(id: number): Promise<User | null> {
  try {
    const result = await sql`
      SELECT id, email, name, role, first_name, last_name, phone, address,
             date_of_birth, emergency_contact_name, emergency_contact_phone,
             service_interest, notes, status, created_at, updated_at
      FROM users 
      WHERE id = ${id}
    `

    if (result.length === 0) return null

    return result[0] as User
  } catch (error) {
    console.error("Get user error:", error)
    return null
  }
}

export async function createUser(data: {
  email: string
  password: string
  name: string
  role?: "user" | "admin" | "client" | "member"
  first_name?: string
  last_name?: string
  phone?: string
  address?: string
  date_of_birth?: string
  emergency_contact_name?: string
  emergency_contact_phone?: string
  service_interest?: string
  notes?: string
}): Promise<User | null> {
  try {
    const password_hash = await bcrypt.hash(data.password, 10)

    const result = await sql`
      INSERT INTO users (
        email, password_hash, name, role, first_name, last_name, phone, address,
        date_of_birth, emergency_contact_name, emergency_contact_phone,
        service_interest, notes
      )
      VALUES (
        ${data.email}, ${password_hash}, ${data.name}, ${data.role || "user"},
        ${data.first_name || null}, ${data.last_name || null}, ${data.phone || null},
        ${data.address || null}, ${data.date_of_birth || null}, 
        ${data.emergency_contact_name || null}, ${data.emergency_contact_phone || null},
        ${data.service_interest || null}, ${data.notes || null}
      )
      RETURNING id, email, name, role, first_name, last_name, phone, address, 
                date_of_birth, emergency_contact_name, emergency_contact_phone,
                service_interest, notes, status, created_at, updated_at
    `

    if (result.length === 0) return null

    return result[0] as User
  } catch (error) {
    console.error("Create user error:", error)
    return null
  }
}

export async function updateUser(
  id: number,
  data: Partial<Omit<User, "id" | "created_at" | "updated_at">>,
): Promise<User | null> {
  try {
    const result = await sql`
      UPDATE users 
      SET 
        name = COALESCE(${data.name || null}, name),
        first_name = COALESCE(${data.first_name || null}, first_name),
        last_name = COALESCE(${data.last_name || null}, last_name),
        phone = COALESCE(${data.phone || null}, phone),
        address = COALESCE(${data.address || null}, address),
        date_of_birth = COALESCE(${data.date_of_birth || null}, date_of_birth),
        emergency_contact_name = COALESCE(${data.emergency_contact_name || null}, emergency_contact_name),
        emergency_contact_phone = COALESCE(${data.emergency_contact_phone || null}, emergency_contact_phone),
        service_interest = COALESCE(${data.service_interest || null}, service_interest),
        notes = COALESCE(${data.notes || null}, notes),
        status = COALESCE(${data.status || null}, status),
        role = COALESCE(${data.role || null}, role),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING id, email, name, role, first_name, last_name, phone, address,
                date_of_birth, emergency_contact_name, emergency_contact_phone,
                service_interest, notes, status, created_at, updated_at
    `

    if (result.length === 0) return null

    return result[0] as User
  } catch (error) {
    console.error("Update user error:", error)
    return null
  }
}
