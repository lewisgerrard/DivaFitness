import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { CustomerThankYouEmail } from "@/emails/customer-thank-you"
import { BusinessNotificationEmail } from "@/emails/business-notification"
import { createContactSubmission } from "@/lib/database"

const resend = new Resend(process.env.RESEND_API_KEY)

// Add retry logic with exponential backoff
async function sendEmailWithRetry(emailFunction: () => Promise<any>, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await emailFunction()
      return { success: true, result, attempt }
    } catch (error: any) {
      console.error(`❌ Email attempt ${attempt} failed:`, error.message)

      // Don't retry on certain errors
      if (
        error.message?.includes("Invalid email") ||
        error.message?.includes("Domain not verified") ||
        error.message?.includes("API key") ||
        error.message?.includes("testing emails")
      ) {
        throw error
      }

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
  console.log("🚀 Contact form API called")

  try {
    const body = await request.json()
    const { name, email, phone, message, service } = body

    console.log("📧 Contact form submission received:", {
      name,
      email,
      service: Array.isArray(service) ? service : [service],
      hasPhone: !!phone,
      messageLength: message?.length,
    })

    // Validate required fields
    if (!name || !email || !message) {
      console.error("❌ Missing required fields:", { name: !!name, email: !!email, message: !!message })
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.error("❌ Invalid email format:", email)
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Check if Resend API key is available
    if (!process.env.RESEND_API_KEY) {
      console.error("❌ RESEND_API_KEY not found in environment variables")
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
    }

    console.log("✅ RESEND_API_KEY is available")

    // Format service data for database and email
    const serviceData = Array.isArray(service) ? service.join(", ") : service || ""

    // Save to database first
    try {
      await createContactSubmission({
        name,
        email,
        phone: phone || null,
        service: serviceData,
        message,
      })
      console.log("✅ Contact submission saved to database")
    } catch (dbError) {
      console.error("⚠️ Database save failed:", dbError)
      // Continue with email sending even if database fails
    }

    let customerEmailSuccess = false
    let businessEmailSuccess = false
    let customerEmailError = null
    let businessEmailError = null

    // Send thank you email to customer with retry logic
    try {
      console.log("📤 Attempting to send customer email to:", email)

      const result = await sendEmailWithRetry(async () => {
        return await resend.emails.send({
          from: "Diva Fitness <noreply@diva-fitness.co.uk>",
          to: [email],
          replyTo: "info@diva-fitness.co.uk",
          subject: "Thank you for contacting Diva Fitness - Emma will be in touch soon!",
          react: CustomerThankYouEmail({ name }),
          headers: {
            "X-Entity-Ref-ID": `contact-${Date.now()}`,
            "List-Unsubscribe": "<mailto:info@diva-fitness.co.uk>",
          },
          tags: [
            {
              name: "category",
              value: "contact-form",
            },
          ],
        })
      })

      console.log("✅ Customer email sent successfully:", {
        id: result.result.data?.id,
        to: email,
        attempts: result.attempt,
      })
      customerEmailSuccess = true
    } catch (emailError: any) {
      console.error("❌ Customer email failed after all retries:", {
        error: emailError.message,
        details: emailError,
        to: email,
      })
      customerEmailError = emailError.message
    }

    // Send notification email to business with retry logic
    try {
      console.log("📤 Attempting to send business notification email")

      const result = await sendEmailWithRetry(async () => {
        return await resend.emails.send({
          from: "Diva Fitness Contact Form <contact@diva-fitness.co.uk>",
          to: ["info@diva-fitness.co.uk"],
          replyTo: email,
          subject: `New Contact Form Submission from ${name}`,
          react: BusinessNotificationEmail({
            name,
            email,
            phone: phone || undefined,
            message,
            service: serviceData,
          }),
          headers: {
            "X-Entity-Ref-ID": `business-notification-${Date.now()}`,
          },
          tags: [
            {
              name: "category",
              value: "business-notification",
            },
          ],
        })
      })

      console.log("✅ Business email sent successfully:", {
        id: result.result.data?.id,
        to: "info@diva-fitness.co.uk",
        attempts: result.attempt,
      })
      businessEmailSuccess = true
    } catch (emailError: any) {
      console.error("❌ Business email failed after all retries:", {
        error: emailError.message,
        details: emailError,
      })
      businessEmailError = emailError.message
    }

    // Return response with detailed status
    const response = {
      message: "Form submitted successfully!",
      emailStatus: {
        customerEmail: customerEmailSuccess ? "sent" : "failed",
        businessEmail: businessEmailSuccess ? "sent" : "failed",
        customerEmailError,
        businessEmailError,
      },
    }

    console.log("📊 Final response:", response)

    // Return success even if one email fails, as long as at least one succeeds
    if (!customerEmailSuccess && !businessEmailSuccess) {
      return NextResponse.json(
        {
          error: "Form submitted but emails failed to send. We'll contact you directly.",
          details: response.emailStatus,
        },
        { status: 207 }, // Multi-status
      )
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error: any) {
    console.error("❌ Contact form critical error:", {
      message: error.message,
      stack: error.stack,
      error,
    })

    return NextResponse.json(
      {
        error: "Failed to process request. Please try again or contact us directly at info@diva-fitness.co.uk",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
