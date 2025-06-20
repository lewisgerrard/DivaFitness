import { Instagram, Facebook, Linkedin, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const socialLinks = [
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/divafitnesschester",
    description: "Follow our daily fitness tips and client transformations",
    color: "from-pink-500 to-purple-600",
  },
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://facebook.com/DivaFitnessChester",
    description: "Join our community and stay updated with events",
    color: "from-blue-600 to-blue-700",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/in/emma-fisher",
    description: "Connect with Emma professionally",
    color: "from-blue-700 to-blue-800",
  },
]

export function SocialLinks() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {socialLinks.map((social) => (
        <Card
          key={social.name}
          className="border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <CardContent className="p-6 text-center">
            <a href={social.href} target="_blank" rel="noopener noreferrer" className="block">
              <div
                className={`w-12 h-12 bg-gradient-to-r ${social.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <social.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="font-heading font-semibold text-secondary mb-2 group-hover:text-primary transition-colors duration-300 flex items-center justify-center gap-2">
                {social.name}
                <ExternalLink className="w-4 h-4" />
              </h3>

              <p className="text-sm text-muted-foreground group-hover:text-secondary transition-colors duration-300">
                {social.description}
              </p>
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default SocialLinks
