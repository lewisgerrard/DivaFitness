import Image from "next/image"
import Link from "next/link"
import { Award, Heart, Users, Zap, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import HeroPage from "@/components/hero-page"
import { brandKit, brandClasses } from "@/lib/brand-kit"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroPage
        title="From Vision"
        subtitle="to Reality"
        description="Empowering women since 2017 with personalised fitness journeys that transform bodies, minds, and lives."
        primaryButtonText="My Story"
        primaryButtonHref="#story"
        secondaryButtonText="My Values"
        secondaryButtonHref="#values"
        tertiaryButtonText="Qualifications"
        tertiaryButtonHref="#certifications"
        badge="Your Personal Trainer"
      />

      {/* Story Section */}
      <section id="story" className={`${brandKit.spacing.section.md} ${brandKit.gradients.background}`}>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className={brandKit.components.section.badge}>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-primary font-medium text-sm">My Journey</span>
              </div>

              <h2 className={brandClasses.sectionTitle}>
                Behind the
                <span className={brandKit.components.section.subtitle}>Concept</span>
              </h2>

              <div className="space-y-6 text-lg leading-relaxed text-secondary">
                <p>
                  Since establishing Diva Fitness in 2017, I've been on a mission to create something truly special – a
                  fitness studio where women can pursue their health and weight management goals and regain their self
                  confidence.
                </p>

                <p>
                  My journey began with a simple realisation: traditional gyms weren't serving women's unique needs. Too
                  many brilliant women were holding back, feeling uncomfortable, or simply not getting the personalised
                  attention they deserved.
                </p>

                <p>
                  That's when I decided to create something different – a private, purpose-built garden studio where
                  every detail is designed to encourage and motivate you along this journey.
                </p>
              </div>

              <Button asChild size="lg" className={brandClasses.buttonPrimary}>
                <Link href="/services" className="flex items-center gap-2">
                  Explore My Services
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div
                    className={`relative h-48 rounded-2xl overflow-hidden shadow-lg ${brandKit.animations.scaleHover}`}
                  >
                    <Image
                      src="/images/studio-exterior-cropped.jpg"
                      alt="Studio Exterior"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div
                    className={`relative h-32 rounded-2xl overflow-hidden shadow-lg ${brandKit.animations.scaleHover}`}
                  >
                    <Image
                      src="/images/equipment-wide-shot.jpg"
                      alt="Professional Equipment"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div
                    className={`relative h-32 rounded-2xl overflow-hidden shadow-lg ${brandKit.animations.scaleHover}`}
                  >
                    <Image
                      src="/images/weights-close-up.jpg"
                      alt="Training Equipment"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div
                    className={`relative h-48 rounded-2xl overflow-hidden shadow-lg ${brandKit.animations.scaleHover}`}
                  >
                    <Image
                      src="/images/action-training-session.jpg"
                      alt="Training Session"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className={`${brandKit.spacing.section.md} bg-gradient-to-b from-gray-50 to-white`}>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
          <div className={brandKit.components.section.header}>
            <div className={brandKit.components.section.badge}>
              <Award className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium text-sm">Qualifications</span>
            </div>
            <h2 className={brandClasses.sectionTitle}>
              Professional
              <span className={brandKit.components.section.subtitle}>Certifications</span>
            </h2>
            <p className={brandClasses.sectionDescription}>
              Committed to excellence through continuous education and professional development.
            </p>
          </div>

          {/* All Certifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: "/images/certifications/premier-qualified.png",
                alt: "Premier Qualified Fitness Certification",
                title: "Level 3 Diploma in Personal Training",
                description:
                  "Comprehensive personal training qualification covering exercise science and program design",
                year: "2017",
                issuer: "YMCA Awards",
              },
              {
                image: "/images/certifications/precision-nutrition-l1.webp",
                alt: "Precision Nutrition Level 1 Coach Certification",
                title: "Level 1 Precision Nutrition",
                description: "Evidence-based certification in nutrition and health coaching",
                year: "2019",
                issuer: "Precision Nutrition",
              },
              {
                image: "/images/certifications/senior-fitness-nasm.png",
                alt: "NASM Senior Fitness Specialisation",
                title: "Senior Fitness Specialist",
                description: "Advanced certification covering the specific requirements of people with joint and mobility limitations",
                year: "2020",
                issuer: "NASM",
              },
              {
                image: "/images/certifications/womens-fitness-nasm.png",
                alt: "NASM Women's Fitness Specialization",
                title: "Women's Fitness Specialist",
                description: "Advanced certification covering the specific physiological needs of women of all age groups",
                year: "2021",
                issuer: "NASM",
              },
              {
                image: "/images/certifications/fitness-pilates.png",
                alt: "Fitness Pilates Certification",
                title: "Pilates",
                description: "Specialised training in Pilates methodology and instruction",
                year: "2022",
                issuer: "Fitness Pilates",
              },
              {
                image: "/images/certifications/ymca-awards.jpeg",
                alt: "YMCA Awards Pre/Post Natal",
                title: "Pre/Post Natal",
                description: "Providing safe expertise and adaptations for clients throughout their pregnancy journey",
                year: "2020",
                issuer: "YMCA Awards",
              },
              {
                image: "/images/certifications/mind-mental-health.png",
                alt: "Mind Mental Health Awareness",
                title: "Mental Health Awareness for Sport & Physical Activity",
                description: "Supporting clients' mental wellbeing alongside their physical fitness journey",
                year: "2021",
                issuer: "Mind",
              },
              {
                image: "/images/certifications/water-fitness.png",
                alt: "Water Fitness Certification",
                title: "Water Fitness",
                description: "Specialised training in aquatic fitness and water-based exercise programs",
                year: "2019",
                issuer: "WV Fitness",
              },
              {
                image: "/images/certifications/first-aid-st-johns.png",
                alt: "St John Ambulance First Aid at Work",
                title: "First Aid at Work",
                description: "Comprehensive first aid training for workplace and fitness environments",
                year: "2023",
                issuer: "St John Ambulance",
              },
            ].map((cert, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 h-full flex flex-col">
                  {cert.image && (
                    <div className="relative mb-4 mx-auto w-20 h-20">
                      <div className="absolute inset-0 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-all duration-300">
                        <div className="p-2 h-full flex items-center justify-center">
                          <Image
                            src={cert.image || "/placeholder.svg"}
                            alt={cert.alt}
                            width={60}
                            height={60}
                            className="object-contain max-w-full max-h-full"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex-grow text-center">
                    <h3 className="font-bold text-gray-900 mb-2 text-sm">{cert.title}</h3>
                    <p className="text-gray-600 text-xs leading-relaxed">{cert.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section id="values" className={`${brandKit.spacing.section.md} bg-white`}>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
          <div className={brandKit.components.section.header}>
            <div className={brandKit.components.section.badge}>
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium text-sm">My Philosophy</span>
            </div>
            <h2 className={brandClasses.sectionTitle}>
              What Drives
              <span className={brandKit.components.section.subtitle}>Everything I Do</span>
            </h2>
            <p className={brandClasses.sectionDescription}>
              Every aspect of my approach is designed with women's unique needs, challenges, and strengths in mind.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: "Supportive",
                description: "Creating a non-judgmental space where you feel comfortable and encouraged to grow.",
                color: brandKit.gradients.accent,
              },
              {
                icon: Users,
                title: "Personal",
                description: "Tailored programmes that adapt to your lifestyle, preferences, and individual goals.",
                color: brandKit.gradients.primary,
              },
              {
                icon: Zap,
                title: "Holistic",
                description: "Combining fitness, nutrition, and behaviour change for sustainable results.",
                color: brandKit.gradients.secondary,
              },
              {
                icon: Award,
                title: "Professional",
                description: "Qualified, experienced, and committed to ongoing education and development.",
                color: brandKit.gradients.accent,
              },
            ].map((value, index) => (
              <Card key={index} className={brandClasses.cardBase}>
                <div
                  className={`absolute inset-0 ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                <CardContent className={brandKit.components.card.content}>
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className={brandKit.components.card.title}>{value.title}</h3>

                  <p className={brandKit.components.card.description}>{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Transformation Section */}
      <section
        id="journey"
        className={`${brandKit.spacing.section.md} bg-gradient-to-b from-white via-purple-50/30 to-white relative overflow-hidden before:absolute before:top-20 before:left-20 before:w-32 before:h-32 before:border before:border-primary/20 before:rounded-full before:opacity-10 after:absolute after:bottom-20 after:right-20 after:w-24 after:h-24 after:border after:border-secondary/20 after:rounded-full after:opacity-10`}
      >
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
          {/* Section Header */}
          <div className={brandKit.components.section.header}>
            <div className={brandKit.components.section.badge}>
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium text-sm">The Journey</span>
            </div>
            <h2 className={brandClasses.sectionTitle}>
              Studio
              <span className={brandKit.components.section.subtitle}>Transformation</span>
            </h2>
            <p className={brandClasses.sectionDescription}>
              From an empty garden space to a fully equipped fitness sanctuary - witness the journey
            </p>
          </div>

          {/* Horizontal Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full transform -translate-y-1/2 z-0"></div>

            {/* Timeline Dots */}
            <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 z-10">
              <div className="w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg"></div>
              <div className="w-6 h-6 bg-secondary rounded-full border-4 border-white shadow-lg"></div>
              <div className="w-6 h-6 bg-accent rounded-full border-4 border-white shadow-lg"></div>
              <div className="w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg"></div>
            </div>

            {/* Timeline Items */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-20 max-w-7xl mx-auto">
              {[
                {
                  year: "2017",
                  title: "The Beginning",
                  description: "An empty garden with endless possibilities",
                  image: "/images/journey-before.jpg",
                  position: "top",
                },
                {
                  year: "Planning",
                  title: "Design Phase",
                  description: "Sketching dreams on paper, planning every detail",
                  image: "/images/journey-plan.jpg",
                  position: "bottom",
                },
                {
                  year: "Building",
                  title: "Construction",
                  description: "Hard work with my faithful furry assistants",
                  image: "/images/journey-construction.jpg",
                  position: "top",
                },
                {
                  year: "2018",
                  title: "Dream Realized",
                  description: "The studio is complete and ready to inspire",
                  image: "/images/journey-complete.jpg",
                  position: "bottom",
                },
              ].map((item, index) => (
                <div key={index} className={`relative ${item.position === "top" ? "mb-16" : "mt-16"}`}>
                  {/* Photo Card */}
                  <div className="group cursor-pointer">
                    <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />

                      {/* Polaroid-style bottom */}
                      <div className="absolute bottom-0 left-0 right-0 bg-white p-4">
                        <div className="text-center">
                          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mb-2">
                            {item.year}
                          </div>
                          <h3 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h3>
                          <p className="text-gray-600 text-xs leading-relaxed">{item.description}</p>
                        </div>
                      </div>

                      {/* Decorative tape */}
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-yellow-200/80 rounded-sm shadow-md border border-yellow-300/50 rotate-3"></div>
                    </div>

                    {/* Connection Line to Timeline */}
                    <div
                      className={`absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-300 ${
                        item.position === "top" ? "top-full h-16" : "bottom-full h-16"
                      }`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
