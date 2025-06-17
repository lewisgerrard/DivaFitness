"use client"

import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Mail, ArrowLeft, Eye } from "lucide-react"
import HeroSection from "@/components/hero-section"

const emailTemplates = [
  {
    id: "customer-thank-you",
    title: "Customer Thank You Email",
    description: "Sent to customers after form submission",
    category: "Customer Communication",
    lastModified: "2024-01-15",
    status: "Active",
  },
  {
    id: "business-notification",
    title: "Business Notification Email",
    description: "Internal notification for new contact submissions",
    category: "Internal Notifications",
    lastModified: "2024-01-15",
    status: "Active",
  },
]

export default function EmailTemplatesPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/dashboard")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      <HeroSection
        title="Email Templates"
        description="Manage and preview all email templates used throughout your website."
        badge="Admin Panel"
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Back Button */}
          <div className="mb-8">
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              <Link href="/dashboard" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>

          {/* Templates Grid */}
          <div className="grid gap-8 md:grid-cols-2 mb-16">
            {emailTemplates.map((template) => (
              <Card
                key={template.id}
                className="group hover:shadow-xl transition-all duration-500 cursor-pointer border-primary/20 overflow-hidden"
              >
                <CardHeader className="pb-4 bg-gradient-to-r from-primary/5 to-accent/5">
                  <div className="flex items-start justify-between">
                    <CardTitle className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Mail className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-xl text-primary">{template.title}</h3>
                        <Badge variant="secondary" className="mt-2 bg-primary/10 text-primary border-primary/20">
                          {template.category}
                        </Badge>
                      </div>
                    </CardTitle>
                    <Badge
                      variant={template.status === "Active" ? "default" : "secondary"}
                      className={template.status === "Active" ? "bg-green-100 text-green-700 border-green-200" : ""}
                    >
                      {template.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-6 leading-relaxed">{template.description}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                    <span>Last modified: {template.lastModified}</span>
                  </div>
                  <Button asChild className="w-full bg-primary hover:bg-primary-dark">
                    <Link
                      href={`/admin/email-templates/${template.id}`}
                      className="flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View & Edit Template
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-primary/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-heading font-bold text-primary mb-2">{emailTemplates.length}</div>
                <div className="text-muted-foreground font-medium">Total Templates</div>
              </CardContent>
            </Card>
            <Card className="border-green-200 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-green-600 rounded-full" />
                </div>
                <div className="text-3xl font-heading font-bold text-green-600 mb-2">
                  {emailTemplates.filter((t) => t.status === "Active").length}
                </div>
                <div className="text-muted-foreground font-medium">Active Templates</div>
              </CardContent>
            </Card>
            <Card className="border-blue-200 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full" />
                </div>
                <div className="text-3xl font-heading font-bold text-blue-600 mb-2">2</div>
                <div className="text-muted-foreground font-medium">Categories</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
