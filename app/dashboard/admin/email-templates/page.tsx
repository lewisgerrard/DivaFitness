"use client"

import { HeroDashboard } from "@/components/dashboard-hero"
import { DashboardTable } from "@/components/dashboard-table"
import { Mail } from "lucide-react"

const emailTemplatesData = [
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

const columns = [
  { key: "name", label: "Name" },
  { key: "description", label: "Description" },
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
          <DashboardTable title="Email Templates" icon={Mail} columns={columns} data={emailTemplatesData} />
        </div>
      </section>
    </div>
  )
}
