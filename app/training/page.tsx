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
      title: "1:1 Personal Training",
      shortDescription: "Completely personalised training sessions designed around your unique goals.",
      description:
        "Experience completely personalised training sessions designed around your unique goals, fitness level, and preferences.",
      icon: User,
      image: "/images/action-training-session.jpg",
      price: "From £50 / 60 minute session",
      duration: "60 min sessions",
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
      title: "Personalised Fitness & Nutrition Session",
      shortDescription: "Comprehensive 2.5-hour session combining fitness, nutrition, and training.",
      description:
        "Like training alone but not seeing the results? This comprehensive 2.5-hour session will help get you back on track towards achieving your goals",
      icon: Heart,
      image: "/images/studio-emma-exterior.jpg",
      price: "£175 / 2.5 hours",
      duration: "2.5 hours",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">What's Included:</h3>
          <ul className="space-y-3">
            {[
              "30 min fitness assessment including body composition analysis",
              "Personalised training plan",
              "60 min nutrition consultation",
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
      title: "Train Together, Change Together",
      shortDescription: "Affordable training with built-in accountability in a supportive environment.",
      description:
        "Affordable training with built-in accountability. Train with like-minded women in a supportive small group environment.",
      icon: Users,
      image: "/images/studio-emma-doorway.jpg",
      price: "£25 / 60 mins",
      duration: "Per session",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">Schedule:</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-gray-700">Tuesdays – 17:30 & 19:00</span>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-gray-700">Thursday – 17:30 & 19:00</span>
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
      shortDescription: "Complete body and lifestyle transformation program over 12 weeks.",
      description: "A comprehensive program designed to completely transform your body and lifestyle over 12 weeks.",
      icon: Trophy,
      image: "/images/weights-close-up.jpg",
      price: "£999",
      duration: "12 weeks",
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
              "3 body comp. analysis",
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
      shortDescription: "Private studio hire for personal trainers or clients wanting space.",
      description:
        "Looking for a private place to train? The studio is availible for private hire for partners, friends or just for you.",
      icon: Home,
      image: "/images/studio-exterior-cropped.jpg",
      price: "£20",
      duration: "60 mins",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Perfect for personal trainers or clients who want private access to professional fitness equipment and
            space.
          </p>
          <div className="bg-primary/10 rounded-xl p-4">
            <p className="text-primary font-medium">Available: 07:00–20:00 daily</p>
          </div>
        </div>
      ),
    },
  ]

  const scrollToService = (serviceId: string) => {
    const element = document.getElementById(serviceId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroPage
        title="Personal Training"
        subtitle="Services"
        description="Personalised training sessions and comprehensive fitness programs designed exclusively for women."
        primaryButtonText="Book a Consultation"
        primaryButtonHref="/contact"
        secondaryButtonText="Nutrition Services"
        secondaryButtonHref="/nutrition"
        badge="Women-Only Training"
      />

      {/* Services Overview */}
      <section className="py-12 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose Your Training Journey</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                From one-to-one sessions to comprehensive transformation programs, find the perfect approach to reach
                your fitness goals.
              </p>
            </div>

            <div className="grid grid-cols-5 gap-6 items-stretch">
              {trainingServices.map((service) => (
                <Card
                  key={service.id}
                  className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden h-full"
                  onClick={() => scrollToService(service.id)}
                >
                  <CardContent className="p-6 text-center flex flex-col items-center justify-between h-full">
                    <div className="flex flex-col items-center flex-1 justify-start">
                      <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 flex-shrink-0">
                        <service.icon className="w-8 h-8 text-primary flex-shrink-0" />
                      </div>
                      <div className="h-20 flex items-start justify-center">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight text-center">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-24">
            {trainingServices.map((service, index) => (
              <div key={service.id} id={service.id} className="scroll-mt-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                          <service.icon className="w-6 h-6 text-primary" />
                        </div>
                        {service.premium && <Badge className="bg-primary text-white">Premium Package</Badge>}
                      </div>

                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{service.title}</h2>

                      <div className="flex items-center gap-4">
                        <div className="text-3xl font-bold text-primary">{service.price}</div>
                      </div>

                      <p className="text-lg text-gray-600 leading-relaxed">{service.description}</p>

                      {service.features && (
                        <div className="flex flex-wrap gap-3">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 bg-primary/10 rounded-full px-3 py-1">
                              <Check className="w-4 h-4 text-primary" />
                              <span className="text-sm font-medium text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {service.content && <div className="mt-8">{service.content}</div>}

                    <div className="pt-6">
                      <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-xl px-8" asChild>
                        <Link href="/contact" className="flex items-center gap-2">
                          Book Now
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
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

      {/* Payment Details */}
      <section className="py-12 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Payment Information</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">Advanced Book</h4>
                    <p className="text-sm text-gray-600">Training sessions must be paid for within 24hrs</p>
                  </div>
                  <div className="text-center">
                    <CreditCard className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">Payment Options</h4>
                    <p className="text-sm text-gray-600">Monthly payments available via bank transfer</p>
                  </div>
                  <div className="text-center">
                    <Check className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">Credit Card</h4>
                    <p className="text-sm text-gray-600">Available in person or by link</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to start your fitness journey?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Let's chat about your goals and how I can help you achieve them.
            </p>
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
