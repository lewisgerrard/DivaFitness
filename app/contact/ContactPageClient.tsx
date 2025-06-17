"use client"

import HeroSection from "@/components/hero-section"
import ContactForm from "@/components/contact-form"
import GoogleMap from "@/components/google-map"
import { brandKit } from "@/lib/brand-kit"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactPageClient() {
  const scrollToForm = () => {
    const formSection = document.getElementById("contact-form-section")
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" })
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
        tertiaryButtonText="Message"
        tertiaryButtonOnClick={scrollToForm}
        badge="Contact Emma"
      />

      {/* Main Content Area */}
      <section className={`${brandKit.spacing.section.lg} bg-white`}>
        <div className={brandKit.components.section.container}>
          {/* Contact Form Section */}
          <div id="contact-form-section" className="mb-20">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-secondary mb-4">Send Us a Message</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Ready to transform your fitness journey? Fill out the form below and Emma will get back to you within 24
                hours.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
              <div>
                <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <ContactForm />
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    <GoogleMap />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Details Card */}
            <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-4 gap-8">
                  {/* Phone */}
                  <div className="text-center">
                    <div
                      className={`w-12 h-12 ${brandKit.gradients.primary} rounded-xl flex items-center justify-center mx-auto mb-4`}
                    >
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-heading font-semibold text-secondary mb-2">Phone</h3>
                    <a href="tel:07966874821" className="text-muted-foreground hover:text-primary transition-colors">
                      07966 874 821
                    </a>
                  </div>

                  {/* Email */}
                  <div className="text-center">
                    <div
                      className={`w-12 h-12 ${brandKit.gradients.primary} rounded-xl flex items-center justify-center mx-auto mb-4`}
                    >
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-heading font-semibold text-secondary mb-2">Email</h3>
                    <a
                      href="mailto:info@diva-fitness.co.uk"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      info@diva-fitness.co.uk
                    </a>
                  </div>

                  {/* Address */}
                  <div className="text-center">
                    <div
                      className={`w-12 h-12 ${brandKit.gradients.primary} rounded-xl flex items-center justify-center mx-auto mb-4`}
                    >
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-heading font-semibold text-secondary mb-2">Address</h3>
                    <p className="text-muted-foreground">
                      Chester, UK
                      <br />
                      <span className="text-sm">Exact address provided upon booking</span>
                    </p>
                  </div>

                  {/* Opening Times */}
                  <div className="text-center">
                    <div
                      className={`w-12 h-12 ${brandKit.gradients.primary} rounded-xl flex items-center justify-center mx-auto mb-4`}
                    >
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-heading font-semibold text-secondary mb-2">Opening Times</h3>
                    <div className="text-muted-foreground text-sm">
                      <p>Mon-Thu: 6AM-8PM</p>
                      <p>Fri: 6AM-7PM</p>
                      <p>Sat: 8AM-4PM</p>
                      <p>Sun: Closed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Studio Showcase */}
        </div>
      </section>
    </div>
  )
}
