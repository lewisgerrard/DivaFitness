import type React from "react"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { brandKit } from "@/lib/brand-kit"

interface ContactInfoProps {
  title: string
  content: string
  icon?: "phone" | "email" | "address" | "hours"
  href?: string
}

const iconMap = {
  phone: Phone,
  email: Mail,
  address: MapPin,
  hours: Clock,
}

export default function ContactInfo({ title, content, icon = "phone", href }: ContactInfoProps) {
  const IconComponent = iconMap[icon]

  const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
    if (href) {
      return (
        <a
          href={href}
          className="block hover:text-primary transition-colors duration-300"
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      )
    }
    return <div>{children}</div>
  }

  return (
    <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 group">
      <CardContent className="p-6 text-center">
        <div
          className={`w-12 h-12 ${brandKit.gradients.primary} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
        >
          <IconComponent className="w-6 h-6 text-white" />
        </div>

        <h3 className="font-heading font-semibold text-secondary mb-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>

        <ContentWrapper>
          <p className="text-muted-foreground group-hover:text-secondary transition-colors duration-300">{content}</p>
        </ContentWrapper>
      </CardContent>
    </Card>
  )
}
