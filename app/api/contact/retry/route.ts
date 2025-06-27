import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { CustomerThankYouEmail } from "@/emails/customer-thank-you"
import { BusinessNotificationEmail } from "@/emails/business-notification"
import { neon } from "@neondatabase/serverless"

const resend = new Resend(process.env.RESEND_API_KEY)
const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  console.log("🔄 Contact retry API called")

  try {
    // Get all contact submissions from database
    const contactSubmissions = await sql`
      SELECT * FROM users 
      WHERE temp_password_hash IS NOT NULL 
      AND temp_password_hash != ''
      ORDER BY created_at DESC
      LIMIT 50
    `

    console.log(`📋 Found ${contactSubmissions.length} contact submissions to retry`)

    if (contactSubmissions.length === 0) {
      return NextResponse.json({
        message: "No contact submissions found to retry",
        results: [],
      })
    }

    const results = []

    for (const submission of contactSubmissions) {
      console.log(`🔄 Processing retry for: ${submission.name} (${submission.email})`)

      let customerEmailSuccess = false
      let businessEmailSuccess = false
      let customerEmailError = null
      let businessEmailError = null

      // Parse service data from temp_password_hash field
      const serviceData = submission.temp_password_hash || ""

      // Retry customer email
      try {
        const customerEmail = await resend.emails.send({
          from: "Diva Fitness <noreply@diva-fitness.co.uk>",
          to: [submission.email],
          replyTo: "info@diva-fitness.co.uk",
          subject: "Thank you for contacting Diva Fitness - Emma will be in touch soon!",
          react: CustomerThankYouEmail({ name: submission.name }),
          headers: {
            "X-Entity-Ref-ID": `retry-contact-${Date.now()}`,
            "List-Unsubscribe": "<mailto:info@diva-fitness.co.uk>",
          },
          tags: [
            {
              name: "category",
              value: "contact-form-retry",
            },
          ],
        })

        customerEmailSuccess = true
        console.log(`✅ Customer retry email sent: ${customerEmail.data?.id}`)
      } catch (error: any) {
        customerEmailError = error.message
        console.error(`❌ Customer retry email failed:`, error.message)
      }

      // Retry business email
      try {
        const businessEmail = await resend.emails.send({
          from: "Diva Fitness Contact Form <contact@diva-fitness.co.uk>",
          to: ["info@diva-fitness.co.uk"],
          replyTo: submission.email,
          subject: `[RETRY] New Contact Form Submission from ${submission.name}`,
          react: BusinessNotificationEmail({
            name: submission.name,
            email: submission.email,
            phone: submission.phone || undefined,
            message: submission.bio || "No message provided",
            service: serviceData,
          }),
          headers: {
            "X-Entity-Ref-ID": `retry-business-notification-${Date.now()}`,
          },
          tags: [
            {
              name: "category",
              value: "business-notification-retry",
            },
          ],
        })

        businessEmailSuccess = true
        console.log(`✅ Business retry email sent: ${businessEmail.data?.id}`)
      } catch (error: any) {
        businessEmailError = error.message
        console.error(`❌ Business retry email failed:`, error.message)
      }

      results.push({
        id: submission.id,
        name: submission.name,
        email: submission.email,
        customerEmail: customerEmailSuccess ? "sent" : "failed",
        businessEmail: businessEmailSuccess ? "sent" : "failed",
        customerEmailError,
        businessEmailError,
      })

      // Small delay between emails to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    const summary = {
      total: results.length,
      customerEmailsSent: results.filter((r) => r.customerEmail === "sent").length,
      businessEmailsSent: results.filter((r) => r.businessEmail === "sent").length,
      customerEmailsFailed: results.filter((r) => r.customerEmail === "failed").length,
      businessEmailsFailed: results.filter((r) => r.businessEmail === "failed").length,
    }

    console.log("📊 Retry summary:", summary)

    return NextResponse.json({
      message: "Email retry completed",
      summary,
      results,
    })
  } catch (error: any) {
    console.error("❌ Retry API error:", error)
    return NextResponse.json(
      {
        error: "Failed to retry emails",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
