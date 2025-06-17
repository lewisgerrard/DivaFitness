"use client"

import { Mail, Globe, Layers, Palette } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function SettingsCardsGrid() {
  const router = useRouter()

  /** Card meta-data so adding new cards later is trivial */
  const cards = [
    {
      icon: Mail,
      title: "Email Templates",
      description: "Create and manage email templates for client communications",
      href: "/admin/email-templates",
    },
    {
      icon: Globe,
      title: "Website Structure",
      description: "Configure website content, navigation, and settings",
      href: "/admin/page-structure",
    },
    {
      icon: Layers,
      title: "Components",
      description: "Manage reusable UI components and design elements",
      href: "/admin/components",
    },
    {
      icon: Palette,
      title: "Branding",
      description: "Configure brand colors, fonts, and visual identity",
      href: "/admin/branding",
    },
  ]

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl">
      {cards.map(({ icon: Icon, title, description, href }) => (
        <div key={title} className="bg-white rounded-3xl shadow-lg p-8 border border-pink-100 flex flex-col h-full">
          <div className="text-center flex-1 flex flex-col">
            <div className="w-20 h-20 bg-pink-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Icon className="w-10 h-10 text-pink-500" />
            </div>

            <h3 className="text-2xl font-bold text-pink-600 mb-4">{title}</h3>

            <p className="text-gray-600 mb-8 text-base leading-relaxed flex-1">{description}</p>

            <Button
              onClick={() => router.push(href)}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-2xl text-base transition-all duration-200 mt-auto"
            >
              {title.startsWith("Manage") ? title : `Manage ${title}`}
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
