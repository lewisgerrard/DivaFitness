import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { CustomerThankYouEmail } from "@/emails/customer-thank-you"
import { BusinessNotificationEmail } from "@/emails/business-notification"
import { createContactSubmission } from "@/lib/database"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message, service } = body

    console.log("📧 Contact form submission received:", { name, email, service })

    // Validate required fields
    if (!name || !email || !message) {
      console.error("❌ Missing required fields")
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    // Check if Resend API key is available
    if (!process.env.RESEND_API_KEY) {
      console.error("❌ RESEND_API_KEY not found in environment variables")
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
    }

    // Save to database first
    try {
      await createContactSubmission({
        name,
        email,
        phone,
        service,
        message,
      })
      console.log("✅ Contact submission saved to database")
    } catch (dbError) {
      console.error("⚠️ Database save failed:", dbError)
      // Continue with email sending even if database fails
    }

    // Send thank you email to customer with improved deliverability
    try {
      const customerEmail = await resend.emails.send({
        from: "Diva Fitness <onboarding@resend.dev>", // Using Resend's verified domain
        to: [email],
        replyTo: "info@diva-fitness.co.uk", // Set reply-to to your business email
        subject: "Thank you for contacting Diva Fitness - Emma will be in touch soon!",
        react: CustomerThankYouEmail({ name }),
        headers: {
          "X-Entity-Ref-ID": `contact-${Date.now()}`, // Unique identifier
          "List-Unsubscribe": "<mailto:info@diva-fitness.co.uk>", // Using your actual email
        },
        tags: [
          {
            name: "category",
            value: "contact-form",
          },
        ],
      })
      console.log("✅ Customer email sent:", customerEmail.data?.id)
    } catch (emailError) {
      console.error("❌ Customer email failed:", emailError)
    }

    // Send notification email to business
    try {
      const businessEmail = await resend.emails.send({
        from: "Diva Fitness Contact Form <onboarding@resend.dev>", // Using Resend's verified domain
        to: ["info@diva-fitness.co.uk"], // Your business email
        replyTo: email, // Set reply-to to customer's email for easy response
        subject: `New Contact Form Submission from ${name}`,
        react: BusinessNotificationEmail({
          name,
          email,
          phone,
          message,
          service,
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
      console.log("✅ Business email sent:", businessEmail.data?.id)
    } catch (emailError) {
      console.error("❌ Business email failed:", emailError)
    }

    return NextResponse.json(
      {
        message: "Message sent successfully! Emma will get back to you within 24 hours.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("❌ Contact form error:", error)
    return NextResponse.json(
      {
        error: "Failed to process request. Please try again or contact us directly.",
      },
      { status: 500 },
    )
  }
}
