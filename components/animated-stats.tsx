"use client"

import { useEffect, useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface StatProps {
  value: number
  label: string
  suffix?: string
  delay?: number
}

function AnimatedStat({ value, label, suffix = "", delay = 0 }: StatProps) {
  const [count, setCount] = useState(0)
  const { ref, isVisible } = useScrollAnimation(0.3)

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        const duration = 2000
        const steps = 60
        const increment = value / steps
        let current = 0

        const counter = setInterval(() => {
          current += increment
          if (current >= value) {
            setCount(value)
            clearInterval(counter)
          } else {
            setCount(Math.floor(current))
          }
        }, duration / steps)

        return () => clearInterval(counter)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [isVisible, value, delay])

  return (
    <div ref={ref} className="text-center group">
      <div className="text-4xl font-bold text-primary mb-2 transition-transform duration-300 group-hover:scale-110">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}

export function AnimatedStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      <AnimatedStat value={7} label="Years Experience" suffix="+" delay={0} />
      <AnimatedStat value={200} label="Happy Clients" suffix="+" delay={200} />
      <AnimatedStat value={100} label="Female-Led" suffix="%" delay={400} />
      <AnimatedStat value={5} label="Star Rating" suffix="★" delay={600} />
    </div>
  )
}
