"use client"
import Link from "next/link"
import Image from "next/image"
import { User, Clock, Heart, ArrowRight, Check, CreditCard, Users, Trophy, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import HeroPage from "@/components/hero-page"

export default function TrainingPage() {
  const trainingServices = [
    {
      id: "personal-training",
      title: "One-to-One Personal Training",
      description:
        "Experience completely personalised training sessions designed around your unique goals, fitness level, and preferences.",
      icon: User,
      image: "/images/action-training-session.jpg",
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Package</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Price (Full)</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Monthly Option</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900">6 x 60 min</td>
                    <td className="px-4 py-3 text-2xl font-bold text-primary">£350</td>
                    <td className="px-4 py-3 text-gray-700">£180 x 2 months*</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900">12 x 60 min</td>
                    <td className="px-4 py-3 text-2xl font-bold text-primary">£650</td>
                    <td className="px-4 py-3 text-gray-700">£225 x 3 months*</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900">25 x 60 min</td>
                    <td className="px-4 py-3 text-2xl font-bold text-primary">£1250</td>
                    <td className="px-4 py-3 text-gray-700">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="text-center text-sm text-gray-600">*Monthly payments due on the 1st of each month.</div>
        </div>
      ),
      features: ["Complete Privacy", "Tailored Coaching", "Female-Led Space"],
    },
    {
      id: "wellness-session",
      title: "Ultimate Personalised Wellness Session",
      description:
        "A comprehensive 2.5-hour session that combines fitness assessment, nutrition consultation, and personalized training.",
      icon: Heart,
      image: "/images/studio-emma-exterior.jpg",
      price: "£175",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">What's Included:</h3>
          <ul className="space-y-3">
            {[
              "Fitness assessment",
              "Personalised training plan",
              "45 min nutrition consultation",
              "60 min weight training intro (form & technique)",
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
      id: "group-training",
      title: "Train Together, Grow Together",
      description:
        "Affordable training with built-in accountability. Train with like-minded women in a supportive environment.",
      icon: Users,
      image: "/images/studio-emma-doorway.jpg",
      price: "£30/session",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">Schedule:</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-gray-700">Tuesdays & Thursdays – 7:00pm</span>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-gray-700">Wednesdays – 7:00am</span>
            </li>
          </ul>
          <div className="bg-primary/10 rounded-xl p-4">
            <p className="text-primary font-medium">Note: Max 3 people per session</p>
          </div>
        </div>
      ),
    },
    {
      id: "transformation",
      title: "The 12-Week Transformation",
      description: "A comprehensive program designed to completely transform your body and lifestyle over 12 weeks.",
      icon: Trophy,
      image: "/images/weights-close-up.jpg",
      price: "£999",
      premium: true,
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">What's Included:</h3>
          <ul className="grid md:grid-cols-2 gap-3">
            {[
              "Online assessment",
              "45 min discovery call",
              "2hr nutrition session + custom report",
              "12 PT sessions",
              "Monthly check-ins",
              "3 body comp. analyses",
              "Final 1:1 review session",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-0.5">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: "studio-hire",
      title: "Hire My Studio",
      description: "Private hire available between 6:45–7:00am for PTs or clients wanting space.",
      icon: Home,
      image: "/images/studio-exterior-cropped.jpg",
      price: "£15/45mins",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Perfect for personal trainers or clients who want private access to professional fitness equipment and
            space.
          </p>
          <div className="bg-primary/10 rounded-xl p-4">
            <p className="text-primary font-medium">Available: 6:45–7:00am daily</p>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroPage
        title="Personal Training"
        subtitle="& Fitness Programs"
        description="Personalised training sessions and comprehensive fitness programs designed exclusively for women."
        primaryButtonText="Book a Free Discovery Call"
        primaryButtonHref="/contact"
        secondaryButtonText="View Nutrition"
        secondaryButtonHref="/nutrition"
        badge="Women-Only Training"
      />

      {/* Introduction Section */}
      <section className="py-8 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-700 leading-relaxed">
              Transform your body with personalised training programs designed specifically for women. From one-to-one
              sessions to small group training, find the perfect approach to reach your fitness goals in a supportive,
              female-led environment.
            </p>
          </div>
        </div>
      </section>

      {/* Training Services */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-16">
            {trainingServices.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`scroll-mt-20 ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50 rounded-3xl p-8"}`}
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
                        {service.premium && <Badge className="bg-primary text-white">Premium Package</Badge>}
                      </div>

                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{service.title}</h2>

                      {service.price && <div className="text-3xl font-bold text-primary">{service.price}</div>}

                      <p className="text-base text-gray-600 leading-relaxed">{service.description}</p>

                      {service.features && (
                        <div className="flex flex-wrap gap-4 mt-4">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                <Check className="w-4 h-4 text-primary" />
                              </div>
                              <span className="text-sm font-medium text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {service.content && <div className="mt-6">{service.content}</div>}

                    <div className="pt-4">
                      <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-xl px-8" asChild>
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

      {/* Payment Details */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Booking & Payment</h2>
            </div>

            <Card className="border-0 shadow-lg">
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
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Bank Details:</h3>
                    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bank:</span>
                        <span className="font-medium text-gray-900">Santander</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sort Code:</span>
                        <span className="font-medium text-gray-900">09-06-66</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Account:</span>
                        <span className="font-medium text-gray-900">42233950</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-10 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Ready to start your fitness journey? Let's chat about your goals and how I can help.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-xl px-8 py-6 text-lg" asChild>
                <Link href="/contact" className="flex items-center gap-2">
                  Book Your Free Consultation
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl px-8 py-6 text-lg" asChild>
                <Link href="/nutrition" className="flex items-center gap-2">
                  View Nutrition Services
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
