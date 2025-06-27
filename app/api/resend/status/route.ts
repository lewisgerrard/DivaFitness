import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(request: NextRequest) {
  console.log("📊 Resend status API called")

  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        {
          error: "RESEND_API_KEY not configured",
          status: "error",
        },
        { status: 500 },
      )
    }

    // Test the API key by attempting to get domain info
    let domainStatus = "unknown"
    let apiKeyValid = false

    try {
      // This is a simple way to test if the API key works
      // We'll try to send a test email to a non-existent address to see the error
      await resend.emails.send({
        from: "test@diva-fitness.co.uk",
        to: ["test@example.com"],
        subject: "Test",
        html: "<p>Test</p>",
      })
    } catch (error: any) {
      // If we get a specific error about the email, the API key is working
      if (error.message && !error.message.includes("API key")) {
        apiKeyValid = true
      }

      // Check for domain verification status
      if (error.message?.includes("Domain not verified")) {
        domainStatus = "not_verified"
      } else if (error.message?.includes("testing emails")) {
        domainStatus = "testing_mode"
      } else {
        domainStatus = "verified"
      }
    }

    const status = {
      apiKey: apiKeyValid ? "valid" : "invalid",
      domain: domainStatus,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
    }

    console.log("📊 Resend status:", status)

    return NextResponse.json({
      status: "success",
      resend: status,
      recommendations: [
        apiKeyValid ? "✅ API key is working" : "❌ Check your RESEND_API_KEY",
        domainStatus === "verified" ? "✅ Domain is verified" : "⚠️ Domain may need verification",
        "📧 Ready to send emails",
      ],
    })
  } catch (error: any) {
    console.error("❌ Status check error:", error)

    return NextResponse.json(
      {
        error: "Failed to check Resend status",
        details: error.message,
        status: "error",
      },
      { status: 500 },
    )
  }
}
