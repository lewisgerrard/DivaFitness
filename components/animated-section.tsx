"use client"

import type React from "react"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  animation?: "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scale"
  delay?: number
}

export function AnimatedSection({ children, className, animation = "fadeUp", delay = 0 }: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation(0.1)

  const animations = {
    fadeUp: "translate-y-8 opacity-0",
    fadeIn: "opacity-0",
    slideLeft: "-translate-x-8 opacity-0",
    slideRight: "translate-x-8 opacity-0",
    scale: "scale-95 opacity-0",
  }

  const visibleAnimations = {
    fadeUp: "translate-y-0 opacity-100",
    fadeIn: "opacity-100",
    slideLeft: "translate-x-0 opacity-100",
    slideRight: "translate-x-0 opacity-100",
    scale: "scale-100 opacity-100",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? visibleAnimations[animation] : animations[animation],
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
