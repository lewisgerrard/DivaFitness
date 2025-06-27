"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, XCircle, AlertCircle, Mail, Search, Settings, RefreshCw } from "lucide-react"

export default function EmailTestPage() {
  const [email, setEmail] = useState("")
  const [testResult, setTestResult] = useState<any>(null)
  const [statusResult, setStatusResult] = useState<any>(null)
  const [domainResult, setDomainResult] = useState<any>(null)
  const [retryResult, setRetryResult] = useState<any>(null)
  const [failedSubmissions, setFailedSubmissions] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [statusLoading, setStatusLoading] = useState(false)
  const [domainLoading, setDomainLoading] = useState(false)
  const [retryLoading, setRetryLoading] = useState(false)
  const [submissionsLoading, setSubmissionsLoading] = useState(false)
  const [emailId, setEmailId] = useState("")
  const [submissionId, setSubmissionId] = useState("")

  const sendTestEmail = async (testType: "simple" | "template") => {
    if (!email) {
      alert("Please enter an email address")
      return
    }

    setLoading(true)
    setTestResult(null)

    try {
      const response = await fetch("/api/email/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, testType }),
      })

      const result = await response.json()
      setTestResult(result)

      if (result.emailId) {
        setEmailId(result.emailId)
      }
    } catch (error) {
      setTestResult({
        success: false,
        error: "Failed to send test email",
        details: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setLoading(false)
    }
  }

  const checkEmailStatus = async () => {
    if (!emailId) {
      alert("Please enter an email ID or send a test email first")
      return
    }

    setStatusLoading(true)
    setStatusResult(null)

    try {
      const response = await fetch(`/api/email/status/${emailId}`)
      const result = await response.json()
      setStatusResult(result)
    } catch (error) {
      setStatusResult({
        success: false,
        error: "Failed to check email status",
        details: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setStatusLoading(false)
    }
  }

  const checkDomainConfig = async () => {
    setDomainLoading(true)
    setDomainResult(null)

    try {
      const response = await fetch("/api/email/domain-check")
      const result = await response.json()
      setDomainResult(result)
    } catch (error) {
      setDomainResult({
        success: false,
        error: "Failed to check domain configuration",
        details: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setDomainLoading(false)
    }
  }

  const getFailedSubmissions = async () => {
    setSubmissionsLoading(true)
    setFailedSubmissions(null)

    try {
      const response = await fetch("/api/contact/retry")
      const result = await response.json()
      setFailedSubmissions(result)
    } catch (error) {
      setFailedSubmissions({
        success: false,
        error: "Failed to get failed submissions",
        details: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setSubmissionsLoading(false)
    }
  }

  const retryAllFailed = async () => {
    setRetryLoading(true)
    setRetryResult(null)

    try {
      const response = await fetch("/api/contact/retry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })

      const result = await response.json()
      setRetryResult(result)
    } catch (error) {
      setRetryResult({
        success: false,
        error: "Failed to retry emails",
        details: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setRetryLoading(false)
    }
  }

  const retrySpecificSubmission = async () => {
    if (!submissionId) {
      alert("Please enter a submission ID")
      return
    }

    setRetryLoading(true)
    setRetryResult(null)

    try {
      const response = await fetch("/api/contact/retry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ submissionId }),
      })

      const result = await response.json()
      setRetryResult(result)
    } catch (error) {
      setRetryResult({
        success: false,
        error: "Failed to retry specific submission",
        details: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setRetryLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "found":
      case "good":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "missing":
      case "critical":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Email System Testing & Recovery</h1>
        <p className="text-gray-600">
          Test email delivery, check status, retry failed emails, and verify domain configuration
        </p>
      </div>

      <div className="grid gap-6">
        {/* Test Email Sending */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Send Test Email
            </CardTitle>
            <CardDescription>Send a test email to verify delivery and check for spam issues</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address to test"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={() => sendTestEmail("simple")} disabled={loading} className="flex-1">
                {loading ? "Sending..." : "Send Simple Test"}
              </Button>
              <Button onClick={() => sendTestEmail("template")} disabled={loading} variant="outline" className="flex-1">
                {loading ? "Sending..." : "Send Template Test"}
              </Button>
            </div>

            {testResult && (
              <Alert className={testResult.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                <AlertDescription>
                  {testResult.success ? (
                    <div className="space-y-2">
                      <p className="font-medium text-green-800">✅ Test email sent successfully!</p>
                      <p className="text-sm text-green-700">Email ID: {testResult.emailId}</p>
                      <p className="text-sm text-green-700">Sent to: {testResult.sentTo}</p>
                      <div className="mt-3">
                        <p className="font-medium text-green-800 mb-1">Next steps:</p>
                        <ul className="text-sm text-green-700 space-y-1">
                          {testResult.instructions?.map((instruction: string, index: number) => (
                            <li key={index}>• {instruction}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="font-medium text-red-800">❌ Test email failed</p>
                      <p className="text-sm text-red-700">{testResult.error}</p>
                      {testResult.details && <p className="text-sm text-red-600">Details: {testResult.details}</p>}
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Check Email Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Check Email Status
            </CardTitle>
            <CardDescription>Check the delivery status of a specific email using its ID</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="emailId" className="block text-sm font-medium text-gray-700 mb-1">
                Email ID
              </label>
              <Input
                id="emailId"
                type="text"
                placeholder="Enter email ID to check status"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="w-full"
              />
            </div>

            <Button onClick={checkEmailStatus} disabled={statusLoading} className="w-full">
              {statusLoading ? "Checking..." : "Check Status"}
            </Button>

            {statusResult && (
              <Alert className={statusResult.success ? "border-blue-200 bg-blue-50" : "border-red-200 bg-red-50"}>
                <AlertDescription>
                  {statusResult.success ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{statusResult.status}</Badge>
                        <span className="text-sm font-medium">{statusResult.interpretation}</span>
                      </div>
                      {statusResult.emailData && (
                        <div className="text-sm space-y-1">
                          <p>
                            <strong>To:</strong> {statusResult.emailData.to}
                          </p>
                          <p>
                            <strong>From:</strong> {statusResult.emailData.from}
                          </p>
                          <p>
                            <strong>Subject:</strong> {statusResult.emailData.subject}
                          </p>
                        </div>
                      )}
                      <div>
                        <p className="font-medium mb-1">Troubleshooting:</p>
                        <ul className="text-sm space-y-1">
                          {statusResult.troubleshooting?.map((tip: string, index: number) => (
                            <li key={index}>• {tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="font-medium text-red-800">❌ Status check failed</p>
                      <p className="text-sm text-red-700">{statusResult.error}</p>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Retry Failed Emails */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              Retry Failed Emails
            </CardTitle>
            <CardDescription>Resend emails that failed to deliver</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button
                onClick={getFailedSubmissions}
                disabled={submissionsLoading}
                variant="outline"
                className="flex-1 bg-transparent"
              >
                {submissionsLoading ? "Loading..." : "Get Failed Submissions"}
              </Button>
              <Button onClick={retryAllFailed} disabled={retryLoading} className="flex-1">
                {retryLoading ? "Retrying..." : "Retry All Recent Failed"}
              </Button>
            </div>

            <Separator />

            <div>
              <label htmlFor="submissionId" className="block text-sm font-medium text-gray-700 mb-1">
                Retry Specific Submission ID
              </label>
              <div className="flex gap-2">
                <Input
                  id="submissionId"
                  type="text"
                  placeholder="Enter submission ID to retry"
                  value={submissionId}
                  onChange={(e) => setSubmissionId(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={retrySpecificSubmission} disabled={retryLoading}>
                  {retryLoading ? "Retrying..." : "Retry"}
                </Button>
              </div>
            </div>

            {failedSubmissions && (
              <Alert className={failedSubmissions.success ? "border-blue-200 bg-blue-50" : "border-red-200 bg-red-50"}>
                <AlertDescription>
                  {failedSubmissions.success ? (
                    <div className="space-y-3">
                      <p className="font-medium text-blue-800">📋 Found {failedSubmissions.count} recent submissions</p>
                      <div className="max-h-60 overflow-y-auto">
                        <div className="space-y-2">
                          {failedSubmissions.submissions?.slice(0, 5).map((submission: any, index: number) => (
                            <div key={index} className="p-2 bg-white rounded border text-sm">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p>
                                    <strong>ID:</strong> {submission.id}
                                  </p>
                                  <p>
                                    <strong>Name:</strong> {submission.name}
                                  </p>
                                  <p>
                                    <strong>Email:</strong> {submission.email}
                                  </p>
                                </div>
                                <Badge variant="outline">{submission.status}</Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {failedSubmissions.count > 5 && (
                        <p className="text-sm text-blue-700">
                          Showing first 5 of {failedSubmissions.count} submissions
                        </p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p className="font-medium text-red-800">❌ Failed to get submissions</p>
                      <p className="text-sm text-red-700">{failedSubmissions.error}</p>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}

            {retryResult && (
              <Alert className={retryResult.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                <AlertDescription>
                  {retryResult.success ? (
                    <div className="space-y-3">
                      <p className="font-medium text-green-800">✅ Retry completed!</p>
                      <p className="text-sm text-green-700">{retryResult.message}</p>
                      {retryResult.summary && (
                        <div className="text-sm space-y-1">
                          <p>
                            <strong>Total Submissions:</strong> {retryResult.summary.totalSubmissions}
                          </p>
                          <p>
                            <strong>Successful Retries:</strong> {retryResult.summary.successfulRetries}
                          </p>
                          <p>
                            <strong>Customer Emails Sent:</strong> {retryResult.summary.customerEmailsSuccess}
                          </p>
                          <p>
                            <strong>Business Emails Sent:</strong> {retryResult.summary.businessEmailsSuccess}
                          </p>
                        </div>
                      )}
                      {retryResult.results && (
                        <div className="max-h-40 overflow-y-auto">
                          <div className="space-y-1">
                            {retryResult.results.map((result: any, index: number) => (
                              <div key={index} className="text-xs p-2 bg-white rounded border">
                                <span className="font-medium">{result.name}</span>
                                <span className="ml-2">
                                  Customer: {result.customerEmailSuccess ? "✅" : "❌"}
                                  Business: {result.businessEmailSuccess ? "✅" : "❌"}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p className="font-medium text-red-800">❌ Retry failed</p>
                      <p className="text-sm text-red-700">{retryResult.error}</p>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Domain Configuration Check */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Domain Configuration
            </CardTitle>
            <CardDescription>Check DNS records and domain authentication setup</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={checkDomainConfig} disabled={domainLoading} className="w-full">
              {domainLoading ? "Checking..." : "Check Domain Configuration"}
            </Button>

            {domainResult && (
              <div className="space-y-4">
                {domainResult.success ? (
                  <>
                    <Alert
                      className={
                        domainResult.overallStatus === "good"
                          ? "border-green-200 bg-green-50"
                          : domainResult.overallStatus === "warning"
                            ? "border-yellow-200 bg-yellow-50"
                            : "border-red-200 bg-red-50"
                      }
                    >
                      <AlertDescription>
                        <div className="flex items-center gap-2 mb-2">
                          {getStatusIcon(domainResult.overallStatus)}
                          <span className="font-medium">{domainResult.overallMessage}</span>
                        </div>
                        <p className="text-sm">Domain: {domainResult.domain}</p>
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-3">
                      <h4 className="font-medium">DNS Records Check:</h4>
                      {domainResult.checks?.map((check: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(check.status)}
                            <span className="font-medium">{check.type}</span>
                            <Badge variant="outline">{check.status}</Badge>
                          </div>
                          <div className="text-right text-sm">
                            <p className="text-gray-600">{check.recommendation}</p>
                            {check.value && <p className="text-xs text-gray-500 mt-1">Value: {check.value}</p>}
                          </div>
                        </div>
                      ))}
                    </div>

                    {domainResult.recommendations && (
                      <div className="space-y-3">
                        <Separator />
                        <div>
                          <h4 className="font-medium mb-2">Recommendations:</h4>
                          <div className="grid gap-3 md:grid-cols-2">
                            <div>
                              <h5 className="text-sm font-medium text-gray-700 mb-1">Immediate Actions:</h5>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {domainResult.recommendations.immediate?.map((rec: string, index: number) => (
                                  <li key={index}>• {rec}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium text-gray-700 mb-1">Long-term:</h5>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {domainResult.recommendations.longTerm?.map((rec: string, index: number) => (
                                  <li key={index}>• {rec}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription>
                      <p className="font-medium text-red-800">❌ Domain check failed</p>
                      <p className="text-sm text-red-700">{domainResult.error}</p>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Common Issues & Solutions */}
        <Card>
          <CardHeader>
            <CardTitle>How to Resend Failed Emails</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">📧 Automatic Retry (Recommended):</h4>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Click "Retry All Recent Failed" to resend all failed emails from the last 24 hours</li>
                  <li>• System will attempt both customer and business emails</li>
                  <li>• Results will show success/failure for each email type</li>
                </ul>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">🎯 Specific Retry:</h4>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Click "Get Failed Submissions" to see available submissions</li>
                  <li>• Copy the ID of the submission you want to retry</li>
                  <li>• Paste the ID and click "Retry" to resend that specific submission</li>
                </ul>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">🔧 API Usage:</h4>
                <div className="bg-gray-50 p-3 rounded text-sm font-mono">
                  <p>GET /api/contact/retry - List failed submissions</p>
                  <p>POST /api/contact/retry - Retry all recent failed</p>
                  <p>
                    POST /api/contact/retry {"{"}"submissionId": "123"{"}"} - Retry specific
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
