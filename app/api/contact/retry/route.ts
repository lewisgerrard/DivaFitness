import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { CustomerThankYouEmail } from "@/emails/customer-thank-you"
import { BusinessNotificationEmail } from "@/emails/business-notification"
import { sql } from "@/lib/database"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  console.log("🔄 Contact form retry API called")

  try {
    // Check if Resend API key is available
    if (!process.env.RESEND_API_KEY) {
      console.error("❌ RESEND_API_KEY not found in environment variables")
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
    }

    // Get failed submissions from database (those with temp_password_hash indicating they're contact submissions)
    let failedSubmissions = []
    try {
      if (sql) {
        failedSubmissions = await sql`
          SELECT * FROM users 
          WHERE role = 'client' AND password_hash = 'temp_password_hash'
          ORDER BY created_at DESC
          LIMIT 50
        `
        console.log(`📋 Found ${failedSubmissions.length} contact submissions to retry`)
      }
    } catch (dbError) {
      console.error("❌ Database query failed:", dbError)
      return NextResponse.json({ error: "Database connection failed" }, { status: 500 })
    }

    if (failedSubmissions.length === 0) {
      return NextResponse.json({ message: "No contact submissions found to retry" }, { status: 200 })
    }

    let successCount = 0
    let failureCount = 0
    const results = []

    for (const submission of failedSubmissions) {
      const { first_name, last_name, email, phone } = submission
      const fullName = `${first_name} ${last_name}`.trim()

      console.log(`📤 Retrying emails for: ${fullName} (${email})`)

      let customerEmailSuccess = false
      let businessEmailSuccess = false
      let customerEmailError = null
      let businessEmailError = null

      // Send thank you email to customer
      try {
        const customerEmail = await resend.emails.send({
          from: "Diva Fitness <onboarding@resend.dev>",
          to: [email],
          replyTo: "info@diva-fitness.co.uk",
          subject: "Thank you for contacting Diva Fitness - Emma will be in touch soon!",
          react: CustomerThankYouEmail({ name: fullName }),
          headers: {
            "X-Entity-Ref-ID": `contact-retry-${Date.now()}-${submission.id}`,
            "List-Unsubscribe": "<mailto:info@diva-fitness.co.uk>",
          },
          tags: [
            {
              name: "category",
              value: "contact-form-retry",
            },
          ],
        })

        console.log("✅ Customer email sent successfully:", {
          id: customerEmail.data?.id,
          to: email,
        })
        customerEmailSuccess = true
      } catch (emailError: any) {
        console.error("❌ Customer email failed:", {
          error: emailError.message,
          to: email,
        })
        customerEmailError = emailError.message
      }

      // Send notification email to business
      try {
        const businessEmail = await resend.emails.send({
          from: "Diva Fitness Contact Form <onboarding@resend.dev>",
          to: ["info@diva-fitness.co.uk"],
          replyTo: email,
          subject: `Contact Form Submission (Retry) from ${fullName}`,
          react: BusinessNotificationEmail({
            name: fullName,
            email,
            phone: phone || undefined,
            message: "This is a retry of a previous contact form submission. Original message may not be available.",
            service: "Contact form retry",
          }),
          headers: {
            "X-Entity-Ref-ID": `business-notification-retry-${Date.now()}-${submission.id}`,
          },
          tags: [
            {
              name: "category",
              value: "business-notification-retry",
            },
          ],
        })

        console.log("✅ Business email sent successfully:", {
          id: businessEmail.data?.id,
          to: "info@diva-fitness.co.uk",
        })
        businessEmailSuccess = true
      } catch (emailError: any) {
        console.error("❌ Business email failed:", {
          error: emailError.message,
        })
        businessEmailError = emailError.message
      }

      const result = {
        submissionId: submission.id,
        name: fullName,
        email,
        customerEmailSuccess,
        businessEmailSuccess,
        customerEmailError,
        businessEmailError,
      }

      results.push(result)

      if (customerEmailSuccess || businessEmailSuccess) {
        successCount++
      } else {
        failureCount++
      }

      // Add a small delay between emails to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    const response = {
      message: `Retry completed. ${successCount} successful, ${failureCount} failed.`,
      totalProcessed: failedSubmissions.length,
      successCount,
      failureCount,
      results,
    }

    console.log("📊 Retry results:", response)

    return NextResponse.json(response, { status: 200 })
  } catch (error: any) {
    console.error("❌ Contact form retry critical error:", {
      message: error.message,
      stack: error.stack,
      error,
    })

    return NextResponse.json(
      {
        error: "Failed to retry contact form submissions",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
