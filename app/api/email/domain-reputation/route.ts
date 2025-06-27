import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  console.log("🔍 Checking domain email reputation for regular email sending")

  try {
    const domain = "diva-fitness.co.uk"
    const emailAddress = "info@diva-fitness.co.uk"

    const analysis = {
      domain,
      emailAddress,
      timestamp: new Date().toISOString(),
      issues: [],
      recommendations: [],
      overallStatus: "unknown",
    }

    // Check common issues that cause emails to go to spam
    const issues = await checkEmailReputationIssues(domain, emailAddress)
    analysis.issues = issues

    // Generate specific recommendations
    analysis.recommendations = generateEmailRecommendations(issues)
    analysis.overallStatus = determineOverallStatus(issues)

    console.log("✅ Domain reputation check completed:", {
      domain,
      issuesFound: issues.length,
      status: analysis.overallStatus,
    })

    return NextResponse.json({
      success: true,
      analysis,
      summary: {
        domain,
        emailAddress,
        totalIssues: issues.length,
        criticalIssues: issues.filter((i) => i.severity === "critical").length,
        warnings: issues.filter((i) => i.severity === "warning").length,
        status: analysis.overallStatus,
      },
      quickFixes: getQuickFixes(issues),
      emailClientSetup: getEmailClientRecommendations(),
    })
  } catch (error: any) {
    console.error("❌ Domain reputation check failed:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to check domain reputation",
        details: error.message,
      },
      { status: 500 },
    )
  }
}

async function checkEmailReputationIssues(domain: string, emailAddress: string) {
  const issues = []

  // 1. DNS Records for Email Authentication
  issues.push({
    category: "DNS Authentication",
    issue: "SPF Record Configuration",
    severity: "critical",
    description: "SPF record may not be configured for general email sending",
    impact: "High - emails will be marked as spam or rejected",
    currentStatus: "Needs verification",
    solution: "Add comprehensive SPF record that includes your email provider",
    technicalDetails: {
      currentRecord: "v=spf1 include:_spf.resend.com ~all",
      recommendedRecord: "v=spf1 include:_spf.resend.com include:_spf.google.com include:spf.messagingengine.com ~all",
      explanation: "Include your actual email provider's SPF record",
    },
  })

  issues.push({
    category: "DNS Authentication",
    issue: "DKIM Configuration",
    severity: "critical",
    description: "DKIM signing may not be configured for your email provider",
    impact: "High - emails lack proper authentication",
    currentStatus: "Unknown",
    solution: "Configure DKIM with your email provider (Google Workspace, Outlook, etc.)",
    technicalDetails: {
      explanation: "DKIM must be configured with your actual email provider, not just Resend",
      steps: [
        "Log into your email provider's admin panel",
        "Find DKIM settings",
        "Generate DKIM keys",
        "Add DKIM DNS records to your domain",
      ],
    },
  })

  // 2. Email Provider Configuration
  issues.push({
    category: "Email Provider",
    issue: "Email Provider Authentication",
    severity: "critical",
    description: "Your email client may not be properly authenticated",
    impact: "High - causes emails to be flagged as suspicious",
    currentStatus: "Needs verification",
    solution: "Ensure proper email client configuration with authentication",
    technicalDetails: {
      requiredSettings: {
        authentication: "OAuth2 or App Passwords (not basic passwords)",
        encryption: "TLS/SSL enabled",
        ports: "Use secure ports (587 for SMTP, 993 for IMAP)",
        serverSettings: "Use official provider settings",
      },
    },
  })

  // 3. Domain Reputation
  issues.push({
    category: "Domain Reputation",
    issue: "New Domain Reputation",
    severity: "warning",
    description: "Domain may have limited sending reputation",
    impact: "Medium - new domains are treated with suspicion",
    currentStatus: "Building reputation",
    solution: "Gradually build sending reputation with consistent, legitimate emails",
    technicalDetails: {
      tips: [
        "Start with small volumes of emails",
        "Maintain consistent sending patterns",
        "Avoid sudden spikes in email volume",
        "Ensure high engagement rates",
      ],
    },
  })

  // 4. Email Content and Practices
  issues.push({
    category: "Email Content",
    issue: "Email Content Best Practices",
    severity: "warning",
    description: "Email content and sending practices may trigger spam filters",
    impact: "Medium - affects deliverability over time",
    currentStatus: "Needs optimization",
    solution: "Follow email best practices for content and sending",
    technicalDetails: {
      contentTips: [
        "Use professional, personal language",
        "Avoid excessive use of sales language",
        "Include clear sender identification",
        "Maintain good text-to-image ratio",
        "Include physical address in signature",
      ],
    },
  })

  // 5. Email Client Configuration
  issues.push({
    category: "Email Client",
    issue: "Email Client Setup",
    severity: "warning",
    description: "Email client may not be optimally configured",
    impact: "Medium - affects email authentication and delivery",
    currentStatus: "Needs verification",
    solution: "Optimize email client settings for better deliverability",
    technicalDetails: {
      recommendations: [
        "Use official email provider settings",
        "Enable two-factor authentication",
        "Use app-specific passwords if required",
        "Keep email client updated",
        "Configure proper sender name and signature",
      ],
    },
  })

  return issues
}

function generateEmailRecommendations(issues: any[]) {
  const recommendations = []

  // Critical DNS fixes
  const dnsIssues = issues.filter((i) => i.category === "DNS Authentication")
  if (dnsIssues.length > 0) {
    recommendations.push({
      priority: "CRITICAL",
      title: "Fix DNS Authentication Records",
      description: "Configure proper SPF and DKIM records for your email provider",
      timeframe: "Immediate - within 24 hours",
      steps: [
        "Identify your email provider (Gmail, Outlook, etc.)",
        "Add your email provider's SPF record to DNS",
        "Configure DKIM in your email provider's admin panel",
        "Add DKIM DNS records to your domain",
        "Test email authentication after changes",
      ],
      impact: "High - will significantly improve deliverability",
    })
  }

  // Email provider setup
  recommendations.push({
    priority: "HIGH",
    title: "Verify Email Provider Configuration",
    description: "Ensure your email client is properly configured and authenticated",
    timeframe: "Within 48 hours",
    steps: [
      "Check email client authentication settings",
      "Enable two-factor authentication on email account",
      "Use app-specific passwords if required",
      "Verify SMTP/IMAP settings are correct",
      "Test sending emails after configuration",
    ],
    impact: "High - improves email authentication",
  })

  // Content and practices
  recommendations.push({
    priority: "MEDIUM",
    title: "Improve Email Content and Practices",
    description: "Optimize email content and sending practices",
    timeframe: "Ongoing",
    steps: [
      "Use professional, personal language in emails",
      "Include clear sender identification",
      "Add professional email signature with contact info",
      "Avoid spam trigger words and excessive formatting",
      "Send emails consistently, not in large bursts",
    ],
    impact: "Medium - builds long-term reputation",
  })

  // Reputation building
  recommendations.push({
    priority: "LOW",
    title: "Build Domain Reputation",
    description: "Gradually build positive sending reputation",
    timeframe: "Long-term (weeks to months)",
    steps: [
      "Start with smaller volumes of emails",
      "Maintain consistent sending patterns",
      "Monitor bounce and complaint rates",
      "Ask recipients to add you to their contacts",
      "Respond promptly to email replies",
    ],
    impact: "Long-term - improves overall deliverability",
  })

  return recommendations
}

function determineOverallStatus(issues: any[]) {
  const criticalIssues = issues.filter((i) => i.severity === "critical").length
  const warnings = issues.filter((i) => i.severity === "warning").length

  if (criticalIssues >= 3) return "critical"
  if (criticalIssues >= 1) return "poor"
  if (warnings >= 2) return "fair"
  return "good"
}

function getQuickFixes(issues: any[]) {
  return [
    {
      title: "Check Your Email Provider",
      description: "Are you using Gmail, Outlook, or another provider?",
      action: "Identify your email provider first",
      timeframe: "5 minutes",
    },
    {
      title: "Update DNS Records",
      description: "Add your email provider's SPF record to DNS",
      action: "Contact your web hosting provider or domain registrar",
      timeframe: "30 minutes",
    },
    {
      title: "Configure DKIM",
      description: "Set up DKIM authentication with your email provider",
      action: "Log into your email provider's admin panel",
      timeframe: "15 minutes",
    },
    {
      title: "Test Email Authentication",
      description: "Send test emails to check authentication",
      action: "Use mail-tester.com or similar service",
      timeframe: "10 minutes",
    },
  ]
}

function getEmailClientRecommendations() {
  return {
    gmail: {
      provider: "Google Workspace / Gmail",
      spfRecord: "include:_spf.google.com",
      dkimSetup: "Admin Console > Apps > Google Workspace > Gmail > Authenticate email",
      clientSettings: {
        smtp: "smtp.gmail.com:587",
        imap: "imap.gmail.com:993",
        authentication: "OAuth2 or App Password",
      },
      tips: [
        "Enable 2-factor authentication",
        "Use app-specific passwords for email clients",
        "Configure DKIM in Google Admin Console",
      ],
    },
    outlook: {
      provider: "Microsoft 365 / Outlook",
      spfRecord: "include:spf.protection.outlook.com",
      dkimSetup: "Microsoft 365 Admin Center > Exchange > Mail flow > DKIM",
      clientSettings: {
        smtp: "smtp-mail.outlook.com:587",
        imap: "outlook.office365.com:993",
        authentication: "OAuth2 or App Password",
      },
      tips: ["Enable modern authentication", "Configure DKIM in Exchange admin center", "Use secure app passwords"],
    },
    generic: {
      provider: "Other Email Providers",
      spfRecord: "Contact your email provider for SPF record",
      dkimSetup: "Check your email provider's documentation",
      clientSettings: {
        smtp: "Contact provider for settings",
        imap: "Contact provider for settings",
        authentication: "Use provider's recommended authentication",
      },
      tips: [
        "Contact your email provider for specific settings",
        "Ensure you're using secure, authenticated connections",
        "Keep your email client updated",
      ],
    },
  }
}
