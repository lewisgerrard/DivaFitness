"use client"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Check, Apple, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import HeroPage from "@/components/hero-page"

export default function NutritionPage() {
  const nutritionServices = [
    {
      id: "basic-nutrition",
      title: "Basic Nutrition Review",
      shortDescription: "Food diary review and basic nutrition guidance for everyday wellness.",
      description:
        "A focused 75-minute session reviewing your current eating habits and providing practical nutrition guidance.",
      icon: Apple,
      image: "/images/nutrition-pantry.jpg",
      price: "£65",
      duration: "75 mins",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">What's Included:</h3>
          <ul className="space-y-3">
            {[
              "Comprehensive food diary review",
              "Nutritional habit assessment",
              "Practical eating recommendations",
              "Lifestyle-based nutrition tips",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: "advanced-nutrition",
      title: "Advanced Nutrition Coaching",
      shortDescription: "Comprehensive nutrition coaching with goal setting and detailed review.",
      description:
        "An in-depth 2-hour session combining goal setting, comprehensive nutrition review, and personalized planning.",
      icon: BookOpen,
      image: "/images/journey-complete.jpg",
      price: "£99",
      duration: "2 hours",
      addOn: "Personalised Report: £45",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">What's Included:</h3>
          <ul className="space-y-3">
            {[
              "Detailed goal setting session",
              "Complete nutritional assessment",
              "Personalized meal planning guidance",
              "Lifestyle integration strategies",
              "Follow-up recommendations",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
          <div className="bg-primary/10 rounded-xl p-4 mt-4">
            <p className="text-primary font-medium">Optional Add-on: Personalised Report (£45)</p>
            <p className="text-sm text-gray-600 mt-1">Detailed written report with your personalized nutrition plan</p>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-[#fefcff]">
      {/* Hero Section */}
      <HeroPage
        title="Nutrition Coaching"
        subtitle="& Wellness Support"
        description="Practical nutrition guidance and wellness support tailored to your lifestyle and goals."
        primaryButtonText="Book a Nutrition Consultation"
        primaryButtonHref="/contact"
        secondaryButtonText="View Training"
        secondaryButtonHref="/training"
        badge="Personalized Nutrition"
      />

      {/* Service Details */}
      <section className="py-16 bg-[#fefcff]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-24">
            {nutritionServices.map((service, index) => (
              <div key={service.id} id={service.id} className="scroll-mt-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                          <service.icon className="w-6 h-6 text-primary" />
                        </div>
                      </div>

                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{service.title}</h2>

                      <div className="flex items-center gap-4">
                        <div className="text-3xl font-bold text-primary">{service.price}</div>
                        <div className="text-gray-600">• {service.duration}</div>
                      </div>

                      <p className="text-lg text-gray-600 leading-relaxed">{service.description}</p>
                    </div>

                    {service.content && <div className="mt-8">{service.content}</div>}
                  </div>

                  <div className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-[#fefcff]">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to transform your relationship with food?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Let's create a nutrition plan that works for you and your lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-xl px-8 py-6 text-lg" asChild>
                <Link href="/contact" className="flex items-center gap-2">
                  Book Nutrition Consultation
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl px-8 py-6 text-lg bg-transparent" asChild>
                <Link href="/training" className="flex items-center gap-2">
                  View Training Services
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
