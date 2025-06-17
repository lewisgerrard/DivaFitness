"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const studioImages = [
  {
    src: "/images/studio-emma-doorway.jpg",
    alt: "Emma in the studio doorway",
    title: "Welcome to the Studio",
  },
  {
    src: "/images/studio-exterior-cropped.jpg",
    alt: "Studio exterior view",
    title: "Garden Studio Exterior",
  },
  {
    src: "/images/equipment-wide-shot.jpg",
    alt: "Professional fitness equipment",
    title: "Professional Equipment",
  },
  {
    src: "/images/action-training-session.jpg",
    alt: "Training session in progress",
    title: "Personal Training Session",
  },
]

export default function StudioShowcase() {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % studioImages.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + studioImages.length) % studioImages.length)
  }

  return (
    <Card className="border-primary/20 shadow-lg overflow-hidden">
      <CardContent className="p-0">
        {/* Main Image Display */}
        <div className="relative h-80 overflow-hidden">
          <Image
            src={studioImages[currentImage].src || "/placeholder.svg"}
            alt={studioImages[currentImage].alt}
            fill
            className="object-cover transition-transform duration-500"
          />

          {/* Navigation Arrows */}
          <Button
            onClick={prevImage}
            variant="ghost"
            size="sm"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-lg"
          >
            <ChevronLeft className="w-5 h-5 text-primary" />
          </Button>

          <Button
            onClick={nextImage}
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-lg"
          >
            <ChevronRight className="w-5 h-5 text-primary" />
          </Button>

          {/* Image Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <h3 className="text-white font-semibold text-lg">{studioImages[currentImage].title}</h3>
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex gap-2 justify-center">
            {studioImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImage ? "bg-primary scale-125" : "bg-primary/30 hover:bg-primary/50"
                }`}
              />
            ))}
          </div>

          <div className="text-center mt-4">
            <div className="flex items-center justify-center gap-2 text-primary">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">Private Garden Studio, Chester</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              A peaceful, purpose-built space designed exclusively for women's fitness
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
