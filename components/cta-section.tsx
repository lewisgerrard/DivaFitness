import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CTASection() {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Start Your Transformation?</h2>

        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Take the first step towards a healthier, stronger, more confident you. Book your free consultation today and
          let's discuss your goals.
        </p>

        <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3 text-lg">
          <Link href="/contact">Book Consultation</Link>
        </Button>
      </div>
    </section>
  )
}
