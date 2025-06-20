"use client"
import type { Metadata } from "next"

import Container from "@/components/container"
import Section from "@/components/section"
import { ContactForm } from "@/components/contact-form"
import HeroPage from "@/components/hero-page"

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Emma at Diva Fitness",
}

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
            secondaryButtonText="Send Email"
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
