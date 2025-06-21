"use client"

import { useState } from "react"
import { CleanDashboardLayout } from "@/components/clean-dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Globe, Palette, Mail, Layout, Eye, RefreshCw, File, ChevronDown } from "lucide-react"

export default function ContentManagementPage() {
  const [activeTab, setActiveTab] = useState("website")
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null)

  const layoutComponents = [
    {
      name: "Hero Home",
      category: "Layout",
      usage: "1 page (Home)",
      file: "hero-home.tsx",
      description: "Main homepage hero with gradient background and call-to-action",
    },
    {
      name: "Hero Page",
      category: "Layout",
      usage: "5 pages",
      file: "hero-page.tsx",
      description: "Standard page hero with title and breadcrumb navigation",
    },
    {
      name: "Navigation",
      category: "Layout",
      usage: "All pages",
      file: "navigation.tsx",
      description: "Main site navigation with mobile responsive menu",
    },
    {
      name: "Footer",
      category: "Layout",
      usage: "All pages",
      file: "footer.tsx",
      description: "Site footer with contact info, social links, and navigation",
    },
  ]

  const contentComponents = [
    {
      name: "Service Card",
      category: "Content",
      usage: "2 pages",
      file: "service-card.tsx",
      description: "Individual service display card with icon and description",
    },
    {
      name: "Review Card",
      category: "Content",
      usage: "1 page (Home)",
      file: "review-card.tsx",
      description: "Customer testimonial card with rating and photo",
    },
    {
      name: "Contact Info",
      category: "Content",
      usage: "1 page (Contact)",
      file: "contact-info.tsx",
      description: "Business contact information display",
    },
  ]

  const formComponents = [
    {
      name: "Contact Form",
      category: "Forms",
      usage: "1 page (Contact)",
      file: "contact-form.tsx",
      description: "Contact form with service selection and validation",
    },
  ]

  const emailTemplates = [
    {
      name: "Business Notification Email",
      type: "Contact Form Submission",
      status: "Active",
      file: "business-notification.tsx",
    },
    {
      name: "Customer Thank You Email",
      type: "Contact Form Response",
      status: "Active",
      file: "customer-thank-you.tsx",
    },
  ]

  return (
    <CleanDashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">Content Management</h1>
            <p className="text-gray-600 mt-2">Manage your website content, branding, and communication templates</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview Site
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary-dark">
              <File className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger
              value="website"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Globe className="w-4 h-4" />
              Website Structure
            </TabsTrigger>
            <TabsTrigger
              value="branding"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Palette className="w-4 h-4" />
              Branding
            </TabsTrigger>
            <TabsTrigger
              value="emails"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Mail className="w-4 h-4" />
              Email Templates
            </TabsTrigger>
            <TabsTrigger
              value="components"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Layout className="w-4 h-4" />
              Components
            </TabsTrigger>
            <TabsTrigger
              value="design-system"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Layout className="w-4 h-4" />
              Design System
            </TabsTrigger>
          </TabsList>

          {/* Website Structure Tab */}
          <TabsContent value="website" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Site Map
                </CardTitle>
                <CardDescription>Visual representation of your website structure</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg border-2 border-primary/20">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="font-semibold text-primary">Home (/)</span>
                    <Badge variant="default">Published</Badge>
                  </div>
                  <div className="ml-6 space-y-3">
                    {[
                      { name: "About", path: "/about", status: "Published" },
                      { name: "Services", path: "/services", status: "Published" },
                      { name: "Training", path: "/training", status: "Published" },
                      { name: "Nutrition", path: "/nutrition", status: "Published" },
                      { name: "Contact", path: "/contact", status: "Published" },
                      { name: "FAQs", path: "/faqs", status: "Published" },
                      { name: "Portal", path: "/portal", status: "Published" },
                      { name: "Login", path: "/login", status: "Published" },
                    ].map((page) => (
                      <div key={page.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          <div className="w-8 h-px bg-gray-300"></div>
                        </div>
                        <div className="flex-1">
                          <span className="font-medium">{page.name}</span>
                          <span className="text-sm text-gray-500 ml-2">({page.path})</span>
                        </div>
                        <Badge variant={page.status === "Published" ? "default" : "secondary"}>{page.status}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6 flex gap-3">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Structure
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Sync with Actual Site
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Branding Tab */}
          <TabsContent value="branding" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Logo & Assets</CardTitle>
                  <CardDescription>Manage your brand logos and images</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                          <img
                            src="/images/diva-logo.png"
                            alt="Diva Fitness Logo"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <p className="font-medium">Main Logo</p>
                          <p className="text-sm text-gray-500">PNG, 512x512</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                          <img src="/logo-icon.png" alt="Diva Fitness Icon" className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <p className="font-medium">Logo Icon</p>
                          <p className="text-sm text-gray-500">PNG, 256x256</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                          <img
                            src="/logo-with-text.png"
                            alt="Diva Fitness Logo with Text"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <p className="font-medium">Logo with Text</p>
                          <p className="text-sm text-gray-500">PNG, 512x256</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5 text-primary" />
                    Brand Colors
                  </CardTitle>
                  <CardDescription>Customize your brand color palette</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Primary Color</p>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#7b329b] rounded border"></div>
                        <span className="text-sm text-gray-600">#7b329b</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Secondary Color</p>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#374151] rounded border"></div>
                        <span className="text-sm text-gray-600">#374151</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Accent Color</p>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#e0c3fc] rounded border"></div>
                        <span className="text-sm text-gray-600">#e0c3fc</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Text Color</p>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#111827] rounded border"></div>
                        <span className="text-sm text-gray-600">#111827</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Email Templates Tab */}
          <TabsContent value="emails" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  Email Templates
                </CardTitle>
                <CardDescription>Manage automated email templates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {emailTemplates.map((template) => (
                    <div key={template.name} className="border rounded-lg">
                      <div
                        className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => {
                          setExpandedTemplate(expandedTemplate === template.name ? null : template.name)
                        }}
                      >
                        <div>
                          <p className="font-medium">{template.name}</p>
                          <p className="text-sm text-gray-500">
                            {template.type} • {template.file}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={template.status === "Active" ? "default" : "secondary"}>
                            {template.status}
                          </Badge>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              expandedTemplate === template.name ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                      </div>
                      {expandedTemplate === template.name && (
                        <div className="border-t bg-gray-50 p-4">
                          <div className="space-y-3">
                            <div className="bg-white p-3 rounded border">
                              <h4 className="text-sm font-semibold text-gray-700 mb-1">Purpose</h4>
                              <p className="text-sm text-gray-600">
                                {template.name === "Business Notification Email"
                                  ? "Alert you of new potential client inquiries from the contact form"
                                  : "Confirm receipt and set expectations for response to customers"}
                              </p>
                            </div>
                            <div className="bg-white p-3 rounded border">
                              <h4 className="text-sm font-semibold text-gray-700 mb-1">Recipients</h4>
                              <p className="text-sm text-gray-600">
                                {template.name === "Business Notification Email"
                                  ? "Sent to: info@diva-fitness.co.uk (business owner)"
                                  : "Sent to: Customer's provided email address"}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Components Tab */}
          <TabsContent value="components" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Layout Components Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layout className="w-5 h-5 text-primary" />
                    Layout Components
                  </CardTitle>
                  <CardDescription>Core layout and navigation components</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {layoutComponents.map((component) => (
                      <div key={component.name} className="border rounded-lg">
                        <div className="flex items-center justify-between p-3">
                          <div>
                            <p className="font-medium">{component.name}</p>
                            <p className="text-sm text-gray-500">
                              {component.category} • Used in {component.usage}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {component.category}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Content Components Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layout className="w-5 h-5 text-primary" />
                    Content Components
                  </CardTitle>
                  <CardDescription>Content display and information components</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {contentComponents.map((component) => (
                      <div key={component.name} className="border rounded-lg">
                        <div className="flex items-center justify-between p-3">
                          <div>
                            <p className="font-medium">{component.name}</p>
                            <p className="text-sm text-gray-500">
                              {component.category} • Used in {component.usage}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {component.category}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Form Components Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layout className="w-5 h-5 text-primary" />
                    Form Components
                  </CardTitle>
                  <CardDescription>Form and input components</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {formComponents.map((component) => (
                      <div key={component.name} className="border rounded-lg">
                        <div className="flex items-center justify-between p-3">
                          <div>
                            <p className="font-medium">{component.name}</p>
                            <p className="text-sm text-gray-500">
                              {component.category} • Used in {component.usage}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {component.category}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Design System Tab */}
          <TabsContent value="design-system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layout className="w-5 h-5 text-primary" />
                  Design System
                </CardTitle>
                <CardDescription>Typography, spacing, and style guidelines for consistent design</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Typography Scale</h3>
                    <p className="text-sm text-gray-500 mb-4">Consistent heading and body text styles</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl font-bold text-primary">H1</span>
                        <span className="text-sm text-gray-600">32px, Bold - Main headings</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold text-primary">H2</span>
                        <span className="text-sm text-gray-600">24px, Bold - Section headings</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xl font-semibold text-primary">H3</span>
                        <span className="text-sm text-gray-600">20px, Semibold - Subsection headings</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-base">Body</span>
                        <span className="text-sm text-gray-600">16px, Regular - Body text</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">Small</span>
                        <span className="text-sm text-gray-600">14px, Regular - Secondary text</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Component Library</h3>
                    <p className="text-sm text-gray-500 mb-4">Reusable UI components and interactive elements</p>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-3">
                        <Button size="sm">Small Button</Button>
                        <Button>Default Button</Button>
                        <Button size="lg">Large Button</Button>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <Button variant="outline">Outline</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="ghost">Ghost</Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge>Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="outline">Outline</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CleanDashboardLayout>
  )
}
