import { sql } from "@/lib/database"
import bcrypt from "bcryptjs"
import type { User } from "@/types/user"

export class UserService {
  static async authenticate(email: string, password: string): Promise<User | null> {
    if (!email || !password) {
      throw new Error("Email and password are required")
    }

    const result = await sql`
      SELECT id, first_name, last_name, email, password_hash, role, status
      FROM users 
      WHERE email = ${email} AND status = 'active'
    `

    if (result.length === 0) return null

    const user = result[0] as any
    const isValidPassword = await bcrypt.compare(password, user.password_hash)

    if (!isValidPassword) return null

    const { password_hash, ...userWithoutPassword } = user
    return userWithoutPassword as User
  }

  static async getById(id: number): Promise<User | null> {
    const result = await sql`
      SELECT id, first_name, last_name, email, role, status, created_at
      FROM users 
      WHERE id = ${id}
    `

    return (result[0] as User) || null
  }

  static async create(userData: CreateUserData): Promise<User> {
    const validation = this.validateUserData(userData)
    if (!validation.isValid) {
      throw new Error(validation.errors.join(", "))
    }

    const password_hash = await bcrypt.hash(userData.password, 12) // Increased rounds

    const result = await sql`
      INSERT INTO users (first_name, last_name, email, password_hash, role, status)
      VALUES (${userData.first_name}, ${userData.last_name}, ${userData.email}, 
              ${password_hash}, ${userData.role || "client"}, 'active')
      RETURNING id, first_name, last_name, email, role, status, created_at
    `

    return result[0] as User
  }

  private static validateUserData(data: CreateUserData) {
    const errors: string[] = []

    if (!data.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.push("Invalid email format")
    }

    if (!data.password || data.password.length < 8) {
      errors.push("Password must be at least 8 characters")
    }

    if (!data.first_name?.trim()) {
      errors.push("First name is required")
    }

    return { isValid: errors.length === 0, errors }
  }
}

interface CreateUserData {
  first_name: string
  last_name: string
  email: string
  password: string
  role?: "admin" | "client"
}
