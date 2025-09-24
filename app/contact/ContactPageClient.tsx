"use client"

import Container from "@/components/container"
import Section from "@/components/section"
import { ContactForm } from "@/components/contact-form"
import HeroPage from "@/components/hero-page"

const ContactPageClient = () => {
  return (
    <>
      <Section className="pt-0">
        <Container>
          <HeroPage
            title="Get In"
            subtitle="Touch"
            description="Ready to start your fitness journey? Contact Emma today to discuss your goals and book your consultation."
            primaryButtonText="Call Now"
            primaryButtonHref="tel:07966874821"
            secondaryButtonText="Send Message"
            secondaryButtonHref="mailto:info@diva-fitness.co.uk"
            badge="Contact Emma"
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <ContactForm />
        </Container>
      </Section>
    </>
  )
}

export default ContactPageClient
