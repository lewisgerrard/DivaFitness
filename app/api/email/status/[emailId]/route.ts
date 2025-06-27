import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(request: NextRequest, { params }: { params: { emailId: string } }) {
  console.log("🔍 Email status check API called for:", params.emailId)

  try {
    const { emailId } = params

    if (!emailId) {
      return NextResponse.json({ error: "Email ID is required" }, { status: 400 })
    }

    console.log(`📧 Checking status for email ID: ${emailId}`)

    // Get email details from Resend
    const email = await resend.emails.get(emailId)

    if (!email.data) {
      return NextResponse.json(
        {
          success: false,
          error: "Email not found",
          emailId,
        },
        { status: 404 },
      )
    }

    console.log("📊 Email status retrieved:", {
      id: email.data.id,
      status: email.data.last_event,
      to: email.data.to,
      from: email.data.from,
    })

    // Interpret the status
    const interpretation = interpretEmailStatus(email.data.last_event)

    return NextResponse.json({
      success: true,
      emailId,
      status: email.data.last_event,
      interpretation: interpretation.summary,
      meaning: interpretation.meaning,
      action: interpretation.action,
      emailData: {
        id: email.data.id,
        to: email.data.to,
        from: email.data.from,
        subject: email.data.subject,
        created_at: email.data.created_at,
        last_event: email.data.last_event,
      },
      troubleshooting: interpretation.troubleshooting,
    })
  } catch (error: any) {
    console.error("❌ Email status check failed:", error)

    // Handle specific Resend API errors
    if (error.message?.includes("not found") || error.status === 404) {
      return NextResponse.json(
        {
          success: false,
          error: "Email ID not found in Resend",
          emailId: params.emailId,
          troubleshooting: [
            "Verify the email ID is correct",
            "Check if the email was sent recently",
            "Email IDs expire after some time",
            "Try sending a new test email",
          ],
        },
        { status: 404 },
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to check email status",
        emailId: params.emailId,
        details: error.message,
        troubleshooting: [
          "Check if Resend API key is valid",
          "Verify email ID format",
          "Try again in a few minutes",
          "Contact support if issue persists",
        ],
      },
      { status: 500 },
    )
  }
}

function interpretEmailStatus(status: string) {
  switch (status?.toLowerCase()) {
    case "sent":
      return {
        summary: "Email sent successfully",
        meaning: "The email has been accepted by Resend and sent to the recipient's email provider.",
        action: "Check your inbox and spam folder. The email should arrive within a few minutes.",
        troubleshooting: [
          "Check your inbox for the email",
          "Look in spam/junk folder",
          "Add info@diva-fitness.co.uk to your contacts",
          "Wait a few more minutes for delivery",
        ],
      }

    case "delivered":
      return {
        summary: "Email delivered successfully",
        meaning: "The email has been successfully delivered to the recipient's email server.",
        action: "The email should be in your inbox or spam folder.",
        troubleshooting: [
          "Check all email folders (inbox, spam, promotions, etc.)",
          "Search for emails from 'diva-fitness.co.uk'",
          "Add sender to your contacts",
          "Check email client settings",
        ],
      }

    case "bounced":
      return {
        summary: "Email bounced",
        meaning: "The email could not be delivered to the recipient's email address.",
        action: "Verify the email address is correct and try again.",
        troubleshooting: [
          "Check if email address is spelled correctly",
          "Verify the email address exists",
          "Try a different email address",
          "Contact the recipient to confirm their email",
        ],
      }

    case "complained":
      return {
        summary: "Email marked as spam",
        meaning: "The recipient marked this email as spam or junk.",
        action: "The email was delivered but marked as unwanted by the recipient.",
        troubleshooting: [
          "Ask recipient to check spam folder",
          "Request they mark email as 'Not Spam'",
          "Add sender to recipient's contacts",
          "Improve email content to avoid spam filters",
        ],
      }

    case "clicked":
      return {
        summary: "Email delivered and clicked",
        meaning: "The recipient received the email and clicked on a link within it.",
        action: "Email was successfully delivered and engaged with.",
        troubleshooting: [
          "Email delivery was successful",
          "Recipient is actively engaging with content",
          "No action needed",
        ],
      }

    case "opened":
      return {
        summary: "Email delivered and opened",
        meaning: "The recipient received and opened the email.",
        action: "Email was successfully delivered and read.",
        troubleshooting: ["Email delivery was successful", "Recipient has read the email", "No action needed"],
      }

    default:
      return {
        summary: status || "Status unknown",
        meaning: "The email status is not recognized or still being processed.",
        action: "Wait a few minutes and check the status again.",
        troubleshooting: [
          "Email may still be processing",
          "Check again in 5-10 minutes",
          "Look for the email in your inbox",
          "Contact support if status doesn't update",
        ],
      }
  }
}
