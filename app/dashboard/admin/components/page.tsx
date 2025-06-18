"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Component } from "lucide-react"

const components = [
  {
    title: "Hero Section",
    description: "Main hero component with background image and call-to-action",
  },
  {
    title: "Navigation",
    description: "Primary navigation component with responsive mobile menu",
  },
  {
    title: "Contact Form",
    description: "Contact form with validation and email integration",
  },
  {
    title: "Review Carousel",
    description: "Animated carousel displaying customer reviews and testimonials",
  },
  {
    title: "Service Card",
    description: "Individual service display card with image and description",
  },
  {
    title: "Footer",
    description: "Site footer with contact information and social links",
  },
  {
    title: "Image Gallery",
    description: "Responsive image gallery with lightbox functionality",
  },
  {
    title: "Studio Showcase",
    description: "Studio image showcase with before/after transformation",
  },
  {
    title: "CTA Section",
    description: "Call-to-action section with booking and contact buttons",
  },
  {
    title: "Opening Hours",
    description: "Business hours display component with current status",
  },
  {
    title: "Google Map",
    description: "Interactive Google Maps integration for location display",
  },
  {
    title: "Social Links",
    description: "Social media links component with icons and hover effects",
  },
]

export default function AdminComponentsPage() {
  return (
    <DashboardLayout
      title="Website Components"
      description="Manage and view all website components and their configurations"
      icon={Component}
      breadcrumbs={[{ label: "Admin", href: "/dashboard/admin" }, { label: "Components" }]}
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-purple-900">Component Library</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold text-purple-900">Title</TableHead>
                  <TableHead className="font-semibold text-purple-900">Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {components.map((component, index) => (
                  <TableRow key={index} className="hover:bg-purple-50">
                    <TableCell className="font-medium text-purple-800">{component.title}</TableCell>
                    <TableCell className="text-gray-700">{component.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
