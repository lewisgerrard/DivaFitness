"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminPageHeader } from "@/components/admin-page-header"
import { Layers, Eye, User, Mail, Phone, MapPin, Clock, Star, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Component {
  title: string
  description: string
  preview: React.ReactNode
}

export default function ComponentsPage() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null)
  const router = useRouter()

  const components: Component[] = [
    {
      title: "Hero Section",
      description: "Main banner component with call-to-action buttons and background imagery",
      preview: (
        <div className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 text-white p-12 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Transform Your Body,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">
                Transform Your Life
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100 leading-relaxed max-w-3xl mx-auto">
              Experience personalized fitness training in our beautiful, fully-equipped studio designed for your success
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg">
                Member Portal
              </button>
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg">
                Client Portal
              </button>
              <button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg">
                Admin Panel
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Navigation Bar",
      description: "Top navigation with logo, menu items, and user authentication controls",
      preview: (
        <div className="bg-gradient-to-r from-purple-900 to-purple-800 text-white p-4 rounded-lg">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold text-lg">D</span>
              </div>
              <span className="text-2xl font-bold">Diva Fitness</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <span className="hover:text-purple-300 cursor-pointer">Home</span>
              <span className="hover:text-purple-300 cursor-pointer">About</span>
              <span className="hover:text-purple-300 cursor-pointer">Services</span>
              <span className="hover:text-purple-300 cursor-pointer">FAQs</span>
              <span className="hover:text-purple-300 cursor-pointer">Contact</span>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                <User className="w-4 h-4" />
                <span>Lewis</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Contact Form",
      description: "Multi-field form for customer inquiries with validation and email integration",
      preview: (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Send me a message</h3>
            <p className="text-gray-600">Get in touch and I'll get back to you as soon as possible</p>
          </div>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="First Name"
              />
              <input
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Last Name"
              />
            </div>
            <input
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Email Address"
            />
            <input
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Phone Number"
            />
            <textarea
              className="w-full p-4 border border-gray-200 rounded-xl h-32 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Your Message"
            ></textarea>
            <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300">
              Send Message
            </button>
          </div>
        </div>
      ),
    },
    {
      title: "Service Cards",
      description: "Display cards showcasing fitness services with images and descriptions",
      preview: (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-purple-100">
            <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-400"></div>
            <div className="p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">Personal Training</h4>
              <p className="text-gray-600 mb-4">One-on-one personalized fitness sessions tailored to your goals</p>
              <div className="text-2xl font-bold text-purple-600">£80/session</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-purple-100">
            <div className="h-48 bg-gradient-to-br from-pink-400 to-purple-400"></div>
            <div className="p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">Small Group Training</h4>
              <p className="text-gray-600 mb-4">Train with friends in small groups for motivation and fun</p>
              <div className="text-2xl font-bold text-purple-600">£35/session</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-purple-100">
            <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-400"></div>
            <div className="p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">Nutrition Coaching</h4>
              <p className="text-gray-600 mb-4">Comprehensive nutrition guidance to complement your fitness journey</p>
              <div className="text-2xl font-bold text-purple-600">£60/session</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Review Carousel",
      description: "Rotating testimonials and customer reviews with star ratings",
      preview: (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100">
          <div className="text-center max-w-2xl mx-auto">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-xl text-gray-700 mb-6 italic leading-relaxed">
              "Emma has completely transformed my approach to fitness. Her personalized training and nutrition guidance
              have helped me achieve results I never thought possible. The studio is beautiful and the atmosphere is so
              welcoming!"
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                S
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Sarah Johnson</div>
                <div className="text-gray-600 text-sm">Client since 2023</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Footer",
      description: "Site footer with contact information, social links, and navigation",
      preview: (
        <div className="bg-gradient-to-r from-purple-900 to-purple-800 text-white p-8 rounded-lg">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold">D</span>
                </div>
                <span className="text-xl font-bold">Diva Fitness</span>
              </div>
              <p className="text-purple-200 text-sm">
                Transform your body, transform your life with personalized fitness training.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm text-purple-200">
                <div>About</div>
                <div>Services</div>
                <div>FAQs</div>
                <div>Contact</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-sm text-purple-200">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>123 Fitness Street, City</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+44 123 456 7890</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>hello@divafitness.com</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                  f
                </div>
                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-xs font-bold">
                  ig
                </div>
                <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-xs font-bold">
                  tw
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-purple-700 mt-8 pt-6 text-center text-sm text-purple-300">
            <p>&copy; 2024 Diva Fitness. All rights reserved.</p>
          </div>
        </div>
      ),
    },
    {
      title: "Image Gallery",
      description: "Interactive photo gallery with lightbox functionality for studio images",
      preview: (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Studio Gallery</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="aspect-square bg-gradient-to-br from-purple-200 to-pink-200 rounded-xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-purple-600 font-semibold">
                Studio Interior
              </div>
            </div>
            <div className="aspect-square bg-gradient-to-br from-pink-200 to-purple-200 rounded-xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-purple-600 font-semibold">
                Equipment
              </div>
            </div>
            <div className="aspect-square bg-gradient-to-br from-purple-200 to-pink-200 rounded-xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-purple-600 font-semibold">
                Training Area
              </div>
            </div>
            <div className="aspect-square bg-gradient-to-br from-pink-200 to-purple-200 rounded-xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-purple-600 font-semibold">
                Exterior
              </div>
            </div>
            <div className="aspect-square bg-gradient-to-br from-purple-200 to-pink-200 rounded-xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-purple-600 font-semibold">Garden</div>
            </div>
            <div className="aspect-square bg-gradient-to-br from-pink-200 to-purple-200 rounded-xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-purple-600 font-semibold">
                Action Shot
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "CTA Section",
      description: "Call-to-action sections with buttons and promotional content",
      preview: (
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-12 rounded-2xl text-center">
          <h3 className="text-4xl font-bold mb-4">Ready to Transform Your Life?</h3>
          <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who have achieved their fitness goals with personalized training at Diva
            Fitness
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 hover:bg-purple-50 font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg">
              Start Your Journey
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      ),
    },
    {
      title: "Studio Showcase",
      description: "Visual presentation of studio facilities and equipment",
      preview: (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="aspect-video bg-gradient-to-br from-purple-200 to-pink-200 rounded-xl flex items-center justify-center">
              <span className="text-purple-600 font-semibold text-lg">Studio Video</span>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">State-of-the-Art Facility</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our beautiful studio features modern equipment, natural lighting, and a welcoming atmosphere designed to
                inspire your fitness journey.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Professional-grade equipment</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Spacious training areas</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Natural lighting throughout</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Opening Hours",
      description: "Display component for business hours and availability",
      preview: (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-bold text-gray-900">Opening Hours</h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="font-medium text-gray-700">Monday - Friday</span>
              <span className="text-purple-600 font-semibold">6:00 AM - 10:00 PM</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="font-medium text-gray-700">Saturday</span>
              <span className="text-purple-600 font-semibold">8:00 AM - 8:00 PM</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="font-medium text-gray-700">Sunday</span>
              <span className="text-purple-600 font-semibold">9:00 AM - 6:00 PM</span>
            </div>
          </div>
          <div className="mt-6 p-4 bg-purple-50 rounded-xl">
            <p className="text-sm text-purple-700 text-center">
              <strong>Note:</strong> Sessions available by appointment only
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Google Map",
      description: "Embedded map component showing studio location",
      preview: (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100">
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-bold text-gray-900">Find Us</h4>
          </div>
          <div className="aspect-video bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center border-2 border-dashed border-green-300">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-green-600 mx-auto mb-2" />
              <span className="text-green-700 font-semibold text-lg">Interactive Map</span>
              <p className="text-green-600 text-sm mt-1">Diva Fitness Studio Location</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 text-center">123 Fitness Street, Your City, Postcode</p>
          </div>
        </div>
      ),
    },
    {
      title: "Social Links",
      description: "Social media icons and links for external platforms",
      preview: (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100">
          <div className="text-center mb-6">
            <h4 className="text-xl font-bold text-gray-900 mb-2">Follow Our Journey</h4>
            <p className="text-gray-600">Stay connected for fitness tips, client success stories, and studio updates</p>
          </div>
          <div className="flex justify-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg hover:scale-110 transition-transform cursor-pointer shadow-lg">
              f
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm hover:scale-110 transition-transform cursor-pointer shadow-lg">
              ig
            </div>
            <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold text-lg hover:scale-110 transition-transform cursor-pointer shadow-lg">
              tw
            </div>
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg hover:scale-110 transition-transform cursor-pointer shadow-lg">
              yt
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Admin Page Header",
      description: "Reusable header component for admin pages with icon, title, and description",
      preview: (
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-purple-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings Panel</h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                Configure website content, navigation, and settings
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ]

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("auth-token")

      if (!token) {
        console.log("No token found, redirecting to login")
        router.push("/login")
        return
      }

      const response = await fetch("/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        localStorage.removeItem("auth-token")
        router.push("/login")
      }
    } catch (error) {
      console.error("Components auth check error:", error)
      router.push("/login")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading components...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You don't have permission to access this page.</p>
          <Button onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <AdminPageHeader icon={Layers} title="Components" description="Manage UI components and design elements" />

        {/* Components Table */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-50 to-purple-100">
                <tr>
                  <th className="px-8 py-6 text-left text-sm font-semibold text-purple-700 uppercase tracking-wider">
                    Component Title
                  </th>
                  <th className="px-8 py-6 text-left text-sm font-semibold text-purple-700 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-8 py-6 text-center text-sm font-semibold text-purple-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {components.map((component, index) => (
                  <tr key={index} className="hover:bg-purple-50 transition-colors duration-150">
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="text-lg font-semibold text-gray-900">{component.title}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-gray-600 leading-relaxed">{component.description}</div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedComponent(component)}
                        className="border-purple-200 text-purple-600 hover:bg-purple-50"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Component Preview Dialog */}
        <Dialog open={!!selectedComponent} onOpenChange={() => setSelectedComponent(null)}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-purple-700">{selectedComponent?.title}</DialogTitle>
            </DialogHeader>
            <div className="mt-6">
              <p className="text-gray-600 mb-6">{selectedComponent?.description}</p>
              <div className="border-2 border-dashed border-purple-200 rounded-xl p-6 bg-purple-50/30">
                <div className="bg-white rounded-lg p-4 shadow-sm">{selectedComponent?.preview}</div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Back to Settings */}
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            onClick={() => router.push("/admin/settings")}
            className="border-purple-200 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-xl"
          >
            ← Back to Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
