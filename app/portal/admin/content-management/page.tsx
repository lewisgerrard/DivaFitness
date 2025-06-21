"use client"

import { useState } from "react"
import { CleanDashboardLayout } from "@/components/clean-dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Globe, Palette, Mail, Layout, Eye, File } from "lucide-react"

export default function ContentManagementPage() {
  const [activeTab, setActiveTab] = useState("website")

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
            <Button size="sm" className="bg-primary">
              <File className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="website">
              <Globe className="w-4 h-4 mr-2" />
              Website
            </TabsTrigger>
            <TabsTrigger value="branding">
              <Palette className="w-4 h-4 mr-2" />
              Branding
            </TabsTrigger>
            <TabsTrigger value="emails">
              <Mail className="w-4 h-4 mr-2" />
              Emails
            </TabsTrigger>
            <TabsTrigger value="components">
              <Layout className="w-4 h-4 mr-2" />
              Components
            </TabsTrigger>
            <TabsTrigger value="design">
              <Layout className="w-4 h-4 mr-2" />
              Design
            </TabsTrigger>
          </TabsList>

          <TabsContent value="website">
            <Card>
              <CardHeader>
                <CardTitle>Site Map</CardTitle>
                <CardDescription>Visual representation of your website structure</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg border">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="font-semibold text-primary">Home</span>
                    <Badge>Published</Badge>
                  </div>
                  <div className="ml-6 space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
                      <span className="font-medium">About</span>
                      <Badge>Published</Badge>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
                      <span className="font-medium">Services</span>
                      <Badge>Published</Badge>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
                      <span className="font-medium">Contact</span>
                      <Badge>Published</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="branding">
            <Card>
              <CardHeader>
                <CardTitle>Brand Colors</CardTitle>
                <CardDescription>Your brand color palette</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Primary Color</p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-600 rounded border"></div>
                      <span className="text-sm text-gray-600">Purple</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Secondary Color</p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-700 rounded border"></div>
                      <span className="text-sm text-gray-600">Gray</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="emails">
            <Card>
              <CardHeader>
                <CardTitle>Email Templates</CardTitle>
                <CardDescription>Manage automated email templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="border rounded-lg p-3">
                    <p className="font-medium">Business Notification Email</p>
                    <p className="text-sm text-gray-500">Contact Form Submission</p>
                    <Badge className="mt-2">Active</Badge>
                  </div>
                  <div className="border rounded-lg p-3">
                    <p className="font-medium">Customer Thank You Email</p>
                    <p className="text-sm text-gray-500">Contact Form Response</p>
                    <Badge className="mt-2">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="components">
            <Card>
              <CardHeader>
                <CardTitle>Website Components</CardTitle>
                <CardDescription>Core components used throughout the website</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="border rounded-lg p-3">
                    <p className="font-medium">Hero Home</p>
                    <p className="text-sm text-gray-500">Layout component</p>
                    <Badge variant="outline" className="mt-2">
                      Layout
                    </Badge>
                  </div>
                  <div className="border rounded-lg p-3">
                    <p className="font-medium">Navigation</p>
                    <p className="text-sm text-gray-500">Layout component</p>
                    <Badge variant="outline" className="mt-2">
                      Layout
                    </Badge>
                  </div>
                  <div className="border rounded-lg p-3">
                    <p className="font-medium">Contact Form</p>
                    <p className="text-sm text-gray-500">Form component</p>
                    <Badge variant="outline" className="mt-2">
                      Forms
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="design">
            <Card>
              <CardHeader>
                <CardTitle>Design System</CardTitle>
                <CardDescription>Typography and style guidelines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Typography</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl font-bold text-primary">H1</span>
                        <span className="text-sm text-gray-600">Main headings</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold text-primary">H2</span>
                        <span className="text-sm text-gray-600">Section headings</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Components</h3>
                    <div className="flex flex-wrap gap-3">
                      <Button size="sm">Small</Button>
                      <Button>Default</Button>
                      <Button size="lg">Large</Button>
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
