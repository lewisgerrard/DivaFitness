"use client"

import HeroSection from "@/components/hero-section"
import ContactForm from "@/components/contact-form"
import StudioShowcase from "@/components/studio-showcase"
import SocialLinks from "@/components/social-links"
import OpeningHours from "@/components/opening-hours"
import GoogleMap from "@/components/google-map"
import { brandKit } from "@/lib/brand-kit"

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
            <div className="max-w-4xl mx-auto">
              <ContactForm />
            </div>
          </div>

          {/* Studio Showcase */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-secondary mb-4">Visit Our Studio</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Take a virtual tour of our beautiful garden studio space designed specifically for women's fitness.
              </p>
            </div>
            <StudioShowcase />
          </div>
        </div>
      </section>

      {/* Map and Hours Section */}
      <section className={`${brandKit.spacing.section.lg} ${brandKit.gradients.background}`}>
        <div className={brandKit.components.section.container}>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-secondary mb-4">Find Us & Visit</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Located in the heart of Chester with flexible hours to fit your lifestyle.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <OpeningHours />
            <GoogleMap />
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="bg-white py-16">
        <div className={brandKit.components.section.container}>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-secondary mb-4">Connect With Us</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Follow our journey and join our community for daily fitness tips and inspiration.
            </p>
          </div>
          <SocialLinks />
        </div>
      </section>
    </div>
  )
}
