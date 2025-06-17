"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function FAQsPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

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

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-12 bg-muted text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about training at Diva Fitness
          </p>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-10 px-4 max-w-4xl mx-auto">
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-4 text-left flex justify-between items-center hover:bg-muted transition-colors"
                >
                  <h3 className="font-heading text-base font-semibold text-secondary pr-4">{faq.question}</h3>
                  {openFAQ === index ? (
                    <ChevronUp className="w-4 h-4 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-primary flex-shrink-0" />
                  )}
                </button>

                {openFAQ === index && (
                  <div className="px-4 pb-4">
                    <p className="text-muted-foreground leading-relaxed text-sm">{faq.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
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
