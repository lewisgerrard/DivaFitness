"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Award, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function HeroHome() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=800')] opacity-5" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000" />

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-pink-100 text-pink-800 hover:bg-pink-200">
                <Award className="w-4 h-4 mr-2" />
                8+ Years Experience
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Transform Your{" "}
                <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Fitness Journey
                </span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-lg">
                Experience personalised training in a stunning garden studio designed exclusively for your privacy and
                comfort. Specialist in female fitness with proven results.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">200+</div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">8+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
              >
                <Link href="/contact">Start Your Journey</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">5.0 from 50+ reviews</span>
            </div>
          </div>

          {/* Right Content - Image and Floating Card */}
          <div className="relative">
            <div className="relative">
              <Image
                src="/images/studio-emma-sitting.jpg"
                alt="Emma Fisher - Personal Trainer"
                width={600}
                height={700}
                className="rounded-2xl shadow-2xl"
                priority
              />

              {/* Floating Review Card */}
              <Card className="absolute -bottom-6 -left-6 w-80 shadow-xl bg-white/95 backdrop-blur">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Image src="/placeholder-user.jpg" alt="Client" width={40} height={40} className="rounded-full" />
                    <div className="flex-1">
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        "Emma transformed my fitness journey completely. The private studio setting made all the
                        difference!"
                      </p>
                      <p className="text-xs font-medium mt-1">- Sarah M.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Location Badge */}
            <Badge className="absolute top-4 right-4 bg-white/90 text-gray-800 hover:bg-white">
              <MapPin className="w-3 h-3 mr-1" />
              Wickford, Essex
            </Badge>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroHome
