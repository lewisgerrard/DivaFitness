import { sql } from "@/lib/database"
import bcrypt from "bcryptjs"

export interface User {
  id: number
  email: string
  name: string
  role: "user" | "admin"
  first_name?: string
  last_name?: string
  phone?: string
  address?: string
  status: string
  date_of_birth?: string
  emergency_contact_name?: string
  emergency_contact_phone?: string
  created_at: string
  updated_at: string
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  try {
    // First, check if the combined users table exists (after migration)
    const tableCheck = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'first_name'
    `

    const hasCombinedFields = tableCheck.length > 0

    let result
    if (hasCombinedFields) {
      // Use combined table structure
      result = await sql`
        SELECT id, email, password_hash, name, role, first_name, last_name, phone, address, status, 
               date_of_birth, emergency_contact_name, emergency_contact_phone, 
               created_at, updated_at
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
      status: user.status || "active",
      date_of_birth: user.date_of_birth || null,
      emergency_contact_name: user.emergency_contact_name || null,
      emergency_contact_phone: user.emergency_contact_phone || null,
    } as User
  } catch (error) {
    console.error("Authentication error:", error)
    return null
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    // Check if combined table exists
    const tableCheck = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'first_name'
    `

    const hasCombinedFields = tableCheck.length > 0

    let result
    if (hasCombinedFields) {
      result = await sql`
        SELECT id, email, name, role, first_name, last_name, phone, address, status, 
               date_of_birth, emergency_contact_name, emergency_contact_phone, 
               created_at, updated_at
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
      status: user.status || "active",
      date_of_birth: user.date_of_birth || null,
      emergency_contact_name: user.emergency_contact_name || null,
      emergency_contact_phone: user.emergency_contact_phone || null,
    })) as User[]
  } catch (error) {
    console.error("Get users error:", error)
    return []
  }
}

export async function getUserById(id: number): Promise<User | null> {
  try {
    // Check if combined table exists
    const tableCheck = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'first_name'
    `

    const hasCombinedFields = tableCheck.length > 0

    let result
    if (hasCombinedFields) {
      result = await sql`
        SELECT id, email, name, role, first_name, last_name, phone, address, status,
               date_of_birth, emergency_contact_name, emergency_contact_phone,
               created_at, updated_at
        FROM users 
        WHERE id = ${id}
      `
    } else {
      result = await sql`
        SELECT id, email, name, role, created_at, updated_at
        FROM users 
        WHERE id = ${id}
      `
    }

    if (result.length === 0) return null

    const user = result[0] as any
    return {
      ...user,
      first_name: user.first_name || null,
      last_name: user.last_name || null,
      phone: user.phone || null,
      address: user.address || null,
      status: user.status || "active",
      date_of_birth: user.date_of_birth || null,
      emergency_contact_name: user.emergency_contact_name || null,
      emergency_contact_phone: user.emergency_contact_phone || null,
    } as User
  } catch (error) {
    console.error("Get user error:", error)
    return null
  }
}

export async function createUser(data: {
  email: string
  password: string
  name: string
  role?: "user" | "admin"
  first_name?: string
  last_name?: string
  phone?: string
  address?: string
  date_of_birth?: string
  emergency_contact_name?: string
  emergency_contact_phone?: string
}): Promise<User | null> {
  try {
    const password_hash = await bcrypt.hash(data.password, 10)

    // Check if combined table exists
    const tableCheck = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'first_name'
    `

    const hasCombinedFields = tableCheck.length > 0

    let result
    if (hasCombinedFields) {
      result = await sql`
        INSERT INTO users (
          email, password_hash, name, role, first_name, last_name, phone, address,
          date_of_birth, emergency_contact_name, emergency_contact_phone
        )
        VALUES (
          ${data.email}, ${password_hash}, ${data.name}, ${data.role || "user"},
          ${data.first_name || null}, ${data.last_name || null}, ${data.phone || null},
          ${data.address || null}, ${data.date_of_birth || null}, 
          ${data.emergency_contact_name || null}, ${data.emergency_contact_phone || null}
        )
        RETURNING id, email, name, role, first_name, last_name, phone, address, status,
                  date_of_birth, emergency_contact_name, emergency_contact_phone,
                  created_at, updated_at
      `
    } else {
      result = await sql`
        INSERT INTO users (email, password_hash, name, role)
        VALUES (${data.email}, ${password_hash}, ${data.name}, ${data.role || "user"})
        RETURNING id, email, name, role, created_at, updated_at
      `
    }

    if (result.length === 0) return null

    const user = result[0] as any
    return {
      ...user,
      first_name: user.first_name || null,
      last_name: user.last_name || null,
      phone: user.phone || null,
      address: user.address || null,
      status: user.status || "active",
      date_of_birth: user.date_of_birth || null,
      emergency_contact_name: user.emergency_contact_name || null,
      emergency_contact_phone: user.emergency_contact_phone || null,
    } as User
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
    // Check if combined table exists
    const tableCheck = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'first_name'
    `

    const hasCombinedFields = tableCheck.length > 0

    let result
    if (hasCombinedFields) {
      result = await sql`
        UPDATE users 
        SET 
          name = COALESCE(${data.name || null}, name),
          first_name = COALESCE(${data.first_name || null}, first_name),
          last_name = COALESCE(${data.last_name || null}, last_name),
          phone = COALESCE(${data.phone || null}, phone),
          address = COALESCE(${data.address || null}, address),
          status = COALESCE(${data.status || null}, status),
          date_of_birth = COALESCE(${data.date_of_birth || null}, date_of_birth),
          emergency_contact_name = COALESCE(${data.emergency_contact_name || null}, emergency_contact_name),
          emergency_contact_phone = COALESCE(${data.emergency_contact_phone || null}, emergency_contact_phone),
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id}
        RETURNING id, email, name, role, first_name, last_name, phone, address, status,
                  date_of_birth, emergency_contact_name, emergency_contact_phone,
                  created_at, updated_at
      `
    } else {
      result = await sql`
        UPDATE users 
        SET 
          name = COALESCE(${data.name || null}, name),
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id}
        RETURNING id, email, name, role, created_at, updated_at
      `
    }

    if (result.length === 0) return null

    const user = result[0] as any
    return {
      ...user,
      first_name: user.first_name || null,
      last_name: user.last_name || null,
      phone: user.phone || null,
      address: user.address || null,
      status: user.status || "active",
      date_of_birth: user.date_of_birth || null,
      emergency_contact_name: user.emergency_contact_name || null,
      emergency_contact_phone: user.emergency_contact_phone || null,
    } as User
  } catch (error) {
    console.error("Update user error:", error)
    return null
  }
}
