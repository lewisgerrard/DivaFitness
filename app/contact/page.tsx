import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = {
  title: "Contact - Diva Fitness",
  description: "Contact Emma at Diva Fitness",
}

export default function ContactPage() {
  return <ContactPageClient />
}
