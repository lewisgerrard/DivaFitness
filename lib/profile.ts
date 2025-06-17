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

export async function getUserHealthData(userId: number) {
  try {
    const result = await sql`
      SELECT * FROM health_data 
      WHERE user_id = ${userId} 
      ORDER BY measurement_date DESC
    `
    return result
  } catch (error) {
    console.error("Get health data error:", error)
    return []
  }
}

export async function getUserHealthGoals(userId: number) {
  try {
    const result = await sql`
      SELECT * FROM health_goals 
      WHERE user_id = ${userId} 
      ORDER BY created_at DESC
    `
    return result
  } catch (error) {
    console.error("Get health goals error:", error)
    return []
  }
}

export async function getUserAppointments(userId: number) {
  try {
    const result = await sql`
      SELECT a.*, u.name as trainer_name
      FROM appointments a
      LEFT JOIN users u ON a.trainer_id = u.id
      WHERE a.user_id = ${userId} 
      ORDER BY a.appointment_date DESC, a.appointment_time DESC
    `
    return result
  } catch (error) {
    console.error("Get appointments error:", error)
    return []
  }
}
