"use client"

import type React from "react"
import { useState } from "react"
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import HeroSection from "@/components/hero-section"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    service: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", phone: "", message: "", service: "" })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="Get In Touch"
        description="Ready to start your fitness journey? Contact Emma today to book your free consultation."
        primaryButtonText="Call Now"
        primaryButtonHref="tel:07966874821"
        secondaryButtonText="Send Email"
        secondaryButtonHref="mailto:info@diva-fitness.co.uk"
        badge="Contact Emma"
      />

      {/* Studio Showcase Section */}
      <section className="py-10 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-secondary mb-3">Visit the Studio</h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Step into your personal fitness sanctuary - a purpose-built garden studio designed for your comfort and
            success
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative h-48 rounded-lg overflow-hidden">
            <Image src="/images/studio-exterior-full.jpg" alt="Studio Exterior View" fill className="object-cover" />
          </div>
          <div className="relative h-48 rounded-lg overflow-hidden">
            <Image src="/images/equipment-wide-shot.jpg" alt="Professional Equipment" fill className="object-cover" />
          </div>
          <div className="relative h-48 rounded-lg overflow-hidden">
            <Image src="/images/studio-emma-sitting.jpg" alt="Emma in the Studio" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-10 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="font-heading text-xl text-secondary">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="service" className="text-sm">
                    Interested In
                  </Label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) => setFormData({ ...formData, service: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-to-1">1-to-1 Personal Training</SelectItem>
                      <SelectItem value="group">Group Training</SelectItem>
                      <SelectItem value="nutrition">Nutrition Coaching</SelectItem>
                      <SelectItem value="consultation">Free Consultation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message" className="text-sm">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="mt-1"
                    placeholder="Tell Emma about your fitness goals and any questions you have..."
                  />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full bg-primary-dark hover:bg-primary">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>

                {submitStatus === "success" && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-green-800 text-sm">
                      Thank you for your message! Emma will get back to you within 24 hours.
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-800 text-sm">
                      Sorry, there was an error sending your message. Please try again or contact Emma directly.
                    </p>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="font-heading text-xl text-secondary">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-secondary text-sm">Phone</p>
                    <a href="tel:07966874821" className="text-primary hover:underline text-sm">
                      07966 874 821
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-secondary text-sm">Email</p>
                    <a href="mailto:info@diva-fitness.co.uk" className="text-primary hover:underline text-sm">
                      info@diva-fitness.co.uk
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-secondary text-sm">Location</p>
                    <p className="text-muted-foreground text-sm">Chester, UK</p>
                    <p className="text-xs text-muted-foreground">Exact address provided upon booking</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="font-heading text-xl text-secondary">Follow Emma</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-3">
                  <a
                    href="https://instagram.com/divafitnesschester"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors"
                  >
                    <Instagram className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href="https://facebook.com/DivaFitnessChester"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors"
                  >
                    <Facebook className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href="https://linkedin.com/in/emma-fisher"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors"
                  >
                    <Linkedin className="w-5 h-5 text-white" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="font-heading text-xl text-secondary">Opening Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-secondary text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>6:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>7:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>8:00 AM - 4:00 PM</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Flexible scheduling available. Evening and weekend sessions by appointment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-10 bg-muted">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="font-heading text-2xl font-bold text-secondary mb-3">Find the Studio</h2>
            <p className="text-muted-foreground text-sm">
              Located in Chester, UK - exact address provided upon booking
            </p>
          </div>

          <div className="h-80 bg-gray-200 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19234.858280955283!2d-2.9016!3d53.1906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487af0d6c7c0c0c0%3A0x0!2sChester%2C%20UK!5e0!3m2!1sen!2suk!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Diva Fitness Location - Chester, UK"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
