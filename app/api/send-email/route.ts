import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { CustomerThankYouEmail } from "@/emails/customer-thank-you"
import { BusinessNotificationEmail } from "@/emails/business-notification"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message, service } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    // Send thank you email to customer
    const customerEmail = await resend.emails.send({
      from: "Emma at Diva Fitness <emma@diva-fitness.co.uk>",
      to: [email],
      subject: "Thank you for contacting Diva Fitness!",
      react: CustomerThankYouEmail({ name }),
    })

    // Send notification email to business
    const businessEmail = await resend.emails.send({
      from: "Diva Fitness Contact Form <noreply@diva-fitness.co.uk>",
      to: ["info@diva-fitness.co.uk"],
      subject: `New Contact Form Submission from ${name}`,
      react: BusinessNotificationEmail({
        name,
        email,
        phone,
        message,
        service,
      }),
    })

    console.log("Emails sent:", { customerEmail, businessEmail })

    return NextResponse.json({ message: "Emails sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json({ error: "Failed to send emails" }, { status: 500 })
  }
}
