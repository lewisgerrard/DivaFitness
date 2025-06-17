"use client"

import { useState } from "react"
import { CustomerThankYouEmail } from "@/emails/customer-thank-you"
import { BusinessNotificationEmail } from "@/emails/business-notification"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function EmailPreviewPage() {
  const [activeEmail, setActiveEmail] = useState<"customer" | "business">("customer")

  const sampleData = {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "07123 456 789",
    message:
      "Hi Emma,\n\nI'm interested in starting my fitness journey and would love to learn more about your 1-to-1 personal training sessions. I'm a complete beginner and looking for a supportive environment to build my confidence.\n\nI'm particularly interested in combining fitness with nutrition guidance. Could we schedule a free consultation to discuss my goals?\n\nThank you!\nSarah",
    service: "1-to-1 Personal Training",
  }

  return (
    <div className="min-h-screen bg-muted p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-bold text-secondary mb-4">Email Template Preview</h1>
          <p className="text-muted-foreground">Preview and test your Diva Fitness branded email templates</p>
        </div>

        {/* Email Type Selector */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            onClick={() => setActiveEmail("customer")}
            variant={activeEmail === "customer" ? "default" : "outline"}
            className="bg-primary hover:bg-primary-dark"
          >
            Customer Thank You Email
          </Button>
          <Button
            onClick={() => setActiveEmail("business")}
            variant={activeEmail === "business" ? "default" : "outline"}
            className="bg-primary hover:bg-primary-dark"
          >
            Business Notification Email
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Sample Data */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Sample Form Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <strong>Name:</strong> {sampleData.name}
              </div>
              <div>
                <strong>Email:</strong> {sampleData.email}
              </div>
              <div>
                <strong>Phone:</strong> {sampleData.phone}
              </div>
              <div>
                <strong>Service:</strong> {sampleData.service}
              </div>
              <div>
                <strong>Message:</strong>
                <div className="mt-2 p-3 bg-muted rounded text-sm whitespace-pre-wrap">{sampleData.message}</div>
              </div>
            </CardContent>
          </Card>

          {/* Email Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">
                {activeEmail === "customer" ? "Customer Thank You Email" : "Business Notification Email"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden bg-white">
                <div className="transform scale-75 origin-top-left w-[133%] h-[600px] overflow-auto">
                  {activeEmail === "customer" ? (
                    <CustomerThankYouEmail name={sampleData.name} />
                  ) : (
                    <BusinessNotificationEmail
                      name={sampleData.name}
                      email={sampleData.email}
                      phone={sampleData.phone}
                      message={sampleData.message}
                      service={sampleData.service}
                    />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Test Email Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-primary">Test Email Sending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              To test the actual email sending, use the contact form on your website. The emails will be sent using the
              Resend service with your configured DNS records.
            </p>
            <div className="flex gap-4">
              <Button asChild className="bg-primary hover:bg-primary-dark">
                <a href="/contact">Go to Contact Form</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://resend.com/emails" target="_blank" rel="noopener noreferrer">
                  View Resend Dashboard
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
