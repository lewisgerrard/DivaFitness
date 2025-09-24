"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Dumbbell, Users, Heart, Award } from "lucide-react"
import Image from "next/image"

const features = [
  {
    icon: Dumbbell,
    title: "Professional Equipment",
    description: "State-of-the-art fitness equipment for all your training needs",
  },
  {
    icon: Users,
    title: "Group Classes",
    description: "Motivating group sessions with like-minded fitness enthusiasts",
  },
  {
    icon: Heart,
    title: "Holistic Approach",
    description: "Combining fitness, nutrition, and mental wellbeing for complete transformation",
  },
  {
    icon: Award,
    title: "Expert Guidance",
    description: "Certified personal trainer with years of experience and proven results",
  },
]

export function StudioShowcase() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary mb-4">Your Fitness Journey Starts Here</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience a welcoming, professional environment designed to help you achieve your fitness goals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <Image
              src="/images/studio-emma-exterior.jpg"
              alt="Diva Fitness Studio Exterior"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-secondary mb-6">Modern Fitness Studio</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our purpose-built studio provides the perfect environment for your fitness journey. With natural light,
              premium equipment, and a welcoming atmosphere, you'll feel motivated and comfortable from day one.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <feature.icon className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-secondary text-sm">{feature.title}</h4>
                    <p className="text-gray-600 text-xs mt-1">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <Image
                src="/images/equipment-wide-shot.jpg"
                alt="Professional Fitness Equipment"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="font-bold text-secondary mb-2">Premium Equipment</h3>
              <p className="text-gray-600 text-sm">
                Access to professional-grade equipment for strength training, cardio, and functional fitness.
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <Image
                src="/images/action-training-session.jpg"
                alt="Personal Training Session"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="font-bold text-secondary mb-2">Personal Training</h3>
              <p className="text-gray-600 text-sm">
                One-on-one sessions tailored to your specific goals, fitness level, and preferences.
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <Image
                src="/images/nutrition-pantry.jpg"
                alt="Nutrition Guidance"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="font-bold text-secondary mb-2">Nutrition Support</h3>
              <p className="text-gray-600 text-sm">
                Comprehensive nutrition guidance to complement your training and maximize results.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default StudioShowcase
