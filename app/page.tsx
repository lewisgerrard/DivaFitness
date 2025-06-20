import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { ServicesSection } from "@/components/sections/services-section"
import { ReviewsSection } from "@/components/sections/reviews-section"
import { CTASection } from "@/components/sections/cta-section"
import { FloatingElements } from "@/components/floating-elements"

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      {/* Floating background elements */}
      <FloatingElements />

      {/* Hero Section */}
      <HeroSection
        title="Transform Your"
        subtitle="Fitness Journey"
        description="Experience personalized training in a stunning garden studio designed exclusively for women's wellness and empowerment."
        primaryButton={{
          text: "Start Your Journey",
          href: "/services",
        }}
        secondaryButton={{
          text: "Meet Emma",
          href: "/about",
        }}
        tertiaryButton={{
          text: "Get In Touch",
          href: "/contact",
        }}
        badge="Award-Winning Personal Training"
        stats={[
          { value: "7+", label: "Years Experience" },
          { value: "100%", label: "Female-Led" },
        ]}
        backgroundImage="/images/studio-exterior-full.jpg"
        variant="home"
      />

      {/* About Section */}
      <AboutSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Reviews Section */}
      <ReviewsSection />

      {/* CTA Section */}
      <CTASection
        badge="Ready to Begin?"
        title="Your Transformation"
        subtitle="Starts Today"
        description="Join hundreds of women who have discovered their strength, confidence, and best selves at Diva Fitness."
        primaryButton={{
          text: "Book Free Consultation",
          href: "/contact",
        }}
        secondaryButton={{
          text: "Explore Services",
          href: "/services",
        }}
      />
    </div>
  )
}
