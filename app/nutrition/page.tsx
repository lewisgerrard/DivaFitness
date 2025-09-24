"use client"

import { useState } from "react"
import { Check, Leaf, Heart, Target, Users, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import HeroPage from "@/components/hero-page"
import SectionHeader from "@/components/section-header"
import CTASection from "@/components/cta-section"
import Image from "next/image"
import Link from "next/link"
import { brandKit, brandClasses } from "@/lib/brand-kit"

export default function NutritionPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const nutritionServices = [
    {
      id: "consultation",
      title: "Initial Nutrition Consultation",
      duration: "90 minutes",
      price: "£75",
      description: "Comprehensive assessment of your current eating habits, lifestyle, and goals.",
      features: [
        "Detailed dietary analysis",
        "Lifestyle and health assessment",
        "Goal setting and action planning",
        "Personalized nutrition recommendations",
        "Recipe suggestions and meal ideas",
        "Follow-up email summary",
      ],
      popular: false,
    },
    {
      id: "coaching",
      title: "Ongoing Nutrition Coaching",
      duration: "Monthly sessions",
      price: "£60/session",
      description: "Regular support to help you stay on track with your nutrition goals.",
      features: [
        "Monthly 60-minute sessions",
        "Progress tracking and adjustments",
        "Meal planning support",
        "Recipe development",
        "WhatsApp support between sessions",
        "Habit formation strategies",
      ],
      popular: true,
    },
    {
      id: "meal-planning",
      title: "Personalized Meal Planning",
      duration: "Weekly plans",
      price: "£40/week",
      description: "Custom meal plans tailored to your preferences, schedule, and goals.",
      features: [
        "7-day meal plans",
        "Shopping lists included",
        "Prep instructions",
        "Nutritional breakdown",
        "Recipe variations",
        "Dietary restriction accommodations",
      ],
      popular: false,
    },
    {
      id: "package",
      title: "Complete Nutrition Package",
      duration: "3 months",
      price: "£350",
      description: "Comprehensive nutrition transformation program with ongoing support.",
      features: [
        "Initial 90-minute consultation",
        "3 monthly coaching sessions",
        "12 weeks of meal plans",
        "WhatsApp support throughout",
        "Progress tracking tools",
        "Recipe collection access",
        "Final assessment and future planning",
      ],
      popular: false,
      savings: "Save £85",
    },
  ]

  const testimonials = [
    {
      name: "Sarah M.",
      text: "Emma's nutrition coaching completely changed my relationship with food. I've lost 2 stone and feel amazing!",
      rating: 5,
      image: "/placeholder-user.jpg",
    },
    {
      name: "Lisa K.",
      text: "The meal plans are so practical and delicious. Finally, healthy eating that fits my busy lifestyle.",
      rating: 5,
      image: "/placeholder-user.jpg",
    },
    {
      name: "Jenny R.",
      text: "I learned so much about nutrition. Emma makes it simple and sustainable, not restrictive.",
      rating: 5,
      image: "/placeholder-user.jpg",
    },
  ]

  return (
    <div className="min-h-screen">
      <HeroPage
        title="Transform Your"
        subtitle="Relationship with Food"
        description="Discover sustainable nutrition habits that fuel your body, boost your energy, and help you achieve lasting results."
        primaryButtonText="Book Consultation"
        primaryButtonHref="/contact"
        secondaryButtonText="Learn More"
        secondaryButtonHref="#services"
        badge="Precision Nutrition Certified"
        backgroundImage="/images/nutrition-pantry.jpg"
        stats={[
          { value: "200+", label: "Women Helped" },
          { value: "95%", label: "Success Rate" },
        ]}
      />

      <section className={`${brandKit.components.section.base} bg-[#fefcff]`}>
        <div className={brandKit.components.section.container}>
          <SectionHeader
            badge="Philosophy"
            badgeIcon={Heart}
            title="Nutrition That"
            subtitle="Actually Works"
            description="No fad diets, no restrictions, no guilt. Just sustainable, science-based nutrition that fits your real life."
          />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Leaf className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary mb-2">Whole Foods Focus</h3>
                    <p className="text-muted-foreground">
                      Emphasizing nutrient-dense, minimally processed foods that nourish your body and satisfy your
                      taste buds.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary mb-2">Personalized Approach</h3>
                    <p className="text-muted-foreground">
                      Every plan is tailored to your unique needs, preferences, lifestyle, and health goals.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary mb-2">Ongoing Support</h3>
                    <p className="text-muted-foreground">
                      Regular check-ins, adjustments, and support to ensure you stay on track and achieve lasting
                      results.
                    </p>
                  </div>
                </div>
              </div>

              <Button asChild size="lg" className={brandClasses.buttonPrimary}>
                <Link href="/contact">Start Your Nutrition Journey</Link>
              </Button>
            </div>

            <div className="relative">
              <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/nutrition-pantry.jpg"
                  alt="Organized healthy nutrition pantry"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className={brandKit.components.section.base}>
        <div className={brandKit.components.section.container}>
          <SectionHeader
            badge="Services"
            badgeIcon={Star}
            title="Nutrition Services"
            subtitle="Tailored to You"
            description="Choose the level of support that fits your needs and lifestyle."
          />

          <div className="grid md:grid-cols-2 gap-8">
            {nutritionServices.map((service) => (
              <Card
                key={service.id}
                className={`relative transition-all duration-300 hover:shadow-xl ${
                  service.popular ? "ring-2 ring-primary shadow-lg" : ""
                }`}
              >
                {service.popular && (
                  <Badge className="absolute -top-3 left-6 bg-primary text-white">Most Popular</Badge>
                )}
                {service.savings && (
                  <Badge className="absolute -top-3 right-6 bg-green-600 text-white">{service.savings}</Badge>
                )}

                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-secondary">{service.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Clock className="w-4 h-4" />
                        {service.duration}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{service.price}</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-secondary">What's included:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className={`${brandKit.components.section.base} bg-[#fefcff]`}>
        <div className={brandKit.components.section.container}>
          <SectionHeader
            title="Success Stories"
            subtitle="Real Results"
            description="See how nutrition coaching has transformed the lives of women just like you."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-secondary">{testimonial.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        badge="Ready to Transform?"
        title="Start Your Nutrition Journey"
        subtitle="Today"
        description="Book your consultation and take the first step towards a healthier, happier you."
        primaryButtonText="Book Consultation"
        primaryButtonHref="/contact"
      />
    </div>
  )
}
