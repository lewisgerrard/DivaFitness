"use client"

import { useState } from "react"
import { CleanPortalLayout } from "@/components/clean-portal-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, Save, Eye, ImageIcon, FileText, Palette } from "lucide-react"
import { toast } from "sonner"

// Mock data for content management
const pages = [
  {
    id: 1,
    name: "Homepage",
    path: "/",
    lastModified: "2024-01-10",
    status: "published",
  },
  {
    id: 2,
    name: "About",
    path: "/about",
    lastModified: "2024-01-08",
    status: "published",
  },
  {
    id: 3,
    name: "Services",
    path: "/services",
    lastModified: "2024-01-05",
    status: "draft",
  },
  {
    id: 4,
    name: "Contact",
    path: "/contact",
    lastModified: "2024-01-12",
    status: "published",
  },
]

const brandingSettings = {
  primaryColor: "#7c3aed",
  secondaryColor: "#a855f7",
  logoUrl: "/images/diva-logo.png",
  businessName: "Diva Fitness",
  tagline: "Transform Your Body, Transform Your Life",
  description: "Premium personal training and fitness coaching in a supportive environment.",
}

export default function ContentManagerPage() {
  const [selectedPage, setSelectedPage] = useState(pages[0])
  const [isEditing, setIsEditing] = useState(false)
  const [branding, setBranding] = useState(brandingSettings)

  const handleSavePage = () => {
    toast.success("Page updated successfully!")
    setIsEditing(false)
  }

  const handleSaveBranding = () => {
    toast.success("Branding updated successfully!")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Published</Badge>
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Draft</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <CleanPortalLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Content Manager</h1>
          <p className="text-gray-600">Manage your website content and branding</p>
        </div>

        <Tabs defaultValue="pages" className="space-y-6">
          <TabsList className="bg-purple-50 border-purple-200">
            <TabsTrigger value="pages" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Website Pages
            </TabsTrigger>
            <TabsTrigger value="branding" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Branding & Design
            </TabsTrigger>
            <TabsTrigger value="media" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Media Library
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pages" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Page List */}
              <Card className="lg:col-span-1 border-purple-100 shadow-sm">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-white border-b border-purple-100">
                  <CardTitle className="text-gray-900">Website Pages</CardTitle>
                  <CardDescription>Select a page to edit</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    {pages.map((page) => (
                      <div
                        key={page.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedPage.id === page.id
                            ? "bg-purple-100 border border-purple-200"
                            : "hover:bg-purple-50 border border-transparent"
                        }`}
                        onClick={() => setSelectedPage(page)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-gray-900">{page.name}</h3>
                          {getStatusBadge(page.status)}
                        </div>
                        <p className="text-sm text-gray-600">{page.path}</p>
                        <p className="text-xs text-gray-500">Modified: {page.lastModified}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Page Editor */}
              <Card className="lg:col-span-2 border-purple-100 shadow-sm">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-white border-b border-purple-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-gray-900">
                        <FileText className="w-5 h-5 text-purple-600" />
                        {selectedPage.name}
                      </CardTitle>
                      <CardDescription>{selectedPage.path}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      {isEditing ? (
                        <Button onClick={handleSavePage} size="sm" className="bg-purple-600 hover:bg-purple-700">
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                      ) : (
                        <Button
                          onClick={() => setIsEditing(true)}
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="page-title" className="text-gray-700">
                      Page Title
                    </Label>
                    <Input
                      id="page-title"
                      defaultValue={selectedPage.name}
                      disabled={!isEditing}
                      className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="page-content" className="text-gray-700">
                      Page Content
                    </Label>
                    <Textarea
                      id="page-content"
                      rows={12}
                      defaultValue="Edit your page content here..."
                      disabled={!isEditing}
                      className="font-mono text-sm border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="meta-description" className="text-gray-700">
                      Meta Description
                    </Label>
                    <Textarea
                      id="meta-description"
                      rows={2}
                      defaultValue="SEO meta description for this page..."
                      disabled={!isEditing}
                      className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="branding" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Brand Settings */}
              <Card className="border-purple-100 shadow-sm">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-white border-b border-purple-100">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Palette className="w-5 h-5 text-purple-600" />
                    Brand Identity
                  </CardTitle>
                  <CardDescription>Configure your brand colors and identity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="business-name" className="text-gray-700">
                      Business Name
                    </Label>
                    <Input
                      id="business-name"
                      value={branding.businessName}
                      onChange={(e) => setBranding({ ...branding, businessName: e.target.value })}
                      className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tagline" className="text-gray-700">
                      Tagline
                    </Label>
                    <Input
                      id="tagline"
                      value={branding.tagline}
                      onChange={(e) => setBranding({ ...branding, tagline: e.target.value })}
                      className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-gray-700">
                      Business Description
                    </Label>
                    <Textarea
                      id="description"
                      rows={3}
                      value={branding.description}
                      onChange={(e) => setBranding({ ...branding, description: e.target.value })}
                      className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="primary-color" className="text-gray-700">
                        Primary Color
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="primary-color"
                          value={branding.primaryColor}
                          onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                          className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                        />
                        <div
                          className="w-10 h-10 rounded border border-purple-200"
                          style={{ backgroundColor: branding.primaryColor }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secondary-color" className="text-gray-700">
                        Secondary Color
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="secondary-color"
                          value={branding.secondaryColor}
                          onChange={(e) => setBranding({ ...branding, secondaryColor: e.target.value })}
                          className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                        />
                        <div
                          className="w-10 h-10 rounded border border-purple-200"
                          style={{ backgroundColor: branding.secondaryColor }}
                        />
                      </div>
                    </div>
                  </div>
                  <Button onClick={handleSaveBranding} className="w-full bg-purple-600 hover:bg-purple-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save Branding
                  </Button>
                </CardContent>
              </Card>

              {/* Logo Management */}
              <Card className="border-purple-100 shadow-sm">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-white border-b border-purple-100">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <ImageIcon className="w-5 h-5 text-purple-600" />
                    Logo & Assets
                  </CardTitle>
                  <CardDescription>Manage your logo and brand assets</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 border-2 border-dashed border-purple-300 rounded-lg flex items-center justify-center bg-purple-50/30">
                      <img
                        src={branding.logoUrl || "/placeholder.svg"}
                        alt="Current Logo"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <Button variant="outline" className="border-purple-200 hover:bg-purple-50">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Upload New Logo
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700">Logo Variations</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-3 border border-purple-100 rounded-lg text-center bg-gradient-to-b from-white to-purple-50/30">
                        <div className="w-16 h-16 mx-auto mb-2 bg-gray-100 rounded flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                        </div>
                        <p className="text-xs text-gray-600">Light Version</p>
                      </div>
                      <div className="p-3 border border-purple-100 rounded-lg text-center bg-gradient-to-b from-white to-purple-50/30">
                        <div className="w-16 h-16 mx-auto mb-2 bg-gray-900 rounded flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-xs text-gray-600">Dark Version</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            <Card className="border-purple-100 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-white border-b border-purple-100">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <ImageIcon className="w-5 h-5 text-purple-600" />
                  Media Library
                </CardTitle>
                <CardDescription>Manage your website images and media files</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <div
                      key={item}
                      className="aspect-square border-2 border-dashed border-purple-300 rounded-lg flex items-center justify-center hover:border-purple-500 cursor-pointer bg-purple-50/30"
                    >
                      <ImageIcon className="w-8 h-8 text-purple-400" />
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Upload Media
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CleanPortalLayout>
  )
}
