import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set")
}

export const sql = neon(process.env.DATABASE_URL)

// Emergency Contacts
export async function getEmergencyContacts(userId: number) {
  try {
    const result = await sql`
      SELECT * FROM emergency_contacts 
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `
    return result
  } catch (error) {
    console.error("Get emergency contacts error:", error)
    return []
  }
}

export async function createEmergencyContact(data: {
  user_id: number
  full_name: string
  relationship?: string
  phone?: string
  email?: string
  address?: string
}) {
  try {
    const result = await sql`
      INSERT INTO emergency_contacts (user_id, full_name, relationship, phone, email, address)
      VALUES (${data.user_id}, ${data.full_name}, ${data.relationship || null}, 
              ${data.phone || null}, ${data.email || null}, ${data.address || null})
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error("Create emergency contact error:", error)
    return null
  }
}

// Body Measurements
export async function getBodyMeasurements(userId: number) {
  try {
    const result = await sql`
      SELECT * FROM body_measurements 
      WHERE user_id = ${userId}
      ORDER BY recorded_at DESC
    `
    return result
  } catch (error) {
    console.error("Get body measurements error:", error)
    return []
  }
}

export async function createBodyMeasurement(data: {
  user_id: number
  weight_kg?: number
  height_cm?: number
  recorded_at: string
}) {
  try {
    const result = await sql`
      INSERT INTO body_measurements (user_id, weight_kg, height_cm, recorded_at)
      VALUES (${data.user_id}, ${data.weight_kg || null}, ${data.height_cm || null}, ${data.recorded_at})
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error("Create body measurement error:", error)
    return null
  }
}

// Appointments
export async function getAppointments(userId?: number) {
  try {
    if (userId) {
      const result = await sql`
        SELECT a.*, u.first_name, u.last_name 
        FROM appointments a
        JOIN users u ON a.user_id = u.id
        WHERE a.user_id = ${userId}
        ORDER BY a.appointment_time DESC
      `
      return result
    } else {
      const result = await sql`
        SELECT a.*, u.first_name, u.last_name 
        FROM appointments a
        JOIN users u ON a.user_id = u.id
        ORDER BY a.appointment_time DESC
      `
      return result
    }
  } catch (error) {
    console.error("Get appointments error:", error)
    return []
  }
}

export async function createAppointment(data: {
  user_id: number
  appointment_type: "1-to-1" | "group" | "nutrition"
  appointment_time: string
  duration_minutes?: number
  status?: "booked" | "paid" | "cancelled" | "completed"
  notes?: string
}) {
  try {
    const result = await sql`
      INSERT INTO appointments (user_id, appointment_type, appointment_time, duration_minutes, status, notes)
      VALUES (${data.user_id}, ${data.appointment_type}, ${data.appointment_time}, 
              ${data.duration_minutes || 60}, ${data.status || "booked"}, ${data.notes || null})
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error("Create appointment error:", error)
    return null
  }
}

export async function updateAppointment(
  id: number,
  data: {
    appointment_type?: "1-to-1" | "group" | "nutrition"
    appointment_time?: string
    duration_minutes?: number
    status?: "booked" | "paid" | "cancelled" | "completed"
    notes?: string
  },
) {
  try {
    const result = await sql`
      UPDATE appointments 
      SET 
        appointment_type = COALESCE(${data.appointment_type || null}, appointment_type),
        appointment_time = COALESCE(${data.appointment_time || null}, appointment_time),
        duration_minutes = COALESCE(${data.duration_minutes || null}, duration_minutes),
        status = COALESCE(${data.status || null}, status),
        notes = COALESCE(${data.notes || null}, notes),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error("Update appointment error:", error)
    return null
  }
}

// Contact form submissions (keeping for backward compatibility)
export async function createContactSubmission(data: {
  name: string
  email: string
  phone?: string
  service?: string
  message: string
}) {
  try {
    // For now, we'll store contact submissions as potential clients
    // You might want to create a separate contact_submissions table later
    const result = await sql`
      INSERT INTO users (first_name, last_name, email, password_hash, role, phone)
      VALUES (${data.name.split(" ")[0]}, ${data.name.split(" ").slice(1).join(" ")}, 
              ${data.email}, 'temp_password_hash', 'client', ${data.phone || null})
      ON CONFLICT (email) DO NOTHING
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error("Create contact submission error:", error)
    return null
  }
}

export async function getContactSubmissions() {
  try {
    // Return users with role 'client' who might be from contact forms
    const result = await sql`
      SELECT * FROM users 
      WHERE role = 'client' AND password_hash = 'temp_password_hash'
      ORDER BY created_at DESC
    `
    return result
  } catch (error) {
    console.error("Get contact submissions error:", error)
    return []
  }
}
