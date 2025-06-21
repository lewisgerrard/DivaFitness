import Link from "next/link"
import { Instagram, Facebook, Linkedin, Phone, Mail, MapPin } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-gray-50 text-secondary border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Image src="/diva-logo-fitness.png" alt="Diva Fitness" width={40} height={40} className="h-10 w-10" />
              <span className="font-heading font-bold text-lg text-secondary">Diva Fitness</span>
            </div>
            <p className="text-secondary/70 text-sm leading-relaxed">
              Empowering women to achieve their health and fitness goals in a supportive, private environment since
              2017.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://instagram.com/divafitnesschester"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors"
              >
                <Instagram className="w-4 h-4 text-primary" />
              </a>
              <a
                href="https://facebook.com/DivaFitnessChester"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors"
              >
                <Facebook className="w-4 h-4 text-primary" />
              </a>
              <a
                href="https://linkedin.com/in/emma-fisher"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-primary" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-base font-semibold mb-3 text-secondary">Quick Links</h4>
            <ul className="space-y-1">
              <li>
                <Link href="/" className="text-secondary/70 hover:text-secondary transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-secondary/70 hover:text-secondary transition-colors text-sm">
                  About Emma
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-secondary/70 hover:text-secondary transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-secondary/70 hover:text-secondary transition-colors text-sm">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-secondary/70 hover:text-secondary transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-base font-semibold mb-3 text-secondary">Services</h4>
            <ul className="space-y-1 text-secondary/70 text-sm">
              <li>1-to-1 Personal Training</li>
              <li>Group Training</li>
              <li>Nutrition Coaching</li>
              <li>Cooking Sessions</li>
              <li>Free Consultations</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-base font-semibold mb-3 text-secondary">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:07966874821" className="text-secondary/70 hover:text-secondary transition-colors text-sm">
                  07966 874 821
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary" />
                <a
                  href="mailto:info@diva-fitness.co.uk"
                  className="text-secondary/70 hover:text-secondary transition-colors text-sm"
                >
                  info@diva-fitness.co.uk
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-secondary/70 text-sm">Chester, UK</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-6 pt-4 text-center">
          <p className="text-secondary/70 text-sm">
            © {new Date().getFullYear()} Diva Fitness. All rights reserved. |
            <span className="text-secondary"> Designed with ❤️ for women's fitness</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
