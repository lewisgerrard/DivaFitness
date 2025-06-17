"use client"

import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Copy, Download } from "lucide-react"
import { Card } from "@/components/ui/card"
import HeroSection from "@/components/hero-section"

const templateData = {
  "customer-thank-you": {
    title: "Customer Thank You Email",
    description: "Sent to customers after form submission",
    category: "Customer Communication",
    code: `import { Html, Head, Body, Container, Text, Button } from '@react-email/components'

export default function CustomerThankYou({ name }: { name: string }) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'Arial, sans-serif' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
          <Text style={{ fontSize: '24px', fontWeight: 'bold', color: '#8B5CF6' }}>
            Thank you, {name}!
          </Text>
          <Text style={{ fontSize: '16px', lineHeight: '1.5', color: '#374151' }}>
            We've received your message and will get back to you within 24 hours.
          </Text>
          <Button
            href="https://divafitness.com"
            style={{
              backgroundColor: '#8B5CF6',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '6px',
              textDecoration: 'none'
            }}
          >
            Visit Our Website
          </Button>
        </Container>
      </Body>
    </Html>
  )
}`,
    preview: (
      <div className="max-w-md mx-auto bg-white border rounded-lg p-6">
        <h2 className="text-2xl font-bold text-purple-600 mb-4">Thank you, John!</h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          We've received your message and will get back to you within 24 hours.
        </p>
        <div className="inline-block bg-purple-600 text-white px-6 py-3 rounded-md">Visit Our Website</div>
      </div>
    ),
  },
  "business-notification": {
    title: "Business Notification Email",
    description: "Internal notification for new contact submissions",
    category: "Internal Notifications",
    code: `import { Html, Head, Body, Container, Text, Section } from '@react-email/components'

export default function BusinessNotification({ 
  name, email, phone, message 
}: {
  name: string
  email: string
  phone?: string
  message: string
}) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'Arial, sans-serif' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
          <Text style={{ fontSize: '24px', fontWeight: 'bold', color: '#DC2626' }}>
            New Contact Form Submission
          </Text>
          <Section style={{ backgroundColor: '#F9FAFB', padding: '20px', borderRadius: '8px' }}>
            <Text><strong>Name:</strong> {name}</Text>
            <Text><strong>Email:</strong> {email}</Text>
            {phone && <Text><strong>Phone:</strong> {phone}</Text>}
            <Text><strong>Message:</strong></Text>
            <Text style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px' }}>
              {message}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}`,
    preview: (
      <div className="max-w-md mx-auto bg-white border rounded-lg p-6">
        <h2 className="text-2xl font-bold text-red-600 mb-4">New Contact Form Submission</h2>
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <p>
            <strong>Name:</strong> Emma Fisher
          </p>
          <p>
            <strong>Email:</strong> emma@example.com
          </p>
          <p>
            <strong>Phone:</strong> +44 7123 456789
          </p>
          <p>
            <strong>Message:</strong>
          </p>
          <div className="bg-white p-3 rounded border">
            I'm interested in personal training sessions. Could you please provide more information about your packages?
          </div>
        </div>
      </div>
    ),
  },
}

export default function EmailTemplatePage({ params }: { params: { id: string } }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [copied, setCopied] = useState(false)

  const template = templateData[params.id as keyof typeof templateData]

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/dashboard")
    }
  }, [user, loading, router])

  const copyToClipboard = async () => {
    if (template) {
      await navigator.clipboard.writeText(template.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

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

  if (!user || user.role !== "admin" || !template) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      <HeroSection title={template.title} description={template.description} badge={template.category} />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Back Button */}
          <div className="mb-8">
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              <Link href="/admin/email-templates" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Templates
              </Link>
            </Button>
          </div>

          {/* Template View */}
          <div className="grid lg:grid-cols-2 gap-8 h-[calc(100vh-300px)]">
            {/* Code Side */}
            <Card className="border-primary/20 overflow-hidden shadow-lg">
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-6 border-b border-primary/20 flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-xl text-primary">Template Code</h3>
                  <p className="text-sm text-muted-foreground">React Email component source</p>
                </div>
                <div className="flex gap-3">
                  <Button size="sm" variant="outline" onClick={copyToClipboard} className="border-primary/20">
                    <Copy className="w-4 h-4 mr-2" />
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                  <Button size="sm" variant="outline" className="border-primary/20">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
              <div className="p-0 bg-gray-900 text-green-400 font-mono text-sm overflow-auto h-full">
                <pre className="whitespace-pre-wrap p-6">{template.code}</pre>
              </div>
            </Card>

            {/* Preview Side */}
            <Card className="border-primary/20 overflow-hidden shadow-lg">
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-6 border-b border-primary/20">
                <h3 className="font-heading font-bold text-xl text-primary">Email Preview</h3>
                <p className="text-sm text-muted-foreground">How this email appears to recipients</p>
              </div>
              <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 h-full overflow-auto flex items-center justify-center">
                {template.preview}
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
