import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

export const sql = neon(process.env.DATABASE_URL)

// Contact submission functions
export async function createContactSubmission(data: {
  name: string
  email: string
  phone?: string
  message: string
}) {
  const result = await sql`
    INSERT INTO contact_submissions (name, email, phone, message, created_at)
    VALUES (${data.name}, ${data.email}, ${data.phone || null}, ${data.message}, NOW())
    RETURNING *
  `
  return result[0]
}

export async function getContactSubmissions() {
  const result = await sql`
    SELECT * FROM contact_submissions 
    ORDER BY created_at DESC
  `
  return result
}
