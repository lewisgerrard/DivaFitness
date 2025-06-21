"use client"

import { useState } from "react"
import { CleanDashboardLayout } from "@/components/clean-dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Globe, Palette, Mail, Layout, Eye, File, ChevronDown } from "lucide-react"

export default function ContentManagementPage() {
  const [activeTab, setActiveTab] = useState("website")
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null)

  return (
    <CleanDashboardLayout>
      <div className="space-y-8">
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="website" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Website Structure
            </TabsTrigger>
            <TabsTrigger value="branding" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Branding
            </TabsTrigger>
            <TabsTrigger value="emails" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Templates
            </TabsTrigger>
            <TabsTrigger value="components" className="flex items-center gap-2">
              <Layout className="w-4 h-4" />
              Components
            </TabsTrigger>
            <TabsTrigger value="design-system" className="flex items-center gap-2">
              <Layout className="w-4 h-4" />
              Design System
            </TabsTrigger>
          </TabsList>

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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="branding" className="space-y-6">
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
          </TabsContent>

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
                  <div className="border rounded-lg">
                    <div
                      className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => setExpandedTemplate(expandedTemplate === "business" ? null : "business")}
                    >
                      <div>
                        <p className="font-medium">Business Notification Email</p>
                        <p className="text-sm text-gray-500">Contact Form Submission • business-notification.tsx</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="default">Active</Badge>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            expandedTemplate === "business" ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>
                    {expandedTemplate === "business" && (
                      <div className="border-t bg-gray-50 p-4">
                        <div className="space-y-3">
                          <div className="bg-white p-3 rounded border">
                            <h4 className="text-sm font-semibold text-gray-700 mb-1">Purpose</h4>
                            <p className="text-sm text-gray-600">
                              Sent to business owner when customers submit the contact form
                            </p>
                          </div>
                          <div className="bg-white p-3 rounded border">
                            <h4 className="text-sm font-semibold text-gray-700 mb-1">Recipients</h4>
                            <p className="text-sm text-gray-600">info@diva-fitness.co.uk</p>
                          </div>
                          <div className="bg-white p-3 rounded border">
                            <h4 className="text-sm font-semibold text-gray-700 mb-1">Preview</h4>
                            <div className="bg-white border rounded p-4 text-sm">
                              <div className="bg-[#7b329b] text-white p-4 rounded text-center mb-4">
                                <h3 className="font-bold">New Contact Form Submission</h3>
                              </div>
                              <div className="space-y-2">
                                <p>
                                  <strong>Name:</strong> John Doe
                                </p>
                                <p>
                                  <strong>Email:</strong> john.doe@example.com
                                </p>
                                <p>
                                  <strong>Phone:</strong> 07966 874 821
                                </p>
                                <p>
                                  <strong>Service:</strong> Personal Training
                                </p>
                                <p>
                                  <strong>Message:</strong> I am interested in learning more about your services.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border rounded-lg">
                    <div
                      className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => setExpandedTemplate(expandedTemplate === "customer" ? null : "customer")}
                    >
                      <div>
                        <p className="font-medium">Customer Thank You Email</p>
                        <p className="text-sm text-gray-500">Contact Form Response • customer-thank-you.tsx</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="default">Active</Badge>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            expandedTemplate === "customer" ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>
                    {expandedTemplate === "customer" && (
                      <div className="border-t bg-gray-50 p-4">
                        <div className="space-y-3">
                          <div className="bg-white p-3 rounded border">
                            <h4 className="text-sm font-semibold text-gray-700 mb-1">Purpose</h4>
                            <p className="text-sm text-gray-600">
                              Automatic confirmation sent to customers after form submission
                            </p>
                          </div>
                          <div className="bg-white p-3 rounded border">
                            <h4 className="text-sm font-semibold text-gray-700 mb-1">Recipients</h4>
                            <p className="text-sm text-gray-600">Customer email address</p>
                          </div>
                          <div className="bg-white p-3 rounded border">
                            <h4 className="text-sm font-semibold text-gray-700 mb-1">Preview</h4>
                            <div className="bg-white border rounded p-4 text-sm">
                              <div className="bg-[#7b329b] text-white p-4 rounded text-center mb-4">
                                <h3 className="font-bold">Thank You, John!</h3>
                              </div>
                              <div className="space-y-2">
                                <p>Thank you for reaching out to Diva Fitness.</p>
                                <p>I will personally respond within 24 hours.</p>
                                <div className="bg-[#e0c3fc] p-3 rounded">
                                  <p className="text-[#7b329b] font-medium">What to expect:</p>
                                  <ul className="text-[#7b329b] text-sm mt-1">
                                    <li>• Personalized response</li>
                                    <li>• Service information</li>
                                    <li>• Free consultation options</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="components" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layout className="w-5 h-5 text-primary" />
                  Website Components
                </CardTitle>
                <CardDescription>Core components used throughout the website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { name: "Hero Home", file: "hero-home.tsx", usage: "1 page (Home)", category: "Layout" },
                    { name: "Navigation", file: "navigation.tsx", usage: "All pages", category: "Layout" },
                    { name: "Footer", file: "footer.tsx", usage: "All pages", category: "Layout" },
                    { name: "Service Card", file: "service-card.tsx", usage: "2 pages", category: "Content" },
                    { name: "Review Card", file: "review-card.tsx", usage: "1 page", category: "Content" },
                    { name: "Contact Form", file: "contact-form.tsx", usage: "1 page", category: "Forms" },
                  ].map((component) => (
                    <div key={component.name} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between">
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
                      <div className="mt-2 text-xs text-gray-500">
                        <p>File: {component.file}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="design-system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layout className="w-5 h-5 text-primary" />
                  Design System
                </CardTitle>
                <CardDescription>Typography, spacing, and style guidelines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Typography Scale</h3>
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
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Component Library</h3>
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
