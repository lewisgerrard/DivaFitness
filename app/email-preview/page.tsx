"use client"

import { useState } from "react"
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
          <p className="text-muted-foreground">Preview your Diva Fitness branded email templates</p>
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
              <div className="border rounded-lg p-6 bg-white max-h-96 overflow-y-auto">
                {activeEmail === "customer" ? (
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-primary text-white rounded">
                      <h2 className="text-xl font-bold">Diva Fitness</h2>
                    </div>
                    <h1 className="text-2xl font-bold text-primary">Thank You, {sampleData.name}!</h1>
                    <p>
                      Thank you for reaching out to Diva Fitness. I'm thrilled that you're considering taking the next
                      step in your fitness journey!
                    </p>
                    <p>
                      I've received your message and will personally respond within 24 hours. In the meantime, here's
                      what you can expect:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>✨ A personalized response tailored to your goals</li>
                      <li>🏋️‍♀️ Information about our services and approach</li>
                      <li>📅 Options to schedule your free consultation</li>
                      <li>💜 A warm welcome to the Diva Fitness community</li>
                    </ul>
                    <p>
                      Every woman's fitness journey is unique, and I'm here to support you every step of the way in our
                      beautiful garden studio.
                    </p>
                    <div className="text-center p-4 bg-primary text-white rounded">
                      <p>
                        <strong>Emma Fisher</strong>
                        <br />
                        Personal Trainer & Wellness Coach
                      </p>
                      <p>📞 07966 874 821 | ✉️ info@diva-fitness.co.uk</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-primary text-white rounded">
                      <h2 className="text-xl font-bold">Diva Fitness - New Contact Form Submission</h2>
                    </div>
                    <div className="p-4 bg-primary/10 rounded">
                      <p className="text-primary font-bold">🎉 You have a new potential client inquiry!</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-bold text-primary">Contact Details</h3>
                      <p>
                        <strong>Name:</strong> {sampleData.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {sampleData.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {sampleData.phone}
                      </p>
                      <p>
                        <strong>Interested In:</strong> {sampleData.service}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-bold text-primary">Message</h3>
                      <div className="p-3 bg-gray-50 rounded whitespace-pre-wrap text-sm">{sampleData.message}</div>
                    </div>
                    <div className="text-center p-4 bg-primary text-white rounded">
                      <p>💜 Remember to respond within 24 hours to maintain excellent customer service!</p>
                    </div>
                  </div>
                )}
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
