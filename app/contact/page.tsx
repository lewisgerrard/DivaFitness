import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = {
  title: "Contact Diva Fitness",
  description:
    "Contact Diva Fitness for inquiries, personal training, and fitness classes. Get in touch with us today!",
}

export default function ContactPage() {
  return <ContactPageClient />
}
