"use client"

import { useState } from "react"
import { ChevronDown, Search, X } from "lucide-react"
import HeroPage from "@/components/hero-page"

export default function FAQsPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const faqs = [
    {
      question: "What should I bring to my first session?",
      answer:
        "Just bring comfortable workout clothes, trainers, a water bottle, and a positive attitude! I provide all the equipment needed for your session. If you have any specific dietary requirements or health conditions, please let me know in advance.",
    },
    {
      question: "How many people are in a group session?",
      answer:
        "Group sessions are kept small with a maximum of 4 people to ensure everyone receives personal attention and proper form correction. This creates a supportive, intimate environment while still providing the motivation of training with others.",
    },
    {
      question: "Do you offer meal plans?",
      answer:
        "Yes! I provide personalized nutrition guidance including meal plans tailored to your goals, dietary preferences, and lifestyle. I also offer interactive cooking sessions where we prepare healthy meals together, teaching you practical skills for long-term success.",
    },
    {
      question: "What if I'm a complete beginner?",
      answer:
        "Perfect! I love working with beginners. We'll start with a comprehensive assessment to understand your current fitness level, then create a program that progresses at your pace. The private studio environment means you can learn without feeling self-conscious.",
    },
    {
      question: "How often should I train?",
      answer:
        "This depends on your goals, current fitness level, and schedule. Generally, I recommend 2-3 sessions per week for optimal results, but we can create a plan that works for your lifestyle. Consistency is more important than frequency.",
    },
    {
      question: "Is the studio accessible?",
      answer:
        "The studio is located in my garden and is accessible via a level path. If you have any specific accessibility needs, please contact me to discuss how I can accommodate them.",
    },
    {
      question: "What happens if I need to cancel a session?",
      answer:
        "I understand life happens! I ask for 24 hours notice for cancellations when possible. This allows me to offer the slot to other clients. We can reschedule your session for a time that works better for you.",
    },
    {
      question: "Do you provide nutritional supplements?",
      answer:
        "I focus on whole food nutrition and will provide guidance on whether supplements might benefit your specific goals. I don't sell supplements but can recommend reputable brands if needed. My approach emphasizes getting nutrients from real food first.",
    },
    {
      question: "Can I train if I have an injury or health condition?",
      answer:
        "In many cases, yes! I have experience working with various conditions and injuries. However, I may require clearance from your healthcare provider first. We'll modify exercises as needed to ensure your safety while still achieving your goals.",
    },
    {
      question: "What makes your approach different?",
      answer:
        "As a female trainer working exclusively with women, I understand the unique challenges we face. My holistic approach combines fitness, nutrition, and emotional support in a private, non-intimidating environment. It's not just about exercise - it's about empowering you to live your best life.",
    },
  ]

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-[#fefcff]">
      {/* Hero Section */}
      <HeroPage
        title="Frequently Asked"
        subtitle="Questions"
        description="Find answers to common questions about training at Diva Fitness and discover how we can support your fitness journey."
        primaryButtonText="Contact Emma"
        primaryButtonHref="/contact"
        badge="Got Questions?"
      />

      {/* Search Section */}
      <section className="py-6 px-4 max-w-4xl mx-auto bg-[#fefcff]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="mt-2 text-sm text-gray-600">
            {filteredFaqs.length} result{filteredFaqs.length !== 1 ? "s" : ""} found for "{searchQuery}"
          </p>
        )}
      </section>

      {/* FAQs Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto bg-[#fefcff]">
        <div className="max-w-4xl mx-auto">
          {/* Right Column - FAQ List */}
          <div>
            <div className="space-y-4">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => {
                  const originalIndex = faqs.indexOf(faq)
                  return (
                    <div
                      key={originalIndex}
                      className="group bg-white rounded-xl border border-gray-200 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                    >
                      <button
                        onClick={() => toggleFAQ(originalIndex)}
                        className="w-full p-6 text-left flex justify-between items-start hover:bg-gray-50/50 transition-colors rounded-xl"
                      >
                        <div className="flex-1 pr-4">
                          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary transition-colors">
                            {faq.question}
                          </h3>
                          {openFAQ === originalIndex && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                            </div>
                          )}
                        </div>
                        <div className="flex-shrink-0 ml-4">
                          <div
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                              openFAQ === originalIndex
                                ? "border-primary bg-primary text-white rotate-180"
                                : "border-gray-300 text-gray-400 group-hover:border-primary group-hover:text-primary"
                            }`}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </div>
                      </button>
                    </div>
                  )
                })
              ) : (
                <div className="text-center py-16 bg-gray-50 rounded-2xl">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No FAQs found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your search terms or browse all questions.</p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </div>

            {/* Quick Stats */}
          </div>
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-10 bg-primary text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-lg mb-6 opacity-90">
            Don't hesitate to get in touch. I'm here to help and would love to discuss how I can support your fitness
            journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:07966874821"
              className="inline-flex items-center justify-center px-6 py-2 bg-white text-primary rounded-md font-semibold hover:bg-gray-100 transition-colors text-sm"
            >
              Call: 07966 874 821
            </a>
            <a
              href="mailto:info@diva-fitness.co.uk"
              className="inline-flex items-center justify-center px-6 py-2 bg-white text-primary rounded-md font-semibold hover:bg-gray-100 transition-colors text-sm"
            >
              Email: info@diva-fitness.co.uk
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
