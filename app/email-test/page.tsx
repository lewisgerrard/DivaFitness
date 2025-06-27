"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Mail,
  Shield,
  RefreshCw,
  Eye,
  Send,
  AlertCircle,
  TrendingUp,
  Settings,
  Server,
  Globe,
  MessageSquare,
  User,
  Phone,
  Calendar,
} from "lucide-react"

interface ContactSubmission {
  id: number
  submittedAt: string
  updatedAt: string
  contactInfo: {
    name: string
    email: string
    phone: string
  }
  formContent: {
    message: string
    servicesInterested: string
  }
  status: string
}

interface SubmissionSummary {
  totalContacts: number
  withPhone: number
  withMessage: number
  withServices: number
}

interface DomainReputationAnalysis {
  domain: string
  emailAddress: string
  issues: any[]
  recommendations: any[]
  overallStatus: string
}

export default function EmailTestPage() {
  const [testEmail, setTestEmail] = useState("")
  const [testName, setTestName] = useState("")
  const [testMessage, setTestMessage] = useState("")
  const [testService, setTestService] = useState("")
  const [testPhone, setTestPhone] = useState("")
  const [emailId, setEmailId] = useState("")
  const [submissionId, setSubmissionId] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [submissionSummary, setSummissionSummary] = useState<SubmissionSummary | null>(null)
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null)
  const [domainAnalysis, setDomainAnalysis] = useState<DomainReputationAnalysis | null>(null)

  const sendTestEmail = async () => {
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/email/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: testEmail,
          name: testName,
          message: testMessage,
          service: testService,
          phone: testPhone,
        }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: "Failed to send test email", details: error })
    } finally {
      setLoading(false)
    }
  }

  const checkEmailStatus = async () => {
    if (!emailId) return

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch(`/api/email/status/${emailId}`)
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: "Failed to check email status", details: error })
    } finally {
      setLoading(false)
    }
  }

  const retryFailedEmails = async () => {
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/contact/retry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: "Failed to retry emails", details: error })
    } finally {
      setLoading(false)
    }
  }

  const retrySpecificSubmission = async () => {
    if (!submissionId) return

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/contact/retry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissionId }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: "Failed to retry specific submission", details: error })
    } finally {
      setLoading(false)
    }
  }

  const getContactSubmissions = async () => {
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/contact/submissions?limit=50&days=30")
      const data = await response.json()

      if (data.success) {
        setSubmissions(data.submissions)
        setSummissionSummary(data.summary)
        setResult({
          success: true,
          message: `Found ${data.totalSubmissions} contact form submissions`,
          summary: data.summary,
        })
      } else {
        setResult(data)
      }
    } catch (error) {
      setResult({ error: "Failed to get contact submissions", details: error })
    } finally {
      setLoading(false)
    }
  }

  const viewSubmissionDetails = async (id: number) => {
    setLoading(true)
    setSelectedSubmission(null)

    try {
      const response = await fetch("/api/contact/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissionId: id }),
      })

      const data = await response.json()

      if (data.success) {
        setSelectedSubmission(data.submission)
      } else {
        setResult(data)
      }
    } catch (error) {
      setResult({ error: "Failed to get submission details", details: error })
    } finally {
      setLoading(false)
    }
  }

  const checkDomainReputation = async () => {
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/email/domain-reputation")
      const data = await response.json()

      if (data.success) {
        setDomainAnalysis(data.analysis)
        setResult({
          success: true,
          message: "Domain reputation analysis completed",
          summary: data.summary,
        })
      } else {
        setResult(data)
      }
    } catch (error) {
      setResult({ error: "Failed to check domain reputation", details: error })
    } finally {
      setLoading(false)
    }
  }

  const checkDomainConfiguration = async () => {
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/email/domain-check")
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: "Failed to check domain configuration", details: error })
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "critical":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getSeverityBadge = (severity: string) => {
    const variants = {
      critical: "destructive",
      warning: "secondary",
      info: "outline",
    } as const

    return <Badge variant={variants[severity as keyof typeof variants] || "outline"}>{severity.toUpperCase()}</Badge>
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Email System Testing & Management</h1>
        <p className="text-gray-600">
          Fix email deliverability issues, test email functionality, and manage contact form submissions
        </p>
      </div>

      <Tabs defaultValue="personal-email" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal-email">Personal Email Issues</TabsTrigger>
          <TabsTrigger value="submissions">Contact Submissions</TabsTrigger>
          <TabsTrigger value="retry">Email Retry</TabsTrigger>
          <TabsTrigger value="test">Test Emails</TabsTrigger>
          <TabsTrigger value="status">Email Status</TabsTrigger>
        </TabsList>

        {/* Personal Email Issues Tab */}
        <TabsContent value="personal-email" className="space-y-6">
          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Issue:</strong> Emails sent from info@diva-fitness.co.uk are going to people's junk/spam folders.
              This is likely due to domain authentication and reputation issues.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Domain Email Reputation Check
              </CardTitle>
              <CardDescription>
                Check why emails from info@diva-fitness.co.uk are being marked as spam when you send them personally
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={checkDomainReputation} disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing Domain Reputation...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Check Domain Email Reputation
                  </>
                )}
              </Button>

              {domainAnalysis && (
                <div className="space-y-6">
                  {/* Overall Status */}
                  <Alert
                    className={
                      domainAnalysis.overallStatus === "good"
                        ? "border-green-200 bg-green-50"
                        : domainAnalysis.overallStatus === "fair"
                          ? "border-yellow-200 bg-yellow-50"
                          : "border-red-200 bg-red-50"
                    }
                  >
                    <AlertDescription>
                      <div className="flex items-center justify-between">
                        <div>
                          <strong>Domain Status: </strong>
                          <span
                            className={`font-bold ${
                              domainAnalysis.overallStatus === "good"
                                ? "text-green-600"
                                : domainAnalysis.overallStatus === "fair"
                                  ? "text-yellow-600"
                                  : "text-red-600"
                            }`}
                          >
                            {domainAnalysis.overallStatus.toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <strong>Issues Found: </strong>
                          <span className="font-bold">{domainAnalysis.issues.length}</span>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>

                  {/* Issues Found */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Issues Causing Spam Problems</h3>
                    {domainAnalysis.issues.map((issue, index) => (
                      <Card key={index} className="border-l-4 border-l-red-500">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base flex items-center gap-2">
                              {getStatusIcon(issue.severity)}
                              {issue.issue}
                            </CardTitle>
                            {getSeverityBadge(issue.severity)}
                          </div>
                          <CardDescription>{issue.category}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-sm">{issue.description}</p>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <strong>Impact:</strong>
                              <p className="text-gray-600">{issue.impact}</p>
                            </div>
                            <div>
                              <strong>Current Status:</strong>
                              <p className="text-gray-600">{issue.currentStatus}</p>
                            </div>
                          </div>
                          <div>
                            <strong>Solution:</strong>
                            <p className="text-sm text-blue-600 mt-1">{issue.solution}</p>
                          </div>
                          {issue.technicalDetails && (
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <strong className="text-sm">Technical Details:</strong>
                              {issue.technicalDetails.currentRecord && (
                                <div className="mt-2">
                                  <p className="text-xs text-gray-600">Current Record:</p>
                                  <code className="text-xs bg-white p-1 rounded">
                                    {issue.technicalDetails.currentRecord}
                                  </code>
                                </div>
                              )}
                              {issue.technicalDetails.recommendedRecord && (
                                <div className="mt-2">
                                  <p className="text-xs text-gray-600">Recommended Record:</p>
                                  <code className="text-xs bg-white p-1 rounded">
                                    {issue.technicalDetails.recommendedRecord}
                                  </code>
                                </div>
                              )}
                              {issue.technicalDetails.steps && (
                                <div className="mt-2">
                                  <p className="text-xs text-gray-600">Steps:</p>
                                  <ul className="text-xs text-gray-600 mt-1 ml-4 list-disc">
                                    {issue.technicalDetails.steps.map((step: string, i: number) => (
                                      <li key={i}>{step}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Recommendations */}
                  {domainAnalysis.recommendations.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Action Plan to Fix Spam Issues</h3>
                      {domainAnalysis.recommendations.map((rec, index) => (
                        <Card key={index}>
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-base flex items-center gap-2">
                                <Badge variant={rec.priority === "CRITICAL" ? "destructive" : "secondary"}>
                                  {rec.priority}
                                </Badge>
                                {rec.title}
                              </CardTitle>
                              <span className="text-sm text-gray-500">{rec.timeframe}</span>
                            </div>
                            <CardDescription>{rec.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <strong className="text-sm">Steps to take:</strong>
                              <ol className="text-sm space-y-1 ml-4 list-decimal">
                                {rec.steps.map((step: string, i: number) => (
                                  <li key={i}>{step}</li>
                                ))}
                              </ol>
                              <p className="text-sm text-green-600 mt-2">
                                <strong>Expected Impact:</strong> {rec.impact}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* Quick Reference */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Reference - Common Email Providers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2">If you use Gmail/Google Workspace:</h4>
                          <ul className="text-sm space-y-1 text-gray-600">
                            <li>• Add to DNS: include:_spf.google.com</li>
                            <li>• Configure DKIM in Google Admin Console</li>
                            <li>• Use app passwords for email clients</li>
                            <li>• Enable 2-factor authentication</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">If you use Outlook/Microsoft 365:</h4>
                          <ul className="text-sm space-y-1 text-gray-600">
                            <li>• Add to DNS: include:spf.protection.outlook.com</li>
                            <li>• Configure DKIM in Exchange admin center</li>
                            <li>• Use modern authentication</li>
                            <li>• Enable secure app passwords</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Website Email Check */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Website Email Configuration
              </CardTitle>
              <CardDescription>Check configuration for automated emails from your website</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={checkDomainConfiguration} disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <Settings className="h-4 w-4 mr-2" />
                    Check Website Email Configuration
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Submissions Tab */}
        <TabsContent value="submissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Contact Form Submissions
              </CardTitle>
              <CardDescription>View all contact form submissions and their content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={getContactSubmissions} disabled={loading} className="w-full">
                {loading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Eye className="mr-2 h-4 w-4" />}
                Load Contact Submissions
              </Button>

              {submissionSummary && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{submissionSummary.totalContacts}</div>
                    <div className="text-sm text-blue-800">Total Contacts</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{submissionSummary.withPhone}</div>
                    <div className="text-sm text-green-800">With Phone</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{submissionSummary.withMessage}</div>
                    <div className="text-sm text-purple-800">With Message</div>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{submissionSummary.withServices}</div>
                    <div className="text-sm text-orange-800">With Services</div>
                  </div>
                </div>
              )}

              {submissions.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Recent Submissions</h3>
                  <div className="grid gap-4">
                    {submissions.map((submission) => (
                      <Card key={submission.id} className="border-l-4 border-l-purple-500">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-semibold text-lg flex items-center gap-2">
                                <User className="h-4 w-4" />
                                {submission.contactInfo.name}
                              </h4>
                              <p className="text-sm text-gray-600 flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                {submission.contactInfo.email}
                              </p>
                              {submission.contactInfo.phone !== "Not provided" && (
                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                  <Phone className="h-4 w-4" />
                                  {submission.contactInfo.phone}
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <Badge variant="outline" className="mb-2">
                                ID: {submission.id}
                              </Badge>
                              <p className="text-xs text-gray-500 flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(submission.submittedAt).toLocaleString()}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div>
                              <Label className="text-sm font-medium text-gray-700">Services Interested:</Label>
                              <p className="text-sm bg-gray-50 p-2 rounded">
                                {submission.formContent.servicesInterested}
                              </p>
                            </div>

                            <div>
                              <Label className="text-sm font-medium text-gray-700">Message:</Label>
                              <p className="text-sm bg-gray-50 p-2 rounded max-h-20 overflow-y-auto">
                                {submission.formContent.message}
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-2 mt-3">
                            <Button size="sm" variant="outline" onClick={() => viewSubmissionDetails(submission.id)}>
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => {
                                setSubmissionId(submission.id.toString())
                                // Switch to retry tab
                                document.querySelector('[value="retry"]')?.click()
                              }}
                            >
                              <RefreshCw className="h-4 w-4 mr-1" />
                              Retry Emails
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {selectedSubmission && (
                <Card className="border-2 border-purple-200">
                  <CardHeader>
                    <CardTitle>Detailed Submission View</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="font-semibold">Contact Information</Label>
                        <div className="bg-gray-50 p-3 rounded space-y-1">
                          <p>
                            <strong>Name:</strong> {selectedSubmission.contactInfo.name}
                          </p>
                          <p>
                            <strong>Email:</strong> {selectedSubmission.contactInfo.email}
                          </p>
                          <p>
                            <strong>Phone:</strong> {selectedSubmission.contactInfo.phone}
                          </p>
                        </div>
                      </div>
                      <div>
                        <Label className="font-semibold">System Information</Label>
                        <div className="bg-gray-50 p-3 rounded space-y-1">
                          <p>
                            <strong>ID:</strong> {selectedSubmission.id}
                          </p>
                          <p>
                            <strong>Submitted:</strong> {new Date(selectedSubmission.submittedAt).toLocaleString()}
                          </p>
                          <p>
                            <strong>Status:</strong> {selectedSubmission.systemInfo.status}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="font-semibold">Services Interested</Label>
                      <div className="bg-blue-50 p-3 rounded">
                        <p>{selectedSubmission.formContent.servicesInterested}</p>
                      </div>
                    </div>

                    <div>
                      <Label className="font-semibold">
                        Full Message ({selectedSubmission.formContent.messageLength} characters)
                      </Label>
                      <div className="bg-green-50 p-3 rounded">
                        <p className="whitespace-pre-wrap">{selectedSubmission.formContent.fullMessage}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Retry Tab */}
        <TabsContent value="retry" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5" />
                  Retry All Failed Emails
                </CardTitle>
                <CardDescription>Retry all recent failed email submissions from the last 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={retryFailedEmails} disabled={loading} className="w-full">
                  {loading ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="mr-2 h-4 w-4" />
                  )}
                  Retry All Recent Failed
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Retry Specific Submission
                </CardTitle>
                <CardDescription>Retry emails for a specific contact form submission</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="submissionId">Submission ID</Label>
                  <Input
                    id="submissionId"
                    value={submissionId}
                    onChange={(e) => setSubmissionId(e.target.value)}
                    placeholder="Enter submission ID"
                  />
                </div>
                <Button onClick={retrySpecificSubmission} disabled={loading || !submissionId} className="w-full">
                  {loading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                  Retry Specific Submission
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Test Emails Tab */}
        <TabsContent value="test" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Send Test Email
              </CardTitle>
              <CardDescription>Send test emails to verify the email system is working correctly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="testEmail">Email Address</Label>
                  <Input
                    id="testEmail"
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="test@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="testName">Name</Label>
                  <Input
                    id="testName"
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                    placeholder="Test User"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="testPhone">Phone (Optional)</Label>
                  <Input
                    id="testPhone"
                    value={testPhone}
                    onChange={(e) => setTestPhone(e.target.value)}
                    placeholder="07123 456789"
                  />
                </div>
                <div>
                  <Label htmlFor="testService">Service</Label>
                  <Input
                    id="testService"
                    value={testService}
                    onChange={(e) => setTestService(e.target.value)}
                    placeholder="Personal Training"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="testMessage">Message</Label>
                <Textarea
                  id="testMessage"
                  value={testMessage}
                  onChange={(e) => setTestMessage(e.target.value)}
                  placeholder="Test message content..."
                  rows={4}
                />
              </div>

              <Button onClick={sendTestEmail} disabled={loading || !testEmail || !testName} className="w-full">
                {loading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                Send Test Email
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Status Tab */}
        <TabsContent value="status" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Check Email Status
              </CardTitle>
              <CardDescription>Check the delivery status of a specific email using its ID</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="emailId">Email ID</Label>
                <Input
                  id="emailId"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  placeholder="Enter email ID from Resend"
                />
              </div>
              <Button onClick={checkEmailStatus} disabled={loading || !emailId} className="w-full">
                {loading ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircle className="mr-2 h-4 w-4" />
                )}
                Check Email Status
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Results Section */}
      {result && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {result.success || result.message ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">{JSON.stringify(result, null, 2)}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
