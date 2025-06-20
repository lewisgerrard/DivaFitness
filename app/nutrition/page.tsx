"use client"
import Link from "next/link"
import Image from "next/image"
import { Utensils, ArrowRight, Check, CreditCard, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import HeroPage from "@/components/hero-page"
import { useEffect, useRef } from "react"

export default function NutritionPage() {
  const nutritionServices = [
    {
      id: "nutrition",
      title: "Nutrition Coaching for Real Life",
      description: "Practical nutrition guidance tailored to your lifestyle, preferences, and goals.",
      icon: Utensils,
      image: "/images/studio-emma-sitting.jpg",
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Session</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Duration</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Price</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Add-ons</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900">Basic (Food diary review)</td>
                    <td className="px-4 py-3 text-gray-700">75 mins</td>
                    <td className="px-4 py-3 text-2xl font-bold text-primary">£65</td>
                    <td className="px-4 py-3 text-gray-700">-</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900">Advanced (Goal setting + full review)</td>
                    <td className="px-4 py-3 text-gray-700">2 hrs</td>
                    <td className="px-4 py-3 text-2xl font-bold text-primary">£99</td>
                    <td className="px-4 py-3 text-gray-700">Personalised Report: £45</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ),
    },
  ]

  const introSection = useRef(null)
  const servicesSection = useRef(null)
  const benefitsSection = useRef(null)
  const paymentSection = useRef(null)
  const ctaSection = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn")
          }
        })
      },
      {
        threshold: 0.1,
      },
    )

    if (introSection.current) observer.observe(introSection.current)
    if (servicesSection.current) observer.observe(servicesSection.current)
    if (benefitsSection.current) observer.observe(benefitsSection.current)
    if (paymentSection.current) observer.observe(paymentSection.current)
    if (ctaSection.current) observer.observe(ctaSection.current)

    return () => {
      if (introSection.current) observer.unobserve(introSection.current)
      if (servicesSection.current) observer.unobserve(servicesSection.current)
      if (benefitsSection.current) observer.unobserve(benefitsSection.current)
      if (paymentSection.current) observer.unobserve(paymentSection.current)
      if (ctaSection.current) observer.unobserve(ctaSection.current)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full filter blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-40 h-40 bg-secondary/10 rounded-full filter blur-xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-accent/10 rounded-full filter blur-xl animate-pulse"
          style={{ animationDelay: "3s" }}
        />
      </div>

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

      {/* Introduction Section */}
      <section ref={introSection} className="py-8 bg-gray-50/50 transition-opacity duration-500 opacity-0">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-700 leading-relaxed">
              Fuel your body with the right nutrition knowledge and support. My nutrition coaching services are designed
              to help you develop sustainable eating habits that complement your fitness journey and lifestyle.
            </p>
          </div>
        </div>
      </section>

      {/* Nutrition Services */}
      <section ref={servicesSection} className="py-8 transition-opacity duration-500 opacity-0">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-16">
            {nutritionServices.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`scroll-mt-20 ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50 rounded-3xl p-8"} transition-all duration-300 hover:scale-105`}
              >
                <div
                  className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
                >
                  <div className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                          <service.icon className="w-6 h-6 text-primary" />
                        </div>
                      </div>

                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{service.title}</h2>

                      {service.price && <div className="text-3xl font-bold text-primary">{service.price}</div>}

                      <p className="text-base text-gray-600 leading-relaxed">{service.description}</p>
                    </div>

                    {service.content && <div className="mt-6">{service.content}</div>}

                    <div className="pt-4">
                      <Button
                        size="lg"
                        className="bg-primary hover:bg-primary/90 rounded-xl px-8 transition-colors duration-300"
                        asChild
                      >
                        <Link href="/contact" className="flex items-center gap-2">
                          Book Now
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className={`relative ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                    <div className="relative h-80 md:h-96 rounded-3xl overflow-hidden shadow-xl">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nutrition Benefits Section */}
      <section ref={benefitsSection} className="py-12 bg-gray-50/50 transition-opacity duration-500 opacity-0">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Why Nutrition Matters</h2>
              <p className="text-lg text-gray-600">
                Proper nutrition is the foundation of any successful fitness journey. Here's how my approach helps:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Sustainable Habits</h3>
                    <p className="text-gray-600">
                      Build lasting eating habits that fit your lifestyle, not restrictive diets.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Personalized Approach</h3>
                    <p className="text-gray-600">
                      Tailored nutrition plans based on your goals, preferences, and lifestyle.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Education Focus</h3>
                    <p className="text-gray-600">
                      Learn the 'why' behind nutrition choices to make informed decisions.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Practical Solutions</h3>
                    <p className="text-gray-600">
                      Real-world strategies that work with busy schedules and family life.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Ongoing Support</h3>
                    <p className="text-gray-600">Continuous guidance and adjustments as your needs change.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Holistic Wellness</h3>
                    <p className="text-gray-600">Focus on overall health, not just weight loss or muscle gain.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Details */}
      <section ref={paymentSection} className="py-12 bg-white transition-opacity duration-500 opacity-0">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Important Notes:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Sessions must be paid for within 24 hours</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CreditCard className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Payment via bank transfer or card</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Card payments available in person or by link</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section ref={ctaSection} className="py-10 bg-primary/5 transition-opacity duration-500 opacity-0">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Ready to transform your relationship with food? Let's create a nutrition plan that works for you.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 rounded-xl px-8 py-6 text-lg transition-colors duration-300"
                asChild
              >
                <Link href="/contact" className="flex items-center gap-2">
                  Book Nutrition Consultation
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl px-8 py-6 text-lg hover:bg-gray-100 transition-colors duration-300"
                asChild
              >
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
