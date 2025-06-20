"use client"

import { useState } from "react"
import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { brandKit } from "@/lib/brand-kit"
import { AnimatedSection } from "./animated-section"

interface InteractiveServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  features: string[]
  popular?: boolean
  colorScheme?: "primary" | "secondary" | "accent"
  delay?: number
}

export function InteractiveServiceCard({
  icon: Icon,
  title,
  description,
  features,
  popular = false,
  colorScheme = "primary",
  delay = 0,
}: InteractiveServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const colorSchemes = {
    primary: brandKit.gradients.primary,
    secondary: brandKit.gradients.secondary,
    accent: brandKit.gradients.accent,
  }

  return (
    <AnimatedSection animation="fadeUp" delay={delay}>
      <Card
        className={`relative overflow-hidden border-2 transition-all duration-500 cursor-pointer group ${
          popular ? "border-primary shadow-lg" : "border-transparent hover:border-primary/20"
        } ${isHovered ? "shadow-2xl -translate-y-2" : "shadow-md hover:shadow-xl"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {popular && (
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
            <span
              className={`${brandKit.gradients.primary} text-white px-4 py-1 rounded-full text-xs font-semibold shadow-lg animate-pulse`}
            >
              Most Popular
            </span>
          </div>
        )}

        {/* Animated background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-primary/20 rounded-full transition-all duration-1000 ${
                isHovered ? "animate-ping" : ""
              }`}
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + i * 10}%`,
                animationDelay: `${i * 200}ms`,
              }}
            />
          ))}
        </div>

        <CardContent className="relative p-6 space-y-4">
          <div
            className={`w-16 h-16 rounded-2xl ${colorSchemes[colorScheme]} flex items-center justify-center transition-transform duration-300 ${
              isHovered ? "scale-110 rotate-6" : ""
            }`}
          >
            <Icon className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-xl font-bold text-secondary group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>

          <p className="text-muted-foreground leading-relaxed">{description}</p>

          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-center text-sm text-secondary transition-all duration-300"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-2 h-2 rounded-full mr-3 transition-all duration-300 ${
                    isHovered ? "bg-primary scale-125" : "bg-primary/60"
                  }`}
                />
                {feature}
              </li>
            ))}
          </ul>

          <Button
            className={`w-full ${colorSchemes[colorScheme]} hover:opacity-90 rounded-full transition-all duration-300 ${
              isHovered ? "scale-105" : ""
            }`}
          >
            Learn More
          </Button>
        </CardContent>
      </Card>
    </AnimatedSection>
  )
}
