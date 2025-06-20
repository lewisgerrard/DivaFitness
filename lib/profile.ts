import { sql } from "@/lib/database"

export async function getUserProfile(userId: number) {
  try {
    const result = await sql`
      SELECT * FROM user_profiles WHERE user_id = ${userId}
    `
    return result.length > 0 ? result[0] : null
  } catch (error) {
    console.error("Get user profile error:", error)
    return null
  }
}
