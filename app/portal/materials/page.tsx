"use client"

import { CleanPortalLayout } from "@/components/clean-portal-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Video, FileText, Download, Search, Filter, Play, Clock } from "lucide-react"

const trainingMaterials = [
  {
    id: 1,
    title: "Beginner's Guide to Strength Training",
    type: "PDF Guide",
    category: "Strength Training",
    duration: "15 min read",
    description: "Complete guide covering proper form, safety, and progression for beginners",
    downloadUrl: "#",
    isNew: true,
  },
  {
    id: 2,
    title: "Proper Squat Form Tutorial",
    type: "Video",
    category: "Technique",
    duration: "8 min",
    description: "Step-by-step video demonstration of proper squat technique",
    downloadUrl: "#",
    isNew: false,
  },
  {
    id: 3,
    title: "Nutrition Basics Worksheet",
    type: "PDF Worksheet",
    category: "Nutrition",
    duration: "10 min",
    description: "Interactive worksheet to help you plan balanced meals",
    downloadUrl: "#",
    isNew: true,
  },
  {
    id: 4,
    title: "Home Workout Routine",
    type: "Video Series",
    category: "Home Training",
    duration: "45 min",
    description: "Complete home workout routine requiring no equipment",
    downloadUrl: "#",
    isNew: false,
  },
]

const categories = ["All", "Strength Training", "Technique", "Nutrition", "Home Training", "Recovery"]

export default function MaterialsPage() {
  return (
    <CleanPortalLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Training Materials</h1>
            <p className="text-gray-600 mt-1">Access workout guides, videos, and educational resources</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search materials..." className="pl-10" />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={category === "All" ? "default" : "outline"}
              className="cursor-pointer hover:bg-pink-100 hover:text-pink-700"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Materials</p>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                  <p className="text-xs text-gray-500">Available</p>
                </div>
                <BookOpen className="h-8 w-8 text-pink-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Videos</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                  <p className="text-xs text-gray-500">Hours of content</p>
                </div>
                <Video className="h-8 w-8 text-pink-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Guides</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                  <p className="text-xs text-gray-500">PDF Resources</p>
                </div>
                <FileText className="h-8 w-8 text-pink-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">New This Week</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                  <p className="text-xs text-gray-500">Materials</p>
                </div>
                <Download className="h-8 w-8 text-pink-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainingMaterials.map((material) => (
            <Card key={material.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    {material.type.includes("Video") ? (
                      <Video className="h-5 w-5 text-pink-600" />
                    ) : (
                      <FileText className="h-5 w-5 text-pink-600" />
                    )}
                    <Badge variant="outline" className="text-xs">
                      {material.category}
                    </Badge>
                  </div>
                  {material.isNew && <Badge className="bg-pink-600 hover:bg-pink-700">New</Badge>}
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900 mt-2">{material.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{material.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {material.duration}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {material.type}
                  </Badge>
                </div>

                <div className="flex space-x-2">
                  {material.type.includes("Video") ? (
                    <Button size="sm" className="flex-1 bg-pink-600 hover:bg-pink-700">
                      <Play className="h-4 w-4 mr-2" />
                      Watch
                    </Button>
                  ) : (
                    <Button size="sm" className="flex-1 bg-pink-600 hover:bg-pink-700">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recently Accessed */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Recently Accessed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {trainingMaterials.slice(0, 3).map((material) => (
                <div
                  key={material.id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    {material.type.includes("Video") ? (
                      <Video className="h-5 w-5 text-pink-600" />
                    ) : (
                      <FileText className="h-5 w-5 text-pink-600" />
                    )}
                    <div>
                      <h4 className="font-medium text-gray-900">{material.title}</h4>
                      <p className="text-sm text-gray-500">
                        {material.category} • {material.duration}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Open
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </CleanPortalLayout>
  )
}
