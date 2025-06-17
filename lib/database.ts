import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set")
}

export const sql = neon(process.env.DATABASE_URL)

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
