"use client"

import { HeroDashboard } from "@/components/hero-dashboard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"

const emailTemplates = [
  {
    name: "Business Notification",
    description: "Sent to business when customers submit contact forms - notifies of new inquiries",
  },
  {
    name: "Customer Thank You",
    description: "Sent to customers after form submission - confirms receipt and provides next steps",
  },
  {
    name: "Welcome Email",
    description: "Sent to new user registrations - introduces platform features and getting started guide",
  },
  {
    name: "Password Reset",
    description: "Sent when users request password reset - contains secure reset link and instructions",
  },
]

export default function EmailTemplatesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroDashboard
        title="Email Templates"
        description="Manage and customize email templates for client communications"
        showUserGreeting={false}
      />

      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Mail className="w-5 h-5" />
                Email Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-primary bg-primary/5">Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-primary bg-primary/5">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emailTemplates.map((template, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-100 hover:bg-primary/5 transition-colors duration-200 cursor-pointer"
                      >
                        <td className="py-4 px-4 font-medium text-gray-900">{template.name}</td>
                        <td className="py-4 px-4 text-gray-600">{template.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
