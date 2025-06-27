import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  console.log("📋 Getting failed email submissions")

  try {
    // Get contact submissions that might have failed
    const failedSubmissions = await sql`
      SELECT 
        id,
        name,
        email,
        phone,
        bio as message,
        temp_password_hash as service,
        created_at
      FROM users 
      WHERE temp_password_hash IS NOT NULL 
      AND temp_password_hash != ''
      ORDER BY created_at DESC
      LIMIT 20
    `

    console.log(`📋 Found ${failedSubmissions.length} contact submissions`)

    const formattedSubmissions = failedSubmissions.map((submission) => ({
      id: submission.id,
      name: submission.name,
      email: submission.email,
      phone: submission.phone,
      message: submission.message,
      service: submission.service,
      submittedAt: submission.created_at,
      status: "needs_retry", // We don't track email status in DB yet
    }))

    return NextResponse.json({
      message: "Retrieved contact submissions for retry",
      count: formattedSubmissions.length,
      submissions: formattedSubmissions,
      instructions: {
        retry: "POST /api/contact/retry to attempt sending emails for these submissions",
        individual: "Each submission will attempt both customer and business emails",
        note: "These are stored contact form submissions that may need email retry",
      },
    })
  } catch (error: any) {
    console.error("❌ Failed to get retry submissions:", error)

    return NextResponse.json(
      {
        error: "Failed to retrieve submissions for retry",
        details: error.message,
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  console.log("🔄 Manual retry trigger called")

  try {
    // This endpoint triggers the retry process
    const retryResponse = await fetch(`${request.nextUrl.origin}/api/contact/retry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const retryData = await retryResponse.json()

    return NextResponse.json({
      message: "Retry process triggered",
      results: retryData,
    })
  } catch (error: any) {
    console.error("❌ Manual retry trigger failed:", error)

    return NextResponse.json(
      {
        error: "Failed to trigger retry process",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
