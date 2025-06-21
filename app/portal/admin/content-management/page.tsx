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
            <div className="space-y-6">
              {/* Site Map Visualization */}
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
                    {/* Root Level */}
                    <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg border-2 border-primary/20">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span className="font-semibold text-primary">Home (/)</span>
                      <Badge variant="default">Published</Badge>
                    </div>

                    {/* Level 1 Pages */}
                    <div className="ml-6 space-y-3">
                      {[
                        { name: "About", path: "/about", status: "Published", children: [] },
                        { name: "Services", path: "/services", status: "Published", children: [] },
                        { name: "Training", path: "/training", status: "Published", children: [] },
                        { name: "Nutrition", path: "/nutrition", status: "Published", children: [] },
                        { name: "Contact", path: "/contact", status: "Published", children: [] },
                        { name: "FAQs", path: "/faqs", status: "Published", children: [] },
                        {
                          name: "Portal",
                          path: "/portal",
                          status: "Published",
                          children: [
                            "Dashboard (/portal)",
                            "User Management (/portal/admin/user-management)",
                            "Content Management (/portal/admin/content-management)",
                            "Settings (/portal/admin/settings)",
                            "Member Profile (/portal/member/profile)",
                          ],
                        },
                        { name: "Login", path: "/login", status: "Published", children: [] },
                      ].map((page, index) => (
                        <div key={page.name} className="space-y-2">
                          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
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

                          {/* Sub-pages */}
                          {page.children.length > 0 && (
                            <div className="ml-8 space-y-2">
                              {page.children.map((child) => (
                                <div
                                  key={child}
                                  className="flex items-center gap-3 p-2 bg-gray-25 rounded border-l-2 border-gray-200"
                                >
                                  <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                                    <div className="w-6 h-px bg-gray-200"></div>
                                  </div>
                                  <span className="text-sm text-gray-600">{child}</span>
                                  <Badge variant="outline" className="text-xs">
                                    Page
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          )}
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
            </div>
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
            <div className="grid grid-cols-1 gap-6">
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
                    {[
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
                    ].map((template) => (
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
                            <div className="mb-4 space-y-3">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white p-3 rounded border">
                                  <h4 className="text-sm font-semibold text-gray-700 mb-1">Trigger Event</h4>
                                  <p className="text-sm text-gray-600">
                                    {template.name === "Business Notification Email"
                                      ? "When a customer submits the contact form on your website"
                                      : "Automatically sent to customers after they submit a contact form"}
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
                                <div className="bg-white p-3 rounded border">
                                  <h4 className="text-sm font-semibold text-gray-700 mb-1">Timing</h4>
                                  <p className="text-sm text-gray-600">
                                    {template.name === "Business Notification Email"
                                      ? "Sent immediately upon form submission"
                                      : "Sent within 30 seconds of form submission"}
                                  </p>
                                </div>
                                <div className="bg-white p-3 rounded border">
                                  <h4 className="text-sm font-semibold text-gray-700 mb-1">Purpose</h4>
                                  <p className="text-sm text-gray-600">
                                    {template.name === "Business Notification Email"
                                      ? "Alert you of new potential client inquiries"
                                      : "Confirm receipt and set expectations for response"}
                                  </p>
                                </div>
                              </div>

                              <div className="bg-white p-3 rounded border">
                                <h4 className="text-sm font-semibold text-gray-700 mb-1">Template Variables</h4>
                                <div className="text-xs text-gray-600 space-y-1">
                                  {template.name === "Business Notification Email" ? (
                                    <>
                                      <p>
                                        <code className="bg-gray-100 px-1 rounded">name</code> - Customer&apos;s full
                                        name
                                      </p>
                                      <p>
                                        <code className="bg-gray-100 px-1 rounded">email</code> - Customer&apos;s email
                                        address
                                      </p>
                                      <p>
                                        <code className="bg-gray-100 px-1 rounded">phone</code> - Customer&apos;s phone
                                        number
                                      </p>
                                      <p>
                                        <code className="bg-gray-100 px-1 rounded">service</code> - Selected service
                                        interest
                                      </p>
                                      <p>
                                        <code className="bg-gray-100 px-1 rounded">message</code> - Customer&apos;s
                                        inquiry message
                                      </p>
                                    </>
                                  ) : (
                                    <>
                                      <p>
                                        <code className="bg-gray-100 px-1 rounded">name</code> - Customer&apos;s first
                                        name for personalization
                                      </p>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="mb-2">
                              <p className="text-sm font-medium text-gray-700">Email Preview:</p>
                            </div>
                            <div
                              className="bg-white border rounded p-4 max-w-2xl mx-auto shadow-sm"
                              style={{ fontFamily: "Arial, sans-serif" }}
                            >
                              {template.name === "Business Notification Email" ? (
                                <div className="space-y-4">
                                  {/* Email Header */}
                                  <div className="bg-[#7b329b] p-6 rounded-t-lg text-center">
                                    <img
                                      src="/logo-with-text.png"
                                      alt="Diva Fitness"
                                      className="h-12 mx-auto mb-4 filter brightness-0 invert"
                                    />
                                    <h1 className="text-white text-xl font-bold">New Contact Form Submission</h1>
                                  </div>

                                  {/* Email Content */}
                                  <div className="p-6 space-y-4">
                                    <div className="bg-[#e0c3fc] p-4 rounded-lg text-center">
                                      <p className="text-[#7b329b] font-semibold">
                                        ✓ You have a new potential client inquiry!
                                      </p>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                                      <h2 className="text-[#7b329b] font-bold text-lg">Contact Details</h2>
                                      <div className="space-y-2 text-sm">
                                        <p>
                                          <strong>Name:</strong> John Doe
                                        </p>
                                        <p>
                                          <strong>Email:</strong>{" "}
                                          <a href="mailto:john.doe@example.com" className="text-[#7b329b]">
                                            john.doe@example.com
                                          </a>
                                        </p>
                                        <p>
                                          <strong>Phone:</strong>{" "}
                                          <a href="tel:07966874821" className="text-[#7b329b]">
                                            07966 874 821
                                          </a>
                                        </p>
                                        <p>
                                          <strong>Interested In:</strong> Personal Training
                                        </p>
                                      </div>
                                    </div>

                                    <div className="border-2 border-[#e0c3fc] p-4 rounded-lg">
                                      <h2 className="text-[#7b329b] font-bold text-lg mb-2">Message</h2>
                                      <p className="text-gray-800 text-sm leading-relaxed">
                                        I&apos;m interested in learning more about your personal training services.
                                        Could we schedule a consultation to discuss my fitness goals?
                                      </p>
                                    </div>

                                    <div className="text-center pt-4">
                                      <a
                                        href="#"
                                        className="inline-block bg-[#7b329b] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#6b2a8b] transition-colors"
                                      >
                                        Reply to John
                                      </a>
                                    </div>
                                  </div>

                                  {/* Email Footer */}
                                  <div className="bg-gray-50 p-4 text-center border-t">
                                    <p className="text-xs text-gray-500">
                                      This email was sent from the Diva Fitness contact form on your website.
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                      <a href="#" className="text-[#7b329b]">
                                        View Contact Page
                                      </a>
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <div className="space-y-4">
                                  {/* Email Header */}
                                  <div className="bg-[#7b329b] p-6 rounded-t-lg text-center">
                                    <img
                                      src="/logo-with-text.png"
                                      alt="Diva Fitness"
                                      className="h-12 mx-auto filter brightness-0 invert"
                                    />
                                  </div>

                                  {/* Email Content */}
                                  <div className="p-6 space-y-4">
                                    <h1 className="text-[#7b329b] text-2xl font-bold text-center">Thank You, John!</h1>

                                    <p className="text-gray-800">
                                      Thank you for reaching out to Diva Fitness. I&apos;m thrilled that you&apos;re
                                      considering taking the next step in your fitness journey!
                                    </p>

                                    <p className="text-gray-800">
                                      I&apos;ve received your message and will personally respond within 24 hours. In
                                      the meantime, here&apos;s what you can expect:
                                    </p>

                                    <div className="bg-[#e0c3fc] p-4 rounded-lg space-y-2">
                                      <p className="text-[#7b329b] font-medium">
                                        • A personalised response tailored to your goals
                                      </p>
                                      <p className="text-[#7b329b] font-medium">
                                        • Information about our services and approach
                                      </p>
                                      <p className="text-[#7b329b] font-medium">
                                        • Options to schedule your free consultation
                                      </p>
                                      <p className="text-[#7b329b] font-medium">
                                        • A warm welcome to the Diva Fitness community
                                      </p>
                                    </div>

                                    <p className="text-gray-800">
                                      Every woman&apos;s fitness journey is unique, and I&apos;m here to support you
                                      every step of the way in our beautiful garden studio.
                                    </p>

                                    <div className="text-center py-4">
                                      <a
                                        href="#"
                                        className="inline-block bg-[#7b329b] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#6b2a8b] transition-colors"
                                      >
                                        Learn More About Emma
                                      </a>
                                    </div>

                                    <div className="text-center pt-4 border-t">
                                      <p className="text-gray-800">
                                        With excitement for your journey,
                                        <br />
                                        <strong>Emma Fisher</strong>
                                        <br />
                                        <span className="text-[#7b329b] text-sm">
                                          Personal Trainer & Wellness Coach
                                        </span>
                                      </p>
                                    </div>
                                  </div>

                                  {/* Email Footer */}
                                  <div className="bg-gray-50 p-4 text-center border-t">
                                    <p className="text-xs text-gray-600 mb-2">
                                      <strong>Diva Fitness</strong>
                                      <br />
                                      Chester, UK
                                      <br />
                                      Phone:{" "}
                                      <a href="tel:07966874821" className="text-[#7b329b]">
                                        07966 874 821
                                      </a>
                                      <br />
                                      Email:{" "}
                                      <a href="mailto:info@diva-fitness.co.uk" className="text-[#7b329b]">
                                        info@diva-fitness.co.uk
                                      </a>
                                      <br />
                                      Website:{" "}
                                      <a href="https://diva-fitness.co.uk" className="text-[#7b329b]">
                                        diva-fitness.co.uk
                                      </a>
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      Follow us:
                                      <a href="#" className="text-[#7b329b]">
                                        {" "}
                                        Instagram
                                      </a>{" "}
                                      |
                                      <a href="#" className="text-[#7b329b]">
                                        {" "}
                                        Facebook
                                      </a>
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
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
                    {[
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
                    ].map((component) => (
                      <div key={component.name} className="border rounded-lg">
                        <div
                          className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => {
                            setExpandedTemplate(expandedTemplate === component.name ? null : component.name)
                          }}
                        >
                          <div>
                            <p className="font-medium">{component.name}</p>
                            <p className="text-sm text-gray-500">
                              {component.category} • Used in {component.usage}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {component.category}
                            </Badge>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform ${
                                expandedTemplate === component.name ? "rotate-180" : ""
                              }`}
                            />
                          </div>
                        </div>
                        {expandedTemplate === component.name && (
                          <div className="border-t bg-gray-50 p-4">
                            <div className="mb-2">
                              <p className="text-sm font-medium text-gray-700">Component Preview:</p>
                            </div>
                            <div className="bg-white border rounded p-4 max-w-full overflow-auto">
                              {component.name === "Hero Home" ? (
                                <div className="bg-gradient-to-r from-[#7b329b] to-[#e0c3fc] p-8 rounded-lg text-center relative overflow-hidden">
                                  <div className="absolute inset-0 bg-black/20"></div>
                                  <div className="relative z-10">
                                    <h1 className="text-4xl font-bold text-white mb-4">
                                      Transform Your Body, Transform Your Life
                                    </h1>
                                    <p className="text-white/90 mb-6 max-w-2xl mx-auto text-lg">
                                      Join Emma at Diva Fitness for personalized training in our beautiful garden
                                      studio. Achieve your goals with expert guidance and a supportive environment.
                                    </p>
                                    <button className="bg-white text-[#7b329b] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors text-lg">
                                      Start Your Journey Today
                                    </button>
                                  </div>
                                </div>
                              ) : component.name === "Navigation" ? (
                                <div className="bg-white border-b shadow-sm">
                                  <div className="flex items-center justify-between px-6 py-4">
                                    <div className="flex items-center gap-2">
                                      <img src="/logo-icon.png" alt="Diva Fitness" className="h-8 w-8" />
                                      <span className="font-bold text-[#7b329b] text-xl">Diva Fitness</span>
                                    </div>
                                    <nav className="hidden md:flex items-center gap-8">
                                      <a href="#" className="text-gray-700 hover:text-[#7b329b] font-medium">
                                        Home
                                      </a>
                                      <a href="#" className="text-gray-700 hover:text-[#7b329b] font-medium">
                                        About
                                      </a>
                                      <a href="#" className="text-gray-700 hover:text-[#7b329b] font-medium">
                                        Services
                                      </a>
                                      <a href="#" className="text-gray-700 hover:text-[#7b329b] font-medium">
                                        Training
                                      </a>
                                      <a href="#" className="text-gray-700 hover:text-[#7b329b] font-medium">
                                        Nutrition
                                      </a>
                                      <a href="#" className="text-gray-700 hover:text-[#7b329b] font-medium">
                                        Contact
                                      </a>
                                    </nav>
                                    <button className="bg-[#7b329b] text-white px-4 py-2 rounded-full font-medium hover:bg-[#6b2a8b]">
                                      Get Started
                                    </button>
                                  </div>
                                </div>
                              ) : component.name === "Footer" ? (
                                <div className="bg-gray-900 text-white p-6">
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                      <div className="flex items-center gap-2 mb-3">
                                        <img
                                          src="/logo-icon.png"
                                          alt="Diva Fitness"
                                          className="h-8 w-8 filter brightness-0 invert"
                                        />
                                        <span className="font-bold text-xl">Diva Fitness</span>
                                      </div>
                                      <p className="text-gray-300 text-sm">
                                        Transform your body and mind with personalized fitness training in our beautiful
                                        garden studio.
                                      </p>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-3">Quick Links</h4>
                                      <ul className="space-y-2 text-sm text-gray-300">
                                        <li>
                                          <a href="#" className="hover:text-white">
                                            About Emma
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#" className="hover:text-white">
                                            Services
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#" className="hover:text-white">
                                            Training
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#" className="hover:text-white">
                                            Nutrition
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-3">Contact Info</h4>
                                      <div className="space-y-2 text-sm text-gray-300">
                                        <p>📞 07966 874 821</p>
                                        <p>✉️ info@diva-fitness.co.uk</p>
                                        <p>📍 Chester, UK</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-400">
                                    <p>&copy; 2024 Diva Fitness. All rights reserved.</p>
                                  </div>
                                </div>
                              ) : (
                                <div className="text-center py-8 text-gray-500">
                                  <p>Preview not available for {component.name}</p>
                                  <p className="text-sm mt-2">Component: {component.file}</p>
                                </div>
                              )}
                            </div>
                            <div className="mt-3 text-xs text-gray-500">
                              <p>
                                <strong>File:</strong> {component.file}
                              </p>
                              <p>
                                <strong>Description:</strong> {component.description}
                              </p>
                            </div>
                          </div>
                        )}
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
                    {[
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
                    ].map((component) => (
                      <div key={component.name} className="border rounded-lg">
                        <div
                          className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => {
                            setExpandedTemplate(expandedTemplate === component.name ? null : component.name)
                          }}
                        >
                          <div>
                            <p className="font-medium">{component.name}</p>
                            <p className="text-sm text-gray-500">
                              {component.category} • Used in {component.usage}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {component.category}
                            </Badge>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform ${
                                expandedTemplate === component.name ? "rotate-180" : ""
                              }`}
                            />
                          </div>
                        </div>
                        {expandedTemplate === component.name && (
                          <div className="border-t bg-gray-50 p-4">
                            <div className="mb-2">
                              <p className="text-sm font-medium text-gray-700">Component Preview:</p>
                            </div>
                            <div className="bg-white border rounded p-4 max-w-full overflow-auto">
                              {component.name === "Service Card" ? (
                                <div className="max-w-sm mx-auto">
                                  <div className="bg-white border border-[#e0c3fc] rounded-lg p-6 hover:shadow-lg transition-shadow">
                                    <div className="w-16 h-16 bg-[#7b329b] rounded-full flex items-center justify-center mb-4 mx-auto">
                                      <span className="text-white text-2xl">💪</span>
                                    </div>
                                    <h3 className="font-bold text-xl text-[#7b329b] mb-3 text-center">
                                      Personal Training
                                    </h3>
                                    <p className="text-gray-600 text-center mb-4">
                                      One-on-one sessions tailored specifically to your fitness goals and lifestyle
                                    </p>
                                    <ul className="text-sm text-gray-600 space-y-1 mb-4">
                                      <li>• Customized workout plans</li>
                                      <li>• Progress tracking</li>
                                      <li>• Nutritional guidance</li>
                                      <li>• Flexible scheduling</li>
                                    </ul>
                                    <button className="w-full bg-[#7b329b] text-white py-2 px-4 rounded-md hover:bg-[#6b2a8b] transition-colors">
                                      Learn More
                                    </button>
                                  </div>
                                </div>
                              ) : component.name === "Review Card" ? (
                                <div className="max-w-sm mx-auto">
                                  <div className="bg-[#e0c3fc] p-6 rounded-lg">
                                    <div className="flex items-center mb-3">
                                      <div className="flex text-yellow-400 text-lg">★★★★★</div>
                                      <span className="ml-2 text-sm text-gray-700 font-medium">5.0</span>
                                    </div>
                                    <p className="text-gray-800 mb-4 italic">
                                      &quot;Emma&apos;s training has completely transformed my approach to fitness. The
                                      garden studio is beautiful and the personalized attention is amazing!&quot;
                                    </p>
                                    <div className="flex items-center">
                                      <div className="w-12 h-12 bg-[#7b329b] rounded-full flex items-center justify-center text-white font-bold text-lg">
                                        S
                                      </div>
                                      <div className="ml-3">
                                        <p className="font-semibold text-gray-800">Sarah Mitchell</p>
                                        <p className="text-sm text-gray-600">Personal Training Client</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="text-center py-8 text-gray-500">
                                  <p>Preview not available for {component.name}</p>
                                  <p className="text-sm mt-2">Component: {component.file}</p>
                                </div>
                              )}
                            </div>
                            <div className="mt-3 text-xs text-gray-500">
                              <p>
                                <strong>File:</strong> {component.file}
                              </p>
                              <p>
                                <strong>Description:</strong> {component.description}
                              </p>
                            </div>
                          </div>
                        )}
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
                    {[
                      {
                        name: "Contact Form",
                        category: "Forms",
                        usage: "1 page (Contact)",
                        file: "contact-form.tsx",
                        description: "Contact form with service selection and validation",
                      },
                    ].map((component) => (
                      <div key={component.name} className="border rounded-lg">
                        <div
                          className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => {
                            setExpandedTemplate(expandedTemplate === component.name ? null : component.name)
                          }}
                        >
                          <div>
                            <p className="font-medium">{component.name}</p>
                            <p className="text-sm text-gray-500">
                              {component.category} • Used in {component.usage}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {component.category}
                            </Badge>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform ${
                                expandedTemplate === component.name ? "rotate-180" : ""
                              }`}
                            />
                          </div>
                        </div>
                        {expandedTemplate === component.name && (
                          <div className="border-t bg-gray-50 p-4">
                            <div className="mb-2">
                              <p className="text-sm font-medium text-gray-700">Component Preview:</p>
                            </div>
                            <div className="bg-white border rounded p-4 max-w-full overflow-auto">
                              <div className="max-w-md mx-auto bg-white p-6 rounded-lg border">
                                <h3 className="text-xl font-semibold text-[#7b329b] mb-4">Get In Touch</h3>
                                <form className="space-y-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                    <input
                                      type="text"
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7b329b]"
                                      placeholder="Your full name"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                    <input
                                      type="email"
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7b329b]"
                                      placeholder="your.email@example.com"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <input
                                      type="tel"
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7b329b]"
                                      placeholder="Your phone number"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Service Interest
                                    </label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7b329b]">
                                      <option>Personal Training</option>
                                      <option>Nutrition Coaching</option>
                                      <option>Group Sessions</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7b329b]"
                                      rows={3}
                                      placeholder="Tell us about your fitness goals..."
                                    />
                                  </div>
                                  <button
                                    type="submit"
                                    className="w-full bg-[#7b329b] text-white py-3 px-4 rounded-md hover:bg-[#6b2a8b] transition-colors font-medium"
                                  >
                                    Send Message
                                  </button>
                                </form>
                              </div>
                            </div>
                            <div className="mt-3 text-xs text-gray-500">
                              <p>
                                <strong>File:</strong> {component.file}
                              </p>
                              <p>
                                <strong>Description:</strong> {component.description}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Design System Tab */}
          <TabsContent value="design-system" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
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
                      <h3 className="font-semibold text-lg mb-2">Spacing System</h3>
                      <p className="text-sm text-gray-500 mb-4">Consistent margins and padding using Tailwind scale</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary"></div>
                            <span className="text-sm">2px - xs</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-primary"></div>
                            <span className="text-sm">16px - 4</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-primary"></div>
                            <span className="text-sm">24px - 6</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary"></div>
                            <span className="text-sm">32px - 8</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-12 h-12 bg-primary"></div>
                            <span className="text-sm">48px - 12</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-16 bg-primary"></div>
                            <span className="text-sm">64px - 16</span>
                          </div>
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
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </CleanDashboardLayout>
  )
}
