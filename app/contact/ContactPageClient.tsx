"use client"

import Container from "@/components/container"
import Section from "@/components/section"
import { ContactForm } from "@/components/contact-form"

const ContactPageClient = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-purple-600 text-white py-20">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-medium">Contact Emma</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Get In <span className="block">Touch</span>
            </h1>

            <p className="text-xl text-white/90 mb-8">
              Ready to start your fitness journey? Contact Emma today to discuss your goals and book your consultation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="tel:07966874821"
                className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Call Now
              </a>
              <a
                href="mailto:info@diva-fitness.co.uk"
                className="border border-white text-white hover:bg-white hover:text-purple-600 font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Send Message
              </a>
            </div>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <ContactForm />
        </Container>
      </Section>
    </div>
  )
}

export default ContactPageClient
