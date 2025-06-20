"use client"

import { useParallax } from "@/hooks/use-scroll-animation"

export function FloatingElements() {
  const offset = useParallax()

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating circles */}
      <div
        className="absolute w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        style={{
          top: "10%",
          left: "80%",
          transform: `translateY(${offset * 0.1}px) rotate(${offset * 0.05}deg)`,
        }}
      />
      <div
        className="absolute w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        style={{
          top: "60%",
          left: "-10%",
          transform: `translateY(${offset * -0.15}px) rotate(${offset * -0.03}deg)`,
        }}
      />
      <div
        className="absolute w-48 h-48 bg-secondary/5 rounded-full blur-2xl"
        style={{
          top: "30%",
          right: "85%",
          transform: `translateY(${offset * 0.08}px) rotate(${offset * 0.07}deg)`,
        }}
      />
    </div>
  )
}
