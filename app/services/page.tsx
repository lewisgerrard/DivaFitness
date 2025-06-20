"use client"
import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { User, Clock, Heart, ArrowRight, Check, CreditCard, Users, Utensils, Trophy, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import HeroPage from "@/components/hero-page"

export default function ServicesPage() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-up")
          entry.target.classList.remove("opacity-0", "translate-y-8")
        }
      })
    }, observerOptions)

    const animatedElements = document.querySelectorAll(".animate-on-scroll")
    animatedElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const services = [
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
      content: null,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-accent/10 rounded-full animate-float-delayed" />
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-primary/3 rounded-full animate-float-slow" />
      </div>
      {/* Hero Section */}
      <HeroPage
        title="Transform Your Body."
        subtitle="Empower Your Mind."
        description="One-to-one coaching and small group sessions tailored exclusively for women."
        primaryButtonText="Book a Free Discovery Call"
        primaryButtonHref="/contact"
        secondaryButtonText="View Services"
        secondaryButtonHref="#services"
        badge="Women-Only Training"
      />

      {/* Introduction Section */}
      <section className="py-8 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-700 leading-relaxed">
              At Diva Fitness, I offer personalised training and nutrition services designed to help women feel
              stronger, healthier, and more confident. Whether you're new to fitness or looking to take your training to
              the next level, there's something here for you.
            </p>
          </div>
        </div>
      </section>

      {/* All Services */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`scroll-mt-20 animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50 rounded-3xl p-8"}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div
                  className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
                >
                  <div className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center hover:scale-110 hover:bg-primary/20 transition-all duration-300">
                          <service.icon className="w-6 h-6 text-primary" />
                        </div>
                        {service.premium && (
                          <Badge className="bg-primary text-white hover:scale-105 transition-transform duration-300">
                            Premium Package
                          </Badge>
                        )}
                      </div>

                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 hover:text-primary transition-colors duration-500">
                        {service.title}
                      </h2>

                      {service.price && (
                        <div className="text-3xl font-bold text-primary animate-pulse">{service.price}</div>
                      )}

                      <p className="text-base text-gray-600 leading-relaxed">{service.description}</p>

                      {service.features && (
                        <div className="flex flex-wrap gap-4 mt-4">
                          {service.features.map((feature, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 hover:scale-105 transition-transform duration-300"
                            >
                              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors duration-300">
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
                      <Button
                        size="lg"
                        className="bg-primary hover:bg-primary/90 rounded-xl px-8 hover:scale-105 hover:shadow-lg transition-all duration-300"
                        asChild
                      >
                        <Link href="/contact" className="flex items-center gap-2">
                          Book Now
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className={`relative ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                    <div className="relative h-80 md:h-96 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-500 group">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent group-hover:from-black/40 transition-all duration-500" />
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
              Ready to get started? Let's chat about your goals and how I can help.
            </h2>
            <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-xl px-8 py-6 text-lg" asChild>
              <Link href="/contact" className="flex items-center gap-2">
                Book Your Free Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
