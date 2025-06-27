import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { CustomerThankYouEmail } from "@/emails/customer-thank-you"
import { BusinessNotificationEmail } from "@/emails/business-notification"
import { createContactSubmission } from "@/lib/database"

const resend = new Resend(process.env.RESEND_API_KEY)

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

    // Send thank you email to customer
    try {
      console.log("📤 Attempting to send customer email to:", email)

      const customerEmail = await resend.emails.send({
        from: "Diva Fitness <onboarding@resend.dev>",
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

      console.log("✅ Customer email sent successfully:", {
        id: customerEmail.data?.id,
        to: email,
      })
      customerEmailSuccess = true
    } catch (emailError: any) {
      console.error("❌ Customer email failed:", {
        error: emailError.message,
        details: emailError,
        to: email,
      })
      customerEmailError = emailError.message
    }

    // Send notification email to business
    try {
      console.log("📤 Attempting to send business notification email")

      const businessEmail = await resend.emails.send({
        from: "Diva Fitness Contact Form <onboarding@resend.dev>",
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

      console.log("✅ Business email sent successfully:", {
        id: businessEmail.data?.id,
        to: "info@diva-fitness.co.uk",
      })
      businessEmailSuccess = true
    } catch (emailError: any) {
      console.error("❌ Business email failed:", {
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
