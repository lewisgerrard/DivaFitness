import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  console.log("📋 Getting contact form submissions")

  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const days = Number.parseInt(searchParams.get("days") || "30")

    // Get contact submissions from the database
    const submissions = await sql`
      SELECT 
        id,
        first_name,
        last_name,
        name,
        email,
        phone,
        bio as message,
        temp_password_hash as service_data,
        created_at,
        updated_at
      FROM users 
      WHERE temp_password_hash IS NOT NULL 
      AND temp_password_hash != ''
      AND temp_password_hash != 'temp_password_hash'
      AND created_at >= NOW() - INTERVAL '${days} days'
      ORDER BY created_at DESC
      LIMIT ${limit}
    `

    console.log(`📋 Found ${submissions.length} contact submissions`)

    // Format the submissions for better readability
    const formattedSubmissions = submissions.map((submission) => {
      // Combine first_name and last_name if name is not available
      const fullName = submission.name || `${submission.first_name || ""} ${submission.last_name || ""}`.trim()

      return {
        id: submission.id,
        submittedAt: submission.created_at,
        updatedAt: submission.updated_at,
        contactInfo: {
          name: fullName,
          email: submission.email,
          phone: submission.phone || "Not provided",
        },
        formContent: {
          message: submission.message || "No message provided",
          servicesInterested: submission.service_data || "Not specified",
        },
        status: "Pending email retry",
      }
    })

    return NextResponse.json({
      success: true,
      message: `Retrieved ${formattedSubmissions.length} contact form submissions`,
      totalSubmissions: formattedSubmissions.length,
      timeRange: `Last ${days} days`,
      submissions: formattedSubmissions,
      summary: {
        totalContacts: formattedSubmissions.length,
        withPhone: formattedSubmissions.filter((s) => s.contactInfo.phone !== "Not provided").length,
        withMessage: formattedSubmissions.filter((s) => s.formContent.message !== "No message provided").length,
        withServices: formattedSubmissions.filter((s) => s.formContent.servicesInterested !== "Not specified").length,
      },
    })
  } catch (error: any) {
    console.error("❌ Failed to get contact submissions:", error)
    return NextResponse.json(
      {
        error: "Failed to retrieve contact submissions",
        details: error.message,
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  console.log("🔍 Getting detailed submission info")

  try {
    const body = await request.json()
    const { submissionId } = body

    if (!submissionId) {
      return NextResponse.json({ error: "Submission ID is required" }, { status: 400 })
    }

    // Get specific submission details
    const submission = await sql`
      SELECT 
        id,
        first_name,
        last_name,
        name,
        email,
        phone,
        bio as message,
        temp_password_hash as service_data,
        created_at,
        updated_at,
        role,
        status
      FROM users 
      WHERE id = ${submissionId}
      AND temp_password_hash IS NOT NULL 
      AND temp_password_hash != ''
      AND temp_password_hash != 'temp_password_hash'
    `

    if (submission.length === 0) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 })
    }

    const sub = submission[0]
    const fullName = sub.name || `${sub.first_name || ""} ${sub.last_name || ""}`.trim()

    const detailedSubmission = {
      id: sub.id,
      submittedAt: sub.created_at,
      updatedAt: sub.updated_at,
      contactInfo: {
        name: fullName,
        firstName: sub.first_name,
        lastName: sub.last_name,
        email: sub.email,
        phone: sub.phone || "Not provided",
      },
      formContent: {
        fullMessage: sub.message || "No message provided",
        servicesInterested: sub.service_data || "Not specified",
        messageLength: (sub.message || "").length,
        hasPhone: !!sub.phone,
      },
      systemInfo: {
        role: sub.role,
        status: sub.status,
        databaseId: sub.id,
      },
    }

    return NextResponse.json({
      success: true,
      submission: detailedSubmission,
    })
  } catch (error: any) {
    console.error("❌ Failed to get detailed submission:", error)
    return NextResponse.json(
      {
        error: "Failed to retrieve detailed submission",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
