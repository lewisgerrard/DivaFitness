"use client"

import { CleanDashboardLayout } from "@/components/clean-dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContentManagementPage() {
  return (
    <CleanDashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">Content Management</h1>
          <p className="text-gray-600 mt-2">Manage your website content and templates</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Website Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Manage your site pages and navigation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Branding</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Customize colors, logos, and brand assets</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Manage automated email communications</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Components</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">View and manage website components</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Design System</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Typography and style guidelines</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </CleanDashboardLayout>
  )
}
