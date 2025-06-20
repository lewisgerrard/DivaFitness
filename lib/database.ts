import { neon } from "@neondatabase/serverless"

// Initialize database connection
let sql: ReturnType<typeof neon>

try {
  console.log("🔍 Initializing Neon database connection...")

  // Use the provided Neon database URL
  const databaseUrl =
    process.env.DATABASE_URL ||
    "postgresql://neondb_owner:npg_BQFXhk7f4VCP@ep-aged-union-ab6ljmy3-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require"

  if (databaseUrl) {
    console.log("✅ Using Neon database URL")
    sql = neon(databaseUrl)
    console.log("✅ Database connection initialized successfully")
  } else {
    throw new Error("No database URL available")
  }
} catch (error) {
  console.error("❌ Failed to initialize database connection:", error)
  // Provide a fallback to prevent crashes
  sql = null as any
}

// Export the sql client
export { sql }

// Contact form submissions (keeping for backward compatibility)
export async function createContactSubmission(data: {
  name: string
  email: string
  phone?: string
  service?: string
  message: string
}) {
  try {
    if (!sql) {
      console.error("Database connection not available")
      return null
    }

    // For now, we'll store contact submissions as potential clients
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
    if (!sql) {
      console.error("Database connection not available")
      return []
    }

    const result = await sql`
      SELECT * FROM users 
      WHERE role = 'client' AND password_hash = 'temp_password_hash'
      ORDER BY id DESC
    `
    return result
  } catch (error) {
    console.error("Get contact submissions error:", error)
    return []
  }
}
