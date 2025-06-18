"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Component, X, Copy, Eye } from "lucide-react"
import { useState } from "react"
import { HeroSection } from "@/components/hero-section"
import { Navigation } from "@/components/navigation"
import { ContactForm } from "@/components/contact-form"
import ReviewCarousel from "@/components/review-carousel"
import { ServiceCard } from "@/components/service-card"
import { Footer } from "@/components/footer"
import { ImageGallery } from "@/components/image-gallery"
import StudioShowcase from "@/components/studio-showcase"
import { CTASection } from "@/components/cta-section"
import { OpeningHours } from "@/components/opening-hours"
import { GoogleMap } from "@/components/google-map"
import { SocialLinks } from "@/components/social-links"

const components = [
  {
    title: "Hero Section",
    description: "Main hero component with background image and call-to-action",
    code: `import { HeroSection } from "@/components/hero-section"

export default function HomePage() {
  return (
    <HeroSection 
      title="Transform Your Body, Transform Your Life"
      subtitle="Personal training that delivers real results"
      ctaText="Book Your Session"
      ctaLink="/contact"
    />
  )
}`,
    component: (
      <HeroSection
        title="Transform Your Body"
        subtitle="Personal training that delivers results"
        ctaText="Book Session"
        ctaLink="/contact"
      />
    ),
  },
  {
    title: "Navigation",
    description: "Primary navigation component with responsive mobile menu",
    code: `import { Navigation } from "@/components/navigation"

export default function Layout() {
  return (
    <>
      <Navigation />
      {/* Page content */}
    </>
  )
}`,
    component: <Navigation />,
  },
  {
    title: "Contact Form",
    description: "Contact form with validation and email integration",
    code: `import { ContactForm } from "@/components/contact-form"

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <ContactForm />
    </div>
  )
}`,
    component: (
      <div className="max-w-md">
        <ContactForm />
      </div>
    ),
  },
  {
    title: "Review Carousel",
    description: "Animated carousel displaying customer reviews and testimonials",
    code: `import ReviewCarousel from "@/components/review-carousel"

export default function TestimonialsSection() {
  return (
    <section className="py-16">
      <ReviewCarousel />
    </section>
  )
}`,
    component: <ReviewCarousel />,
  },
  {
    title: "Service Card",
    description: "Individual service display card with image and description",
    code: `import { ServiceCard } from "@/components/service-card"

export default function ServicesGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ServiceCard 
        title="Personal Training"
        description="One-on-one sessions tailored to your goals"
        image="/images/personal-training.jpg"
        price="£60/session"
      />
    </div>
  )
}`,
    component: (
      <ServiceCard
        title="Personal Training"
        description="One-on-one sessions"
        image="/images/action-training-session.jpg"
        price="£60"
      />
    ),
  },
  {
    title: "Footer",
    description: "Site footer with contact information and social links",
    code: `import { Footer } from "@/components/footer"

export default function Layout() {
  return (
    <>
      {/* Page content */}
      <Footer />
    </>
  )
}`,
    component: <Footer />,
  },
  {
    title: "Image Gallery",
    description: "Responsive image gallery with lightbox functionality",
    code: `import { ImageGallery } from "@/components/image-gallery"

const images = [
  { src: "/images/studio1.jpg", alt: "Studio view 1" },
  { src: "/images/studio2.jpg", alt: "Studio view 2" },
]

export default function GalleryPage() {
  return <ImageGallery images={images} />
}`,
    component: (
      <ImageGallery
        images={[
          { src: "/images/studio-exterior-full.jpg", alt: "Studio exterior" },
          { src: "/images/equipment-wide-shot.jpg", alt: "Equipment" },
        ]}
      />
    ),
  },
  {
    title: "Studio Showcase",
    description: "Studio image showcase with before/after transformation",
    code: `import StudioShowcase from "@/components/studio-showcase"

export default function AboutPage() {
  return (
    <section className="py-16">
      <StudioShowcase />
    </section>
  )
}`,
    component: <StudioShowcase />,
  },
  {
    title: "CTA Section",
    description: "Call-to-action section with booking and contact buttons",
    code: `import { CTASection } from "@/components/cta-section"

export default function HomePage() {
  return (
    <>
      {/* Other sections */}
      <CTASection 
        title="Ready to Start Your Journey?"
        subtitle="Book your consultation today"
      />
    </>
  )
}`,
    component: <CTASection title="Ready to Start?" subtitle="Book your consultation" />,
  },
  {
    title: "Opening Hours",
    description: "Business hours display component with current status",
    code: `import { OpeningHours } from "@/components/opening-hours"

export default function ContactPage() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <OpeningHours />
      {/* Other contact info */}
    </div>
  )
}`,
    component: <OpeningHours />,
  },
  {
    title: "Google Map",
    description: "Interactive Google Maps integration for location display",
    code: `import { GoogleMap } from "@/components/google-map"

export default function LocationPage() {
  return (
    <div className="h-96">
      <GoogleMap />
    </div>
  )
}`,
    component: (
      <div className="h-48">
        <GoogleMap />
      </div>
    ),
  },
  {
    title: "Social Links",
    description: "Social media links component with icons and hover effects",
    code: `import { SocialLinks } from "@/components/social-links"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-8">
      <SocialLinks />
    </footer>
  )
}`,
    component: <SocialLinks />,
  },
]

export default function AdminComponentsPage() {
  const [selectedComponent, setSelectedComponent] = useState<(typeof components)[0] | null>(null)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

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
                  <TableRow
                    key={index}
                    className="hover:bg-purple-50 cursor-pointer"
                    onClick={() => setSelectedComponent(component)}
                  >
                    <TableCell className="font-medium text-purple-800">{component.title}</TableCell>
                    <TableCell className="text-gray-700">{component.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={!!selectedComponent} onOpenChange={() => setSelectedComponent(null)}>
          <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span className="text-purple-900">{selectedComponent?.title}</span>
                <Button variant="ghost" size="sm" onClick={() => setSelectedComponent(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </DialogTitle>
            </DialogHeader>

            {selectedComponent && (
              <div className="grid grid-cols-2 gap-6 h-[70vh]">
                {/* Code Panel */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-purple-900 flex items-center gap-2">
                      <Component className="h-5 w-5" />
                      Code
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(selectedComponent.code)}
                      className="border-purple-200 text-purple-700 hover:bg-purple-50"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <div className="flex-1 bg-gray-900 rounded-lg p-4 overflow-auto">
                    <pre className="text-sm text-gray-100">
                      <code>{selectedComponent.code}</code>
                    </pre>
                  </div>
                </div>

                {/* Preview Panel */}
                <div className="flex flex-col">
                  <div className="flex items-center mb-4">
                    <h3 className="text-lg font-semibold text-purple-900 flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Preview
                    </h3>
                  </div>
                  <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4 overflow-auto">
                    <div className="scale-75 origin-top-left w-[133%] h-[133%]">{selectedComponent.component}</div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
