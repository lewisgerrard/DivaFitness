"use client"

import { CleanDashboardLayout } from "@/components/clean-dashboard-layout"

export default function ContentManagementPage() {
  return (
    <CleanDashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">Content Management</h1>
          <p className="text-gray-600 mt-2">Manage your website content and templates</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Website Structure</h3>
            <p className="text-sm text-gray-600">Manage your site pages and navigation</p>
          </div>

          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Branding</h3>
            <p className="text-sm text-gray-600">Customize colors, logos, and brand assets</p>
          </div>

          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Email Templates</h3>
            <p className="text-sm text-gray-600">Manage automated email communications</p>
          </div>

          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Components</h3>
            <p className="text-sm text-gray-600">View and manage website components</p>
          </div>

          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Design System</h3>
            <p className="text-sm text-gray-600">Typography and style guidelines</p>
          </div>
        </div>
      </div>
    </CleanDashboardLayout>
  )
}
