"use client"

import { useState } from "react"
import HeroPage from "@/components/hero-page"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const FAQsPage = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const faqs = [
    {
      question: "What should I bring to my first session?",
      answer:
        "Just bring comfortable workout clothes, trainers, a water bottle and a small hand towel (optional). I provide all the equipment needed for your session.",
    },
    {
      question: "How many people are in a group session?",
      answer:
        "Group sessions are kept small with a maximum of either 3 or 4 people to ensure everyone receives personal attention and proper form correction. This creates a supportive, intimate environment while still providing the motivation of training with others.",
    },
    {
      question: "Do you offer meal plans?",
      answer:
        "No, this is out of the scope of personal trainers! What I can provide is personalised nutrition guidance tailored to your goals, dietary preferences, and lifestyle. I also offer interactive cooking sessions where we prepare healthy meals together, teaching you practical skills for long-term success.",
    },
    {
      question: "How often should I train?",
      answer:
        "This depends on your goals, current fitness level, and budget. Generally, I recommend 1-2 sessions per week for optimal results, but we can create a plan that works around your availability and factor in what exercise you do outside of our sessions. Consistency is more important than frequency.",
    },
    {
      question: "Is the studio accessible?",
      answer: "The studio is located in my garden and access is via the side gate which is how you will access.",
    },
    {
      question: "What happens if I need to cancel a session?",
      answer:
        "I ask for 48 hours notice for cancellations when possible. This allows me to release the slot to other clients. I'm happy to look at an alternative time slot on the same day if available.",
    },
    {
      question: "Do you provide nutritional supplements?",
      answer:
        'No. I focus solely on whole food nutrition and will provide guidance on whether supplements might benefit your specific goals. My emphasis is on a "food first, supps second" approach, however for those following a vegan/vegetarian diet, I am happy to suggest foods to boost macro-nutritional deficiencies.',
    },
    {
      question: "Can I train if I have an injury or health condition?",
      answer:
        "In many cases, yes. I will discuss this more during your consultation and have experience working with various conditions and injuries. However, I may require clearance from your doctor first.",
    },
    {
      question: "What makes your approach different?",
      answer:
        "As a female trainer working exclusively with women, I understand the unique challenges we face, both physiologically and emotionally. My approach to improving overall wellbeing combines fitness, nutrition, and emotional support in a private, non-intimidating environment. It's not just about exercise – it's about empowering you to live your best life and support you in whatever way I can.",
    },
  ]

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-[#fefcff]">
      <HeroPage
        title="Frequently Asked"
        subtitle="Questions"
        description="Find answers to common questions about training, nutrition, and my approach to fitness."
        badge="Get Answers"
      />

      <section className="py-16 px-4 max-w-6xl mx-auto">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg rounded-xl border-gray-300 focus:border-primary focus:ring-primary"
            />
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <details key={index} className="group border border-gray-300 rounded-lg overflow-hidden">
                <summary className="list-none px-6 py-4 cursor-pointer flex items-center justify-between group-open:bg-gray-50 hover:bg-gray-50 transition-colors">
                  <span className="font-medium text-lg">{faq.question}</span>
                  <span className="transition transform group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      shapeRendering="geometricPrecision"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 py-4 border-t border-gray-200 bg-white">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No FAQs found matching your search.</p>
            </div>
          )}
        </div>

        {/* Still Have Questions Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? I'd love to help you get started on your fitness journey.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-medium"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FAQsPage
