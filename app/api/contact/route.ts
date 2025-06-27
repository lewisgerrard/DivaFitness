import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { neon } from "@neondatabase/serverless"
import { BusinessNotificationEmail } from "@/emails/business-notification"
import { CustomerThankYouEmail } from "@/emails/customer-thank-you"

const resend = new Resend(process.env.RESEND_API_KEY)
const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message, services } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Convert services array to string for email display
    const serviceString = Array.isArray(services) ? services.join(", ") : services || "Not specified"

    // Store in database
    try {
      await sql`
        INSERT INTO contact_submissions (name, email, phone, message, services, submitted_at)
        VALUES (${name}, ${email}, ${phone || null}, ${message}, ${serviceString}, NOW())
      `
    } catch (dbError) {
      console.error("Database error:", dbError)
      // Continue with email sending even if database fails
    }

    // Send emails
    const emailPromises = []

    // Send customer thank you email
    emailPromises.push(
      resend.emails.send({
        from: "Diva Fitness <noreply@diva-fitness.co.uk>",
        to: [email],
        subject: "Thank you for contacting Diva Fitness!",
        react: CustomerThankYouEmail({ name }),
        tags: [{ name: "category", value: "customer-thank-you" }],
        headers: {
          "X-Entity-Ref-ID": `customer-thank-you-${Date.now()}`,
        },
      }),
    )

    // Send business notification email
    emailPromises.push(
      resend.emails.send({
        from: "Diva Fitness Contact Form <contact@diva-fitness.co.uk>",
        to: ["info@diva-fitness.co.uk"],
        subject: `New Contact Form Submission from ${name}`,
        react: BusinessNotificationEmail({
          name,
          email,
          phone,
          message,
          service: serviceString,
        }),
        tags: [{ name: "category", value: "business-notification" }],
        headers: {
          "X-Entity-Ref-ID": `business-notification-${Date.now()}`,
        },
        replyTo: [email],
      }),
    )

    // Wait for all emails to send
    const emailResults = await Promise.allSettled(emailPromises)

    // Check for email failures
    const failedEmails = emailResults.filter((result) => result.status === "rejected")

    if (failedEmails.length > 0) {
      console.error("Some emails failed to send:", failedEmails)
      // Log the specific errors
      failedEmails.forEach((failure, index) => {
        console.error(`Email ${index + 1} failed:`, failure.reason)
      })
    }

    // Return success even if some emails failed (we stored the submission)
    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully",
      emailsSent: emailResults.length - failedEmails.length,
      emailsFailed: failedEmails.length,
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to process contact form" }, { status: 500 })
  }
}
