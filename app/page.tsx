"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { User, Users, Leaf, MapPin, Phone, Mail, Play, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ReviewsGrid from "@/components/reviews-grid"

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Compact Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        {/* Static Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/studio-exterior-full.jpg"
            alt="Diva Fitness Studio - Full Garden View"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Dynamic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary-dark/80 to-secondary/70" />

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl"
            style={{
              left: mousePosition.x * 0.02 + "px",
              top: mousePosition.y * 0.02 + "px",
              transform: "translate(-50%, -50%)",
            }}
          />
          <div
            className="absolute w-64 h-64 bg-accent/30 rounded-full blur-2xl"
            style={{
              right: mousePosition.x * -0.01 + "px",
              bottom: mousePosition.y * -0.01 + "px",
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Award-Winning Personal Training</span>
            </div>

            <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in leading-tight">
              Transform Your
              <span className="block bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
                Fitness Journey
              </span>
            </h1>

            <p className="text-lg md:text-xl mb-6 animate-fade-in max-w-2xl mx-auto leading-relaxed opacity-90">
              Experience personalized training in a stunning garden studio designed exclusively for women's wellness and
              empowerment.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center animate-fade-in">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Link href="/services" className="flex items-center gap-2">
                  Start Your Journey
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm"
              >
                <Link href="/services" className="flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  View Services
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mt-10 max-w-xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">7+</div>
                <div className="text-xs opacity-80">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">100%</div>
                <div className="text-xs opacity-80">Female-Led</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Immersive About Section */}
      <section className="relative py-16 bg-gradient-to-br from-muted via-white to-accent-light/20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full blur-xl" />
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent rounded-full blur-2xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content Side */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-accent/20 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-primary font-medium text-sm">Since 2017</span>
              </div>

              <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary leading-tight">
                Your Personal
                <span className="block text-primary">Fitness Sanctuary</span>
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Step into a world where fitness meets tranquility. Our purpose-built garden studio isn't just a gym –
                it's your personal retreat where transformation happens naturally.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="group">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-secondary mb-2">1-to-1 Focus</h3>
                  <p className="text-sm text-muted-foreground">Completely personalized attention</p>
                </div>
                <div className="group">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-light to-primary rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-secondary mb-2">Holistic Approach</h3>
                  <p className="text-sm text-muted-foreground">Fitness, nutrition & wellness</p>
                </div>
              </div>

              <Button asChild size="lg" className="bg-primary hover:bg-primary-dark rounded-full px-8">
                <Link href="/about" className="flex items-center gap-2">
                  Meet Emma
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>

            {/* Image Side */}
            <div className="relative">
              {/* Main Image */}
              <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <Image
                  src="/images/studio-emma-sitting.jpg"
                  alt="Emma Fisher in Diva Fitness Studio"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent/30 rounded-full blur-xl" />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Services Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent/20 rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium text-sm">Tailored Services</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-4">
              Choose Your Path to
              <span className="block text-primary">Transformation</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every journey is unique. Discover the perfect service that aligns with your goals and lifestyle.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: User,
                title: "1-to-1 Training",
                description: "Completely personalized sessions designed around your unique goals and preferences.",
                features: ["Custom workout plans", "Form correction", "Progress tracking"],
                color: "from-primary to-primary-light",
                popular: false,
              },
              {
                icon: Users,
                title: "Group Sessions",
                description: "Train with like-minded women in our supportive small group environment.",
                features: ["Max 4 people", "Social motivation", "Cost-effective"],
                color: "from-primary-light to-primary",
                popular: true,
              },
              {
                icon: Leaf,
                title: "Nutrition Coaching",
                description: "Comprehensive guidance including meal planning and interactive cooking sessions.",
                features: ["Meal planning", "Cooking sessions", "Lifestyle integration"],
                color: "from-primary to-primary-dark",
                popular: false,
              },
            ].map((service, index) => (
              <Card
                key={index}
                className={`group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${service.popular ? "ring-2 ring-primary" : ""}`}
              >
                {service.popular && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-primary to-primary-light text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                <CardContent className="p-6 relative z-10">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="font-heading text-xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 leading-relaxed text-sm">{service.description}</p>

                  <ul className="space-y-1 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-xs text-secondary">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary rounded-full group-hover:shadow-lg transition-all duration-300 text-sm">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section with Map and Grid */}
      <section className="py-16 bg-gradient-to-br from-accent-light/20 via-muted to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-4">
              Stories of
              <span className="block text-primary">Transformation</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real women, real results, real empowerment. See what our clients say about their journey with Diva
              Fitness.
            </p>
          </div>

          <div className="space-y-12">
            {/* Reviews Grid */}
            <div>
              <ReviewsGrid />
            </div>

            {/* Action Buttons */}
            <div className="text-center mt-8">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="bg-primary hover:bg-primary-dark rounded-full px-6">
                  <a
                    href="https://www.google.com/maps/search/Diva+Fitness+Chester"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    View All Google Reviews
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-full px-6">
                  <a
                    href="https://g.co/kgs/M2SZQkb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Leave a Review
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full px-6 border-primary text-primary hover:bg-primary/10"
                >
                  <a
                    href="https://www.trustpilot.com/review/diva-fitness.co.uk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    Trustpilot Reviews
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Map Section */}
            <div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-accent/20 max-w-4xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="flex items-center gap-2">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span className="font-bold text-lg text-secondary">Find Us</span>
                  </div>
                </div>

                {/* Google Map */}
                <div className="w-full mb-6">
                  <iframe
                    src="https://www.google.com/maps/embed/v1/search?key=AIzaSyAt0i9BNsrI7oW9fiXrDDiTJNkeEvokDXk&q=Diva+Fitness+Chester+UK&zoom=15"
                    width="100%"
                    height="300"
                    style={{ border: 0, borderRadius: "12px" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Diva Fitness Location"
                    className="shadow-lg"
                  />
                </div>

                {/* Location Info */}
                <div className="text-center">
                  <h3 className="font-heading text-lg font-bold text-secondary mb-2">Visit Our Garden Studio</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Located in Chester, UK - exact address provided upon booking
                  </p>
                  <Button asChild size="sm" className="bg-primary hover:bg-primary-dark rounded-full w-full">
                    <a
                      href="https://g.co/kgs/M2SZQkb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <MapPin className="w-4 h-4" />
                      Get Directions
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive CTA Section */}
      <section className="relative py-16 bg-gradient-to-br from-primary via-primary-dark to-primary-light overflow-hidden">
        <div className="absolute inset-0 bg-primary">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-dark rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary-light rounded-full blur-2xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Ready to Begin?</span>
          </div>

          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Your Transformation
            <span className="block">Starts Today</span>
          </h2>

          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of women who have discovered their strength, confidence, and best selves at Diva Fitness.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Link href="/contact" className="flex items-center gap-2">
                Book Free Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm"
            >
              <Link href="/services">Explore Services</Link>
            </Button>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <Phone className="w-4 h-4" />
              <a href="tel:07966874821" className="hover:text-white/80 transition-colors text-sm">
                07966 874 821
              </a>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <Mail className="w-4 h-4" />
              <a href="mailto:info@diva-fitness.co.uk" className="hover:text-white/80 transition-colors text-sm">
                Get in Touch
              </a>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Chester, UK</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
