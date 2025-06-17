import { sql } from "@/lib/database"
import bcrypt from "bcryptjs"

export interface User {
  id: number
  first_name?: string
  last_name?: string
  email: string
  password_hash?: string
  address?: string
  phone?: string
  date_of_birth?: string
  photo_url?: string
  role: "admin" | "client" | "member"
  created_at: string
  updated_at: string
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  try {
    const result = await sql`
      SELECT id, first_name, last_name, email, password_hash, address, phone, 
             date_of_birth, photo_url, role, created_at, updated_at
      FROM users 
      WHERE email = ${email}
    `

    if (result.length === 0) return null

    const user = result[0] as any
    const isValidPassword = await bcrypt.compare(password, user.password_hash)

    if (!isValidPassword) return null

    // Return user without password_hash
    const { password_hash, ...userWithoutPassword } = user
    return userWithoutPassword as User
  } catch (error) {
    console.error("Authentication error:", error)
    return null
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const result = await sql`
      SELECT id, first_name, last_name, email, address, phone, 
             date_of_birth, photo_url, role, created_at, updated_at
      FROM users 
      ORDER BY created_at DESC
    `

    return result as User[]
  } catch (error) {
    console.error("Get users error:", error)
    return []
  }
}

export async function getUserById(id: number): Promise<User | null> {
  try {
    const result = await sql`
      SELECT id, first_name, last_name, email, address, phone,
             date_of_birth, photo_url, role, created_at, updated_at
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
  first_name: string
  last_name: string
  email: string
  password: string
  role?: "admin" | "client" | "member"
  phone?: string
  address?: string
  date_of_birth?: string
  photo_url?: string
}): Promise<User | null> {
  try {
    const password_hash = await bcrypt.hash(data.password, 10)

    const result = await sql`
      INSERT INTO users (
        first_name, last_name, email, password_hash, role, phone, address,
        date_of_birth, photo_url
      )
      VALUES (
        ${data.first_name}, ${data.last_name}, ${data.email}, ${password_hash}, 
        ${data.role || "member"}, ${data.phone || null}, ${data.address || null},
        ${data.date_of_birth || null}, ${data.photo_url || null}
      )
      RETURNING id, first_name, last_name, email, address, phone, 
                date_of_birth, photo_url, role, created_at, updated_at
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
        first_name = COALESCE(${data.first_name || null}, first_name),
        last_name = COALESCE(${data.last_name || null}, last_name),
        phone = COALESCE(${data.phone || null}, phone),
        address = COALESCE(${data.address || null}, address),
        date_of_birth = COALESCE(${data.date_of_birth || null}, date_of_birth),
        photo_url = COALESCE(${data.photo_url || null}, photo_url),
        role = COALESCE(${data.role || null}, role),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING id, first_name, last_name, email, address, phone,
                date_of_birth, photo_url, role, created_at, updated_at
    `

    if (result.length === 0) return null

    return result[0] as User
  } catch (error) {
    console.error("Update user error:", error)
    return null
  }
}
