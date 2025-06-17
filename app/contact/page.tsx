import type { Metadata } from "next"
import HeroSection from "@/components/hero-section"
import ContactForm from "@/components/contact-form"
import StudioShowcase from "@/components/studio-showcase"
import ContactInfo from "@/components/contact-info"
import SocialLinks from "@/components/social-links"
import OpeningHours from "@/components/opening-hours"
import GoogleMap from "@/components/google-map"
import { brandKit } from "@/lib/brand-kit"

export const metadata: Metadata = {
  title: "Contact Diva Fitness",
  description:
    "Contact Diva Fitness for inquiries, personal training, and fitness classes. Get in touch with us today!",
}

export default function ContactPage() {
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
        tertiaryButtonText="View Services"
        tertiaryButtonHref="/services#packages"
        badge="Contact Emma"
      />

      {/* Main Content */}
      <section className={`${brandKit.spacing.section.md} ${brandKit.gradients.background}`}>
        <div className={brandKit.components.section.container}>
          {/* Contact Form and Studio Showcase */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <div>
              <ContactForm />
            </div>
            <div>
              <StudioShowcase />
            </div>
          </div>

          {/* Contact Information Grid */}
          <div className="mb-16">
            <div className={brandKit.components.section.header}>
              <h2 className="font-heading text-2xl font-bold text-secondary mb-8">Contact Information</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ContactInfo title="Phone" content="07966 874 821" icon="phone" href="tel:07966874821" />
              <ContactInfo
                title="Email"
                content="info@diva-fitness.co.uk"
                icon="email"
                href="mailto:info@diva-fitness.co.uk"
              />
              <ContactInfo title="Location" content="Chester, UK" icon="address" />
              <ContactInfo title="Response Time" content="Within 24 hours" icon="hours" />
            </div>
          </div>

          {/* Social Links */}
          <div className="mb-16">
            <div className={brandKit.components.section.header}>
              <h2 className="font-heading text-2xl font-bold text-secondary mb-8">Follow Us</h2>
            </div>
            <SocialLinks />
          </div>

          {/* Opening Hours and Map */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <OpeningHours />
            </div>
            <div>
              <GoogleMap />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
