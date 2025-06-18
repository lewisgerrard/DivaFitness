"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { AdminPageHeader } from "@/components/admin-page-header"

export default function WebsiteStructurePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminPageHeader
        icon={Globe}
        title="Website Structure"
        description="Configure website content, navigation, and page structure settings."
      />

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Button asChild variant="outline" className="gap-2">
              <Link href="/dashboard">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-pink-600">Website Structure Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                ✅ SUCCESS! You are on: <strong>/dashboard/admin/website-structure</strong>
              </p>
              <p className="mt-4 text-gray-600">Website structure management functionality will be built here.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
