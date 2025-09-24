import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Dumbbell, Apple, Users, Heart } from "lucide-react"

export default function ServicesContent() {
  const services = [
    {
      icon: <Dumbbell className="h-8 w-8 text-primary" />,
      title: "Personal Training",
      description:
        "One-on-one training sessions tailored to your fitness level and goals. Build strength, improve endurance, and transform your body with expert guidance.",
      features: ["Customized workout plans", "Form correction", "Progress tracking", "Flexible scheduling"],
      link: "/training",
    },
    {
      icon: <Apple className="h-8 w-8 text-primary" />,
      title: "Nutrition Coaching",
      description:
        "Sustainable nutrition strategies that fit your lifestyle. Learn to fuel your body properly and develop a healthy relationship with food.",
      features: ["Meal planning", "Nutritional education", "Habit formation", "Ongoing support"],
      link: "/nutrition",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Group Sessions",
      description:
        "Small group training sessions that combine the benefits of personal training with the motivation of working out with others.",
      features: ["Small groups (2-4 people)", "Shared motivation", "Cost-effective", "Social support"],
      link: "/contact",
    },
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Wellness Coaching",
      description:
        "Holistic approach to health and wellness, focusing on mental well-being, stress management, and lifestyle balance.",
      features: ["Stress management", "Sleep optimization", "Mindfulness techniques", "Life balance"],
      link: "/contact",
    },
  ]

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Services Designed for Your Success</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Whether you're just starting your fitness journey or looking to break through plateaus, I offer comprehensive
          services to support your goals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <Card key={index} className="h-full hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                {service.icon}
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </div>
              <CardDescription className="text-base">{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-primary">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href={service.link}>Learn More</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
          <Link href="/contact">Book Your Free Consultation</Link>
        </Button>
      </div>
    </div>
  )
}
