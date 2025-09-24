import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { CustomerThankYouEmail } from "@/emails/customer-thank-you"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  console.log("🧪 Email test API called")

  try {
    const body = await request.json()
    const { email, testType = "simple" } = body

    if (!email) {
      return NextResponse.json({ error: "Email address is required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    console.log(`📧 Sending ${testType} test email to:`, email)

    let emailResult

    if (testType === "template") {
      // Send full template test
      emailResult = await resend.emails.send({
        from: "Emma Fisher - Diva Fitness <info@diva-fitness.co.uk>",
        to: [email],
        replyTo: "info@diva-fitness.co.uk",
        subject: "TEST: Diva Fitness Email Template Test",
        react: CustomerThankYouEmail({ name: "Test User" }),
        headers: {
          "X-Entity-Ref-ID": `test-template-${Date.now()}`,
          "X-Priority": "3",
          "X-MSMail-Priority": "Normal",
          "X-Mailer": "Diva Fitness Test System",
          "Return-Path": "info@diva-fitness.co.uk",
          Sender: "info@diva-fitness.co.uk",
        },
        tags: [
          {
            name: "category",
            value: "email-test",
          },
          {
            name: "type",
            value: "template-test",
          },
        ],
      })
    } else {
      // Send simple HTML test
      emailResult = await resend.emails.send({
        from: "Emma Fisher - Diva Fitness <info@diva-fitness.co.uk>",
        to: [email],
        replyTo: "info@diva-fitness.co.uk",
        subject: "TEST: Diva Fitness Simple Email Test",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-mode-images/logo-with-text%281%29-y21tljMm8iXRg4m1EHTd3GttPq5kjO.png" alt="Diva Fitness" style="max-width: 200px; height: auto;">
            </div>
            <h1 style="color: #7b329b; text-align: center;">Email Test Successful!</h1>
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              This is a simple test email from the Diva Fitness contact system.
            </p>
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              If you received this email, it means the email delivery system is working correctly.
            </p>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #7b329b; margin-top: 0;">Test Details:</h3>
              <ul style="color: #666;">
                <li>Test Type: Simple HTML</li>
                <li>Sent From: info@diva-fitness.co.uk</li>
                <li>Test Time: ${new Date().toISOString()}</li>
              </ul>
            </div>
            <p style="font-size: 14px; color: #666; text-align: center; margin-top: 30px;">
              This is a test email from Diva Fitness<br>
              <a href="mailto:info@diva-fitness.co.uk" style="color: #7b329b;">info@diva-fitness.co.uk</a>
            </p>
          </div>
        `,
        headers: {
          "X-Entity-Ref-ID": `test-simple-${Date.now()}`,
          "X-Priority": "3",
          "X-MSMail-Priority": "Normal",
          "X-Mailer": "Diva Fitness Test System",
          "Return-Path": "info@diva-fitness.co.uk",
          Sender: "info@diva-fitness.co.uk",
        },
        tags: [
          {
            name: "category",
            value: "email-test",
          },
          {
            name: "type",
            value: "simple-test",
          },
        ],
      })
    }

    console.log("✅ Test email sent successfully:", {
      id: emailResult.data?.id,
      to: email,
      type: testType,
    })

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully",
      emailId: emailResult.data?.id,
      sentTo: email,
      testType,
      instructions: [
        "Check your inbox for the test email",
        "If not found, check your spam/junk folder",
        "Add info@diva-fitness.co.uk to your contacts",
        "Mark the email as 'Not Spam' if found in spam folder",
        "Use the email ID above to check delivery status",
      ],
    })
  } catch (error: any) {
    console.error("❌ Test email failed:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to send test email",
        details: error.message,
        troubleshooting: [
          "Check if domain is verified in Resend",
          "Verify API key is correct",
          "Ensure email address is valid",
          "Check Resend dashboard for more details",
        ],
      },
      { status: 500 },
    )
  }
}
