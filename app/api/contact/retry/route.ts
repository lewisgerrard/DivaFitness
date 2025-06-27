import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { neon } from "@neondatabase/serverless"
import { CustomerThankYouEmail } from "@/emails/customer-thank-you"
import { BusinessNotificationEmail } from "@/emails/business-notification"

const resend = new Resend(process.env.RESEND_API_KEY)
const sql = neon(process.env.DATABASE_URL!)

// Add retry logic with exponential backoff
async function sendEmailWithRetry(emailFunction: () => Promise<any>, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await emailFunction()
      return { success: true, result, attempt }
    } catch (error: any) {
      console.error(`❌ Email attempt ${attempt} failed:`, error.message)

      if (attempt === maxRetries) {
        throw error
      }

      // Exponential backoff: 1s, 2s, 4s
      const delay = Math.pow(2, attempt - 1) * 1000
      console.log(`⏳ Retrying in ${delay}ms...`)
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }
}

export async function POST(request: NextRequest) {
  console.log("🔄 Contact form retry API called")

  try {
    const body = await request.json()
    const { submissionId, emailType } = body

    // If no specific submission ID provided, retry recent failed submissions
    if (!submissionId) {
      return await retryRecentFailedSubmissions()
    }

    // Retry specific submission
    return await retrySpecificSubmission(submissionId, emailType)
  } catch (error: any) {
    console.error("❌ Retry API error:", error)
    return NextResponse.json(
      {
        error: "Failed to process retry request",
        details: error.message,
      },
      { status: 500 },
    )
  }
}

async function retryRecentFailedSubmissions() {
  console.log("🔄 Retrying recent failed submissions")

  try {
    // Get recent contact submissions from database
    // These are stored in the users table with temp_password_hash containing service info
    const recentSubmissions = await sql`
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
      AND created_at >= NOW() - INTERVAL '24 hours'
      ORDER BY created_at DESC
      LIMIT 10
    `

    console.log(`📋 Found ${recentSubmissions.length} recent submissions to retry`)

    const results = []

    for (const submission of recentSubmissions) {
      console.log(`🔄 Processing submission ${submission.id} for ${submission.name}`)

      let customerEmailSuccess = false
      let businessEmailSuccess = false
      let customerEmailError = null
      let businessEmailError = null

      // Retry customer email
      try {
        const result = await sendEmailWithRetry(async () => {
          return await resend.emails.send({
            from: "Emma Fisher - Diva Fitness <info@diva-fitness.co.uk>",
            to: [submission.email],
            replyTo: "info@diva-fitness.co.uk",
            subject: "Your Diva Fitness inquiry - Emma will respond within 24 hours",
            react: CustomerThankYouEmail({ name: submission.name }),
            headers: {
              "X-Entity-Ref-ID": `retry-customer-${Date.now()}`,
              "List-Unsubscribe": "<mailto:info@diva-fitness.co.uk>",
              "X-Priority": "3",
              "X-MSMail-Priority": "Normal",
              "X-Mailer": "Diva Fitness Contact System",
              "Return-Path": "info@diva-fitness.co.uk",
              Sender: "info@diva-fitness.co.uk",
            },
            tags: [
              {
                name: "category",
                value: "customer-retry",
              },
              {
                name: "type",
                value: "transactional",
              },
            ],
          })
        })

        customerEmailSuccess = true
        console.log(`✅ Customer email retry successful for ${submission.name}`)
      } catch (error: any) {
        customerEmailError = error.message
        console.error(`❌ Customer email retry failed for ${submission.name}:`, error.message)
      }

      // Retry business email
      try {
        const result = await sendEmailWithRetry(async () => {
          return await resend.emails.send({
            from: "Diva Fitness Website <info@diva-fitness.co.uk>",
            to: ["info@diva-fitness.co.uk"],
            replyTo: submission.email,
            subject: `RETRY: New inquiry from ${submission.name} - Diva Fitness`,
            react: BusinessNotificationEmail({
              name: submission.name,
              email: submission.email,
              phone: submission.phone || undefined,
              message: submission.message,
              service: submission.service || "Not specified",
            }),
            headers: {
              "X-Entity-Ref-ID": `retry-business-${Date.now()}`,
              "X-Priority": "2",
              "X-MSMail-Priority": "High",
              "X-Mailer": "Diva Fitness Contact System",
              "Return-Path": "info@diva-fitness.co.uk",
              Sender: "info@diva-fitness.co.uk",
            },
            tags: [
              {
                name: "category",
                value: "business-retry",
              },
              {
                name: "type",
                value: "internal",
              },
            ],
          })
        })

        businessEmailSuccess = true
        console.log(`✅ Business email retry successful for ${submission.name}`)
      } catch (error: any) {
        businessEmailError = error.message
        console.error(`❌ Business email retry failed for ${submission.name}:`, error.message)
      }

      results.push({
        submissionId: submission.id,
        name: submission.name,
        email: submission.email,
        customerEmailSuccess,
        businessEmailSuccess,
        customerEmailError,
        businessEmailError,
      })

      // Small delay between submissions to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    const successCount = results.filter((r) => r.customerEmailSuccess || r.businessEmailSuccess).length
    const totalCount = results.length

    return NextResponse.json({
      success: true,
      message: `Retry completed: ${successCount}/${totalCount} submissions had at least one email sent successfully`,
      results,
      summary: {
        totalSubmissions: totalCount,
        successfulRetries: successCount,
        failedRetries: totalCount - successCount,
        customerEmailsSuccess: results.filter((r) => r.customerEmailSuccess).length,
        businessEmailsSuccess: results.filter((r) => r.businessEmailSuccess).length,
      },
    })
  } catch (error: any) {
    console.error("❌ Failed to retry recent submissions:", error)
    return NextResponse.json(
      {
        error: "Failed to retry recent submissions",
        details: error.message,
      },
      { status: 500 },
    )
  }
}

async function retrySpecificSubmission(submissionId: string, emailType?: "customer" | "business" | "both") {
  console.log(`🔄 Retrying specific submission ${submissionId}, type: ${emailType || "both"}`)

  try {
    // Get specific submission from database
    const submission = await sql`
      SELECT 
        id,
        name,
        email,
        phone,
        bio as message,
        temp_password_hash as service,
        created_at
      FROM users 
      WHERE id = ${submissionId}
      AND temp_password_hash IS NOT NULL 
      AND temp_password_hash != ''
    `

    if (submission.length === 0) {
      return NextResponse.json(
        {
          error: "Submission not found or invalid",
          submissionId,
        },
        { status: 404 },
      )
    }

    const sub = submission[0]
    let customerEmailSuccess = false
    let businessEmailSuccess = false
    let customerEmailError = null
    let businessEmailError = null

    // Retry customer email if requested
    if (emailType === "customer" || emailType === "both" || !emailType) {
      try {
        const result = await sendEmailWithRetry(async () => {
          return await resend.emails.send({
            from: "Emma Fisher - Diva Fitness <info@diva-fitness.co.uk>",
            to: [sub.email],
            replyTo: "info@diva-fitness.co.uk",
            subject: "Your Diva Fitness inquiry - Emma will respond within 24 hours",
            react: CustomerThankYouEmail({ name: sub.name }),
            headers: {
              "X-Entity-Ref-ID": `retry-customer-${submissionId}-${Date.now()}`,
              "List-Unsubscribe": "<mailto:info@diva-fitness.co.uk>",
              "X-Priority": "3",
              "X-MSMail-Priority": "Normal",
              "X-Mailer": "Diva Fitness Contact System",
              "Return-Path": "info@diva-fitness.co.uk",
              Sender: "info@diva-fitness.co.uk",
            },
            tags: [
              {
                name: "category",
                value: "customer-retry",
              },
              {
                name: "submission_id",
                value: submissionId,
              },
            ],
          })
        })

        customerEmailSuccess = true
        console.log(`✅ Customer email retry successful for submission ${submissionId}`)
      } catch (error: any) {
        customerEmailError = error.message
        console.error(`❌ Customer email retry failed for submission ${submissionId}:`, error.message)
      }
    }

    // Retry business email if requested
    if (emailType === "business" || emailType === "both" || !emailType) {
      try {
        const result = await sendEmailWithRetry(async () => {
          return await resend.emails.send({
            from: "Diva Fitness Website <info@diva-fitness.co.uk>",
            to: ["info@diva-fitness.co.uk"],
            replyTo: sub.email,
            subject: `RETRY: New inquiry from ${sub.name} - Diva Fitness`,
            react: BusinessNotificationEmail({
              name: sub.name,
              email: sub.email,
              phone: sub.phone || undefined,
              message: sub.message,
              service: sub.service || "Not specified",
            }),
            headers: {
              "X-Entity-Ref-ID": `retry-business-${submissionId}-${Date.now()}`,
              "X-Priority": "2",
              "X-MSMail-Priority": "High",
              "X-Mailer": "Diva Fitness Contact System",
              "Return-Path": "info@diva-fitness.co.uk",
              Sender: "info@diva-fitness.co.uk",
            },
            tags: [
              {
                name: "category",
                value: "business-retry",
              },
              {
                name: "submission_id",
                value: submissionId,
              },
            ],
          })
        })

        businessEmailSuccess = true
        console.log(`✅ Business email retry successful for submission ${submissionId}`)
      } catch (error: any) {
        businessEmailError = error.message
        console.error(`❌ Business email retry failed for submission ${submissionId}:`, error.message)
      }
    }

    return NextResponse.json({
      success: customerEmailSuccess || businessEmailSuccess,
      message:
        customerEmailSuccess || businessEmailSuccess
          ? "At least one email was sent successfully"
          : "All email retries failed",
      submissionId,
      name: sub.name,
      email: sub.email,
      emailType: emailType || "both",
      results: {
        customerEmailSuccess,
        businessEmailSuccess,
        customerEmailError,
        businessEmailError,
      },
    })
  } catch (error: any) {
    console.error(`❌ Failed to retry submission ${submissionId}:`, error)
    return NextResponse.json(
      {
        error: "Failed to retry specific submission",
        submissionId,
        details: error.message,
      },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  console.log("📋 Getting failed submissions list")

  try {
    // Get recent contact submissions that might need retry
    const recentSubmissions = await sql`
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
      AND created_at >= NOW() - INTERVAL '7 days'
      ORDER BY created_at DESC
      LIMIT 20
    `

    console.log(`📋 Found ${recentSubmissions.length} recent submissions`)

    const formattedSubmissions = recentSubmissions.map((submission) => ({
      id: submission.id,
      name: submission.name,
      email: submission.email,
      phone: submission.phone,
      message: submission.message,
      service: submission.service,
      submittedAt: submission.created_at,
      status: "available_for_retry",
    }))

    return NextResponse.json({
      success: true,
      message: "Retrieved contact submissions available for retry",
      count: formattedSubmissions.length,
      submissions: formattedSubmissions,
      instructions: {
        retryAll: "POST /api/contact/retry (no body) to retry all recent failed submissions",
        retrySpecific: "POST /api/contact/retry with { submissionId: 'id' } to retry specific submission",
        retryByType: "POST /api/contact/retry with { submissionId: 'id', emailType: 'customer' | 'business' | 'both' }",
      },
    })
  } catch (error: any) {
    console.error("❌ Failed to get submissions for retry:", error)

    return NextResponse.json(
      {
        error: "Failed to retrieve submissions for retry",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
