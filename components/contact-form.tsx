"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
import { brandClasses } from "@/lib/brand-kit"

interface ContactFormData {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, service: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully. Emma will get back to you within 24 hours.",
        })
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        })
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Sorry, there was an error sending your message. Please try again or contact us directly.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-primary/20 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
        <CardTitle className="text-primary font-heading text-xl">Send me a message</CardTitle>
        <p className="text-muted-foreground text-sm">
          Ready to start your fitness journey? Fill out the form below and Emma will get back to you within 24 hours.
        </p>
      </CardHeader>
      <CardContent className="p-6">
        {submitStatus.type && (
          <Alert
            variant={submitStatus.type === "error" ? "destructive" : "default"}
            className={`mb-6 ${submitStatus.type === "success" ? "bg-green-50 border-green-200 text-green-800" : ""}`}
          >
            {submitStatus.type === "error" ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
            <AlertDescription>{submitStatus.message}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-secondary font-medium">
                Full Name *
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border-primary/20 focus:border-primary"
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-secondary font-medium">
                Email Address *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border-primary/20 focus:border-primary"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-secondary font-medium">
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="border-primary/20 focus:border-primary"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="service" className="text-secondary font-medium">
                Service Interest
              </Label>
              <Select value={formData.service} onValueChange={handleSelectChange}>
                <SelectTrigger className="border-primary/20 focus:border-primary">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free-consultation">Free Consultation</SelectItem>
                  <SelectItem value="1-to-1-training">1-to-1 Personal Training</SelectItem>
                  <SelectItem value="group-training">Group Training</SelectItem>
                  <SelectItem value="nutrition-coaching">Nutrition Coaching</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-secondary font-medium">
              Message *
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="border-primary/20 focus:border-primary resize-none"
              placeholder="Tell Emma about your fitness goals, any questions you have, or what you'd like to achieve..."
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className={`w-full ${brandClasses.buttonPrimary} text-base`}>
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending Message...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
