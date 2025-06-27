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

    // Send thank you email to customer
    try {
      console.log("📤 Sending customer email to:", email)

      const customerResult = await resend.emails.send({
        from: "Emma Fisher - Diva Fitness <info@diva-fitness.co.uk>",
        to: [email],
        replyTo: "info@diva-fitness.co.uk",
        subject: `Thank you ${name} - Emma will respond within 24 hours`,
        react: CustomerThankYouEmail({ name }),
        tags: [
          { name: "category", value: "customer-response" },
          { name: "type", value: "transactional" },
        ],
      })

      console.log("✅ Customer email sent successfully:", customerResult.data?.id)
      customerEmailSuccess = true
    } catch (emailError: any) {
      console.error("❌ Customer email failed:", emailError.message)
      customerEmailError = emailError.message
    }

    // Send notification email to business
    try {
      console.log("📤 Sending business notification email")

      const businessResult = await resend.emails.send({
        from: "Diva Fitness Website <info@diva-fitness.co.uk>",
        to: ["info@diva-fitness.co.uk"],
        replyTo: email,
        subject: `New inquiry from ${name} - Diva Fitness`,
        react: BusinessNotificationEmail({
          name,
          email,
          phone: phone || undefined,
          message,
          service: serviceData,
        }),
        tags: [
          { name: "category", value: "business-notification" },
          { name: "type", value: "internal" },
        ],
      })

      console.log("✅ Business email sent successfully:", businessResult.data?.id)
      businessEmailSuccess = true
    } catch (emailError: any) {
      console.error("❌ Business email failed:", emailError.message)
      businessEmailError = emailError.message
    }

    // Return response based on email success
    if (customerEmailSuccess && businessEmailSuccess) {
      return NextResponse.json({
        message: "Thank you! Your message has been sent successfully. Emma will respond within 24 hours.",
        success: true,
        emailStatus: {
          customerEmail: "sent",
          businessEmail: "sent",
        },
      })
    } else if (customerEmailSuccess || businessEmailSuccess) {
      return NextResponse.json({
        message:
          "Your message has been received. If you don't hear back within 24 hours, please contact Emma directly.",
        success: true,
        emailStatus: {
          customerEmail: customerEmailSuccess ? "sent" : "failed",
          businessEmail: businessEmailSuccess ? "sent" : "failed",
          customerEmailError,
          businessEmailError,
        },
        alternativeContact: {
          phone: "07966 874 821",
          email: "info@diva-fitness.co.uk",
        },
      })
    } else {
      return NextResponse.json(
        {
          error: "Message received but email delivery failed. Emma will contact you directly.",
          alternativeContact: {
            phone: "07966 874 821",
            email: "info@diva-fitness.co.uk",
            message: "Please call or email directly if you don't hear back within 24 hours",
          },
        },
        { status: 207 },
      )
    }
  } catch (error: any) {
    console.error("❌ Contact form critical error:", error)

    return NextResponse.json(
      {
        error: "Unable to process your message right now. Please email info@diva-fitness.co.uk directly.",
        details: error.message,
        alternativeContact: {
          email: "info@diva-fitness.co.uk",
          phone: "07966 874 821",
        },
      },
      { status: 500 },
    )
  }
}
