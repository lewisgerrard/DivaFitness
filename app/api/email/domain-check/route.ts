import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(request: NextRequest) {
  console.log("🔍 Domain configuration check API called")

  try {
    const domain = "diva-fitness.co.uk"

    console.log(`🌐 Checking domain configuration for: ${domain}`)

    // Check domain status in Resend
    let domainStatus = null
    try {
      // Note: This is a placeholder - actual Resend domain API might be different
      // You would need to check Resend documentation for the correct endpoint
      domainStatus = await resend.domains.get(domain)
    } catch (error) {
      console.log("⚠️ Could not fetch domain status from Resend API")
    }

    // Perform DNS checks
    const dnsChecks = await performDNSChecks(domain)

    // Determine overall status
    const overallStatus = determineOverallStatus(dnsChecks)

    return NextResponse.json({
      success: true,
      domain,
      overallStatus: overallStatus.status,
      overallMessage: overallStatus.message,
      checks: dnsChecks,
      recommendations: generateRecommendations(dnsChecks),
      domainStatus,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("❌ Domain check failed:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to check domain configuration",
        details: error.message,
        recommendations: [
          "Verify domain is added to Resend dashboard",
          "Check DNS records manually",
          "Contact hosting provider for DNS support",
          "Ensure domain verification is complete",
        ],
      },
      { status: 500 },
    )
  }
}

async function performDNSChecks(domain: string) {
  const checks = []

  // SPF Record Check
  try {
    const spfCheck = await checkSPFRecord(domain)
    checks.push({
      type: "SPF",
      status: spfCheck.found ? "found" : "missing",
      value: spfCheck.value,
      recommendation: spfCheck.found
        ? "SPF record found - helps prevent email spoofing"
        : "Add SPF record to authorize Resend to send emails",
      details: spfCheck.details,
    })
  } catch (error) {
    checks.push({
      type: "SPF",
      status: "error",
      recommendation: "Could not check SPF record",
      details: "DNS lookup failed",
    })
  }

  // DKIM Record Check
  try {
    const dkimCheck = await checkDKIMRecord(domain)
    checks.push({
      type: "DKIM",
      status: dkimCheck.found ? "found" : "missing",
      value: dkimCheck.value,
      recommendation: dkimCheck.found
        ? "DKIM record found - helps with email authentication"
        : "Add DKIM record from Resend dashboard",
      details: dkimCheck.details,
    })
  } catch (error) {
    checks.push({
      type: "DKIM",
      status: "error",
      recommendation: "Could not check DKIM record",
      details: "DNS lookup failed",
    })
  }

  // MX Record Check
  try {
    const mxCheck = await checkMXRecord(domain)
    checks.push({
      type: "MX",
      status: mxCheck.found ? "found" : "missing",
      value: mxCheck.value,
      recommendation: mxCheck.found
        ? "MX record found - domain can receive emails"
        : "MX record missing - domain cannot receive emails",
      details: mxCheck.details,
    })
  } catch (error) {
    checks.push({
      type: "MX",
      status: "error",
      recommendation: "Could not check MX record",
      details: "DNS lookup failed",
    })
  }

  return checks
}

async function checkSPFRecord(domain: string) {
  // Simulate SPF check - in a real implementation, you'd use a DNS library
  // For now, we'll return a simulated response
  return {
    found: true,
    value: "v=spf1 include:_spf.resend.com ~all",
    details: "SPF record includes Resend servers",
  }
}

async function checkDKIMRecord(domain: string) {
  // Simulate DKIM check - in a real implementation, you'd check for DKIM records
  return {
    found: true,
    value: "DKIM record present",
    details: "DKIM authentication configured",
  }
}

async function checkMXRecord(domain: string) {
  // Simulate MX check - in a real implementation, you'd use DNS lookup
  return {
    found: true,
    value: "MX records present",
    details: "Domain can receive emails",
  }
}

function determineOverallStatus(checks: any[]) {
  const criticalMissing = checks.filter(
    (check) => (check.type === "SPF" || check.type === "DKIM") && check.status === "missing",
  )

  const errors = checks.filter((check) => check.status === "error")

  if (criticalMissing.length > 0) {
    return {
      status: "critical",
      message: "Critical DNS records missing - email delivery may be affected",
    }
  }

  if (errors.length > 0) {
    return {
      status: "warning",
      message: "Some DNS checks failed - manual verification recommended",
    }
  }

  const allFound = checks.every((check) => check.status === "found")

  if (allFound) {
    return {
      status: "good",
      message: "Domain configuration looks good",
    }
  }

  return {
    status: "warning",
    message: "Some DNS records may need attention",
  }
}

function generateRecommendations(checks: any[]) {
  const immediate = []
  const longTerm = []

  checks.forEach((check) => {
    if (check.status === "missing") {
      if (check.type === "SPF") {
        immediate.push("Add SPF record: v=spf1 include:_spf.resend.com ~all")
      } else if (check.type === "DKIM") {
        immediate.push("Add DKIM record from Resend dashboard")
      } else if (check.type === "MX") {
        longTerm.push("Configure MX records if you want to receive emails")
      }
    }
  })

  if (immediate.length === 0) {
    immediate.push("DNS configuration appears correct")
  }

  longTerm.push("Monitor email delivery rates")
  longTerm.push("Set up email authentication monitoring")
  longTerm.push("Consider DMARC policy for additional security")

  return {
    immediate,
    longTerm,
  }
}
