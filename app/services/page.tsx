"use client"
import Link from "next/link"
import Image from "next/image"
import { User, Users, Leaf, Clock, Target, Heart, ArrowRight, Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import HeroPage from "@/components/hero-page"

export default function ServicesPage() {
  const services = [
    {
      icon: User,
      title: "1-to-1 Personal Training",
      description:
        "Completely personalised training sessions designed around your goals, fitness level, and preferences.",
      features: [
        "Customised workout plans",
        "Form correction and technique guidance",
        "Progress tracking and adjustments",
        "Flexible scheduling",
        "Full attention and support",
      ],
      duration: "45-60 minutes per session",
      image: "/images/action-training-session.jpg",
      color: "from-primary to-primary-light",
    },
    {
      icon: Users,
      title: "Small Group Training",
      description:
        "Train with friends or meet like-minded women in our supportive small group sessions (max 4 people).",
      features: [
        "Shared motivation and support",
        "Cost-effective training option",
        "Social fitness experience",
        "Varied and fun workouts",
        "Build lasting friendships",
      ],
      duration: "60 minutes per session",
      image: "/images/studio-emma-doorway.jpg",
      color: "from-primary-light to-primary",
    },
    {
      icon: Leaf,
      title: "Nutrition Coaching",
      description: "Comprehensive nutritional guidance including meal planning and interactive cooking sessions.",
      features: [
        "Personalised meal plans",
        "Interactive cooking sessions",
        "Nutritional education",
        "Sustainable habit formation",
        "Recipe development",
      ],
      duration: "Ongoing support",
      image: "/images/studio-emma-sitting.jpg",
      color: "from-primary to-primary-dark",
    },
  ]

  const packages = [
    {
      name: "Starter Package",
      sessions: "4 sessions",
      price: "Perfect for beginners",
      features: [
        "Initial consultation and assessment",
        "4 x 1-to-1 training sessions",
        "Basic nutrition guidance",
        "Workout plan to take home",
      ],
      popular: false,
      color: "from-primary to-primary-light",
    },
    {
      name: "Transformation Package",
      sessions: "12 sessions",
      price: "Most popular choice",
      features: [
        "Comprehensive fitness assessment",
        "12 x 1-to-1 training sessions",
        "Detailed nutrition plan",
        "Progress tracking and photos",
        "Ongoing support via WhatsApp",
      ],
      popular: true,
      color: "from-primary-light to-primary",
    },
    {
      name: "Lifestyle Package",
      sessions: "Ongoing",
      price: "Long-term commitment",
      features: [
        "Unlimited monthly sessions",
        "Nutrition coaching included",
        "Cooking sessions",
        "Priority booking",
        "24/7 support and guidance",
      ],
      popular: false,
      color: "from-primary to-primary-dark",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroPage
        title="Your Perfect"
        subtitle="Fitness Journey"
        description="Discover personalised services designed specifically for women's unique fitness needs and goals."
        primaryButtonText="Book Consultation"
        primaryButtonHref="/contact"
        secondaryButtonText="Meet Emma"
        secondaryButtonHref="/about"
        tertiaryButtonText="View Packages"
        tertiaryButtonHref="#packages"
        badge="Tailored for You"
      />

      {/* Services Section */}
      <section
        id="services"
        className="py-16 bg-gradient-to-br from-white via-muted to-accent-light/20 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-xl" />
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent/20 rounded-full blur-2xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent/20 rounded-full px-4 py-2 mb-4">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium text-sm">Our Services</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-4">
              Choose Your Path to
              <span className="block text-primary">Success</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every woman's fitness journey is unique. Find the perfect service that aligns with your goals and
              lifestyle.
            </p>
          </div>

          {/* Service Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => {
                  const element = document.getElementById(`service-${index}`)
                  element?.scrollIntoView({ behavior: "smooth" })
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 text-sm bg-white text-secondary hover:bg-accent/20 shadow-md hover:shadow-lg"
              >
                <service.icon className="w-4 h-4" />
                <span className="font-medium">{service.title}</span>
              </button>
            ))}
          </div>

          {/* All Services Display */}
          <div className="space-y-20">
            {services.map((service, index) => {
              const ServiceIcon = service.icon
              return (
                <div key={index} id={`service-${index}`} className="scroll-mt-20">
                  <div
                    className={`grid lg:grid-cols-2 gap-10 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
                  >
                    <div className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                      <div className="space-y-3">
                        <div
                          className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center`}
                        >
                          <ServiceIcon className="w-7 h-7 text-white" />
                        </div>

                        <h3 className="font-heading text-2xl font-bold text-secondary">{service.title}</h3>

                        <p className="text-base text-muted-foreground leading-relaxed">{service.description}</p>

                        <div className="flex items-center gap-2 text-primary">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm font-medium">{service.duration}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-heading text-lg font-semibold text-secondary">What's Included:</h4>
                        <div className="grid gap-2">
                          {service.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center gap-3 text-secondary">
                              <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center">
                                <Check className="w-3 h-3 text-primary" />
                              </div>
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button
                        asChild
                        size="lg"
                        className={`bg-gradient-to-r ${service.color} hover:opacity-90 rounded-full px-6`}
                      >
                        <Link href="/contact" className="flex items-center gap-2">
                          Get Started
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>

                    <div className={`relative ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                      <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                        <Image
                          src={service.image || "/placeholder.svg"}
                          alt={service.title}
                          fill
                          className="object-cover"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-20`} />
                      </div>

                      {/* Floating Elements */}
                      <div className="absolute -top-3 -right-3 w-20 h-20 bg-accent/30 rounded-full blur-xl" />
                      <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Immersive Packages Section */}
      <section id="packages" className="py-16 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent/20 rounded-full px-4 py-2 mb-4">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium text-sm">Training Packages</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-4">
              Investment in Your
              <span className="block text-primary">Best Self</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the package that best fits your goals, commitment level, and lifestyle.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg, index) => (
              <Card
                key={index}
                className={`group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 ${pkg.popular ? "ring-2 ring-primary scale-105" : ""}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-primary to-primary-light text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div
                  className={`absolute inset-0 bg-gradient-to-br ${pkg.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                <CardHeader className="text-center pb-3 relative z-10">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${pkg.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="font-heading text-xl text-secondary group-hover:text-primary transition-colors duration-300">
                    {pkg.name}
                  </CardTitle>
                  <div className="text-primary font-semibold">{pkg.sessions}</div>
                  <div className="text-muted-foreground text-sm">{pkg.price}</div>
                </CardHeader>

                <CardContent className="pt-0 relative z-10">
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2 text-secondary">
                        <div className="w-4 h-4 bg-accent/20 rounded-full flex items-center justify-center mt-0.5">
                          <Check className="w-2.5 h-2.5 text-primary" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    className={`w-full bg-gradient-to-r ${pkg.color} hover:opacity-90 rounded-full group-hover:shadow-lg transition-all duration-300 text-sm`}
                  >
                    <Link href="/contact" className="flex items-center justify-center gap-2">
                      Choose Package
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-gradient-to-br from-muted via-accent-light/20 to-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-4">
              Why Choose
              <span className="block text-primary">Diva Fitness?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                title: "Results-Focused",
                description:
                  "Every program is designed with your specific goals in mind, ensuring you see real, measurable progress.",
                color: "from-primary to-primary-light",
              },
              {
                icon: Heart,
                title: "Supportive Environment",
                description:
                  "A safe, non-judgmental space where you can focus on your journey without distractions or intimidation.",
                color: "from-primary-light to-primary",
              },
              {
                icon: User,
                title: "Female-Led",
                description:
                  "Understanding women's unique fitness needs and challenges from personal experience and professional expertise.",
                color: "from-primary to-primary-dark",
              },
            ].map((reason, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                <CardContent className="p-6 text-center relative z-10">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${reason.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <reason.icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="font-heading text-lg font-bold text-secondary mb-3 group-hover:text-primary transition-colors duration-300">
                    {reason.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed text-sm">{reason.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
