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
      timestamp: new Date().toISOString(),
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
    let customerEmailId = null
    let businessEmailId = null

    // Send thank you email to customer with retry logic
    try {
      console.log("📤 Attempting to send customer email to:", email)

      const result = await sendEmailWithRetry(async () => {
        return await resend.emails.send({
          from: "Emma Fisher - Diva Fitness <info@diva-fitness.co.uk>",
          to: [email], // This goes to the customer's email address
          replyTo: "info@diva-fitness.co.uk",
          subject: "Your Diva Fitness inquiry - Emma will respond within 24 hours",
          react: CustomerThankYouEmail({ name }),
          headers: {
            "X-Entity-Ref-ID": `contact-${Date.now()}`,
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
              value: "customer-response",
            },
            {
              name: "type",
              value: "transactional",
            },
          ],
        })
      })

      customerEmailId = result.result.data?.id
      console.log("✅ Customer email sent successfully:", {
        id: customerEmailId,
        to: email,
        attempts: result.attempt,
        timestamp: new Date().toISOString(),
      })
      customerEmailSuccess = true
    } catch (emailError: any) {
      console.error("❌ Customer email failed after all retries:", {
        error: emailError.message,
        details: emailError,
        to: email,
        timestamp: new Date().toISOString(),
      })
      customerEmailError = emailError.message
    }

    // Send notification email to business with retry logic
    try {
      console.log("📤 Attempting to send business notification email")

      const result = await sendEmailWithRetry(async () => {
        return await resend.emails.send({
          from: "Diva Fitness Website <info@diva-fitness.co.uk>",
          to: ["info@diva-fitness.co.uk"], // This goes to the business email
          replyTo: email,
          subject: `New inquiry from ${name} - Diva Fitness`,
          react: BusinessNotificationEmail({
            name,
            email,
            phone: phone || undefined,
            message,
            service: serviceData,
          }),
          headers: {
            "X-Entity-Ref-ID": `business-notification-${Date.now()}`,
            "X-Priority": "2",
            "X-MSMail-Priority": "High",
            "X-Mailer": "Diva Fitness Contact System",
            "Return-Path": "info@diva-fitness.co.uk",
            Sender: "info@diva-fitness.co.uk",
          },
          tags: [
            {
              name: "category",
              value: "business-notification",
            },
            {
              name: "type",
              value: "internal",
            },
          ],
        })
      })

      businessEmailId = result.result.data?.id
      console.log("✅ Business email sent successfully:", {
        id: businessEmailId,
        to: "info@diva-fitness.co.uk",
        attempts: result.attempt,
        timestamp: new Date().toISOString(),
      })
      businessEmailSuccess = true
    } catch (emailError: any) {
      console.error("❌ Business email failed after all retries:", {
        error: emailError.message,
        details: emailError,
        timestamp: new Date().toISOString(),
      })
      businessEmailError = emailError.message
    }

    // Return response with detailed status
    const response = {
      message: "Thank you! Your message has been sent successfully.",
      emailStatus: {
        customerEmail: customerEmailSuccess ? "sent" : "failed",
        businessEmail: businessEmailSuccess ? "sent" : "failed",
        customerEmailError,
        businessEmailError,
        customerEmailId,
        businessEmailId,
        deliveryNote:
          "Please check your inbox and spam folder. Add info@diva-fitness.co.uk to your contacts to ensure future emails reach your inbox.",
      },
    }

    console.log("📊 Final response:", response)

    // Return success even if one email fails, as long as at least one succeeds
    if (!customerEmailSuccess && !businessEmailSuccess) {
      return NextResponse.json(
        {
          error: "Message received but email delivery failed. Emma will contact you directly.",
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
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      {
        error: "Unable to process your message right now. Please email info@diva-fitness.co.uk directly.",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
