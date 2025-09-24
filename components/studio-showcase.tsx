import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const studioImages = [
  {
    src: "/images/equipment-wide-shot.jpg",
    alt: "Modern fitness equipment",
    title: "State-of-the-Art Equipment",
  },
  {
    src: "/images/studio-emma-sitting.jpg",
    alt: "Personal training session",
    title: "Expert Guidance",
  },
  {
    src: "/images/nutrition-pantry.jpg",
    alt: "Nutrition consultation area",
    title: "Nutrition Support",
  },
]

export default function StudioShowcase() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Fitness Journey Starts Here</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Step into our welcoming studio environment designed to support your transformation every step of the way.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {studioImages.map((image, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-64">
                <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-center">{image.title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
