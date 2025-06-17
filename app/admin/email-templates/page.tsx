import { Mail, CheckCircle, Folder, Clock, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { HeroSection } from "@/components/hero-section"

const templates = [
  {
    id: "1",
    name: "Welcome Email",
    description: "A warm welcome to new users.",
  },
  {
    id: "2",
    name: "Password Reset",
    description: "Instructions for resetting your password.",
  },
]

export default function EmailTemplatesPage() {
  return (
    <>
      <HeroSection title="Email Templates" description="Customize and manage your email templates." />

      {/* Metrics Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {/* Total Templates */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Templates</p>
                    <p className="text-2xl font-bold text-purple-600">2</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Templates */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Templates</p>
                    <p className="text-2xl font-bold text-purple-600">2</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Email Categories */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Categories</p>
                    <p className="text-2xl font-bold text-purple-600">2</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Folder className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Last Updated */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                    <p className="text-2xl font-bold text-purple-600">Today</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Templates Table Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Card className="border-purple-200">
            <CardHeader className="border-b border-purple-100">
              <CardTitle className="text-purple-600">Email Templates</CardTitle>
              <p className="text-muted-foreground">Manage and preview your email templates</p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-purple-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-purple-600">Template Name</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-purple-600">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-100">
                    {templates.map((template) => (
                      <tr key={template.id} className="hover:bg-purple-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                              <Mail className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{template.name}</p>
                              <p className="text-sm text-muted-foreground">{template.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="border-purple-200 text-purple-600 hover:bg-purple-50"
                          >
                            <Link href={`/admin/email-templates/${template.id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Template
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
