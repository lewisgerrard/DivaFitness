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
  created_at?: string
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  try {
    // Ensure we have a valid email and password
    if (!email || !password) {
      console.error("Email and password are required")
      return null
    }

    // Check if database connection is available
    if (!sql) {
      console.error("Database connection not available")
      return null
    }

    const result = await sql`
      SELECT id, first_name, last_name, email, password_hash, address, phone, 
             date_of_birth, photo_url, role
      FROM users 
      WHERE email = ${email}
    `

    if (result.length === 0) {
      console.log("No user found with email:", email)
      return null
    }

    const user = result[0] as any

    // Check if password_hash exists
    if (!user.password_hash) {
      console.error("No password hash found for user")
      return null
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash)

    if (!isValidPassword) {
      console.log("Invalid password for user:", email)
      return null
    }

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
    // Check if database connection is available
    if (!sql) {
      console.error("Database connection not available")
      return []
    }

    const result = await sql`
      SELECT id, first_name, last_name, email, address, phone, 
             date_of_birth, photo_url, role
      FROM users 
      ORDER BY id DESC
    `

    return result as User[]
  } catch (error) {
    console.error("Get users error:", error)
    return []
  }
}

export async function getUserById(id: number): Promise<User | null> {
  try {
    if (!sql) {
      console.error("Database connection not available")
      return null
    }

    const result = await sql`
      SELECT id, first_name, last_name, email, address, phone,
             date_of_birth, photo_url, role
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
    if (!sql) {
      console.error("Database connection not available")
      return null
    }

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
          date_of_birth, photo_url, role
    `

    if (result.length === 0) return null

    return result[0] as User
  } catch (error) {
    console.error("Create user error:", error)
    return null
  }
}

export async function updateUser(id: number, data: Partial<Omit<User, "id">>): Promise<User | null> {
  try {
    if (!sql) {
      console.error("Database connection not available")
      return null
    }

    const result = await sql`
      UPDATE users 
      SET 
        first_name = COALESCE(${data.first_name || null}, first_name),
        last_name = COALESCE(${data.last_name || null}, last_name),
        phone = COALESCE(${data.phone || null}, phone),
        address = COALESCE(${data.address || null}, address),
        date_of_birth = COALESCE(${data.date_of_birth || null}, date_of_birth),
        photo_url = COALESCE(${data.photo_url || null}, photo_url),
        role = COALESCE(${data.role || null}, role)
      WHERE id = ${id}
      RETURNING id, first_name, last_name, email, address, phone,
          date_of_birth, photo_url, role
    `

    if (result.length === 0) return null

    return result[0] as User
  } catch (error) {
    console.error("Update user error:", error)
    return null
  }
}

export async function deleteUser(id: number): Promise<boolean> {
  try {
    if (!sql) {
      console.error("Database connection not available")
      return false
    }

    const result = await sql`
      DELETE FROM users 
      WHERE id = ${id}
    `

    return true
  } catch (error) {
    console.error("Delete user error:", error)
    return false
  }
}
