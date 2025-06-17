import { neon } from "@neondatabase/serverless"

// Initialize database connection
let sql: ReturnType<typeof neon>

try {
  // Try different database URL environment variables in order of preference
  const databaseUrl =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.DATABASE_URL_UNPOOLED ||
    process.env.POSTGRES_URL_NO_SSL

  console.log("🔍 Checking environment variables:", {
    DATABASE_URL: !!process.env.DATABASE_URL,
    POSTGRES_URL: !!process.env.POSTGRES_URL,
    POSTGRES_PRISMA_URL: !!process.env.POSTGRES_PRISMA_URL,
    POSTGRES_URL_NON_POOLING: !!process.env.POSTGRES_URL_NON_POOLING,
    DATABASE_URL_UNPOOLED: !!process.env.DATABASE_URL_UNPOOLED,
    POSTGRES_URL_NO_SSL: !!process.env.POSTGRES_URL_NO_SSL,
    POSTGRES_HOST: !!process.env.POSTGRES_HOST,
    POSTGRES_USER: !!process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: !!process.env.POSTGRES_PASSWORD,
    POSTGRES_DATABASE: !!process.env.POSTGRES_DATABASE,
  })

  if (!databaseUrl) {
    // Try to construct URL from individual components if available
    if (
      process.env.POSTGRES_HOST &&
      process.env.POSTGRES_USER &&
      process.env.POSTGRES_PASSWORD &&
      process.env.POSTGRES_DATABASE
    ) {
      const constructedUrl = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}/${process.env.POSTGRES_DATABASE}?sslmode=require`
      console.log("🔧 Constructing database URL from components")
      sql = neon(constructedUrl)
      console.log("✅ Database connection initialized successfully with constructed URL")
    } else {
      console.error("❌ No database URL found and cannot construct from components")
      throw new Error("No database URL environment variable is set and cannot construct from components")
    }
  } else {
    sql = neon(databaseUrl)
    console.log("✅ Database connection initialized successfully with:", databaseUrl.substring(0, 30) + "...")
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
    if (!sql) {
      console.error("Database connection not available")
      return []
    }

    // Return users with role 'client' who might be from contact forms
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
