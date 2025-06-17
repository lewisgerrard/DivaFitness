import Link from "next/link"
import { Instagram, Facebook, Linkedin, Phone, Mail, MapPin } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Image
                src="/logo-icon.png"
                alt="Diva Fitness"
                width={32}
                height={32}
                className="h-8 w-8 brightness-0 invert"
              />
              <span className="font-heading font-bold text-lg">Diva Fitness</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Empowering women to achieve their health and fitness goals in a supportive, private environment since
              2017.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://instagram.com/divafitnesschester"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://facebook.com/DivaFitnessChester"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Facebook className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://linkedin.com/in/emma-fisher"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-base font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-1">
              <li>
                <Link href="/" className="text-white/80 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/80 hover:text-white transition-colors text-sm">
                  About Emma
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white/80 hover:text-white transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-white/80 hover:text-white transition-colors text-sm">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-base font-semibold mb-3">Services</h4>
            <ul className="space-y-1 text-white/80 text-sm">
              <li>1-to-1 Personal Training</li>
              <li>Group Training</li>
              <li>Nutrition Coaching</li>
              <li>Cooking Sessions</li>
              <li>Free Consultations</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-base font-semibold mb-3">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-white" />
                <a href="tel:07966874821" className="text-white/80 hover:text-white transition-colors text-sm">
                  07966 874 821
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-white" />
                <a
                  href="mailto:info@diva-fitness.co.uk"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  info@diva-fitness.co.uk
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-white" />
                <span className="text-white/80 text-sm">Chester, UK</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-6 pt-4 text-center">
          <p className="text-white/80 text-sm">
            © {new Date().getFullYear()} Diva Fitness. All rights reserved. |
            <span className="text-white"> Designed with ❤️ for women's fitness</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
