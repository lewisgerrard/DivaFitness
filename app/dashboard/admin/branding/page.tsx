"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Palette, Type, Ruler, Paintbrush, Save, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import HeroDashboard from "@/components/hero-dashboard"

interface BrandingSetting {
  setting_key: string
  setting_value: string
  setting_type: string
  category: string
  description: string
}

export default function BrandingPage() {
  const [settings, setSettings] = useState<BrandingSetting[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [changes, setChanges] = useState<Record<string, string>>({})
  const { toast } = useToast()

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/branding")
      const data = await response.json()
      setSettings(data.settings || [])
    } catch (error) {
      console.error("Error fetching settings:", error)
      toast({
        title: "Error",
        description: "Failed to load branding settings",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (settingKey: string, value: string) => {
    setChanges((prev) => ({
      ...prev,
      [settingKey]: value,
    }))
  }

  const saveChanges = async () => {
    if (Object.keys(changes).length === 0) {
      toast({
        title: "No Changes",
        description: "No changes to save",
      })
      return
    }

    setSaving(true)

    try {
      // Save all changes
      const promises = Object.entries(changes).map(([setting_key, setting_value]) =>
        fetch("/api/branding", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ setting_key, setting_value }),
        }),
      )

      await Promise.all(promises)

      // Update local state
      setSettings((prev) =>
        prev.map((setting) => ({
          ...setting,
          setting_value: changes[setting.setting_key] || setting.setting_value,
        })),
      )

      setChanges({})

      toast({
        title: "Success",
        description: "Branding settings updated successfully",
      })

      // Refresh the page to apply changes
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error) {
      console.error("Error saving settings:", error)
      toast({
        title: "Error",
        description: "Failed to save branding settings",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const getCurrentValue = (setting: BrandingSetting) => {
    return changes[setting.setting_key] || setting.setting_value
  }

  const groupedSettings = settings.reduce(
    (acc, setting) => {
      if (!acc[setting.category]) {
        acc[setting.category] = []
      }
      acc[setting.category].push(setting)
      return acc
    },
    {} as Record<string, BrandingSetting[]>,
  )

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "colors":
        return Paintbrush
      case "typography":
        return Type
      case "spacing":
        return Ruler
      case "components":
        return Palette
      default:
        return Palette
    }
  }

  const getCategoryTitle = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroDashboard
        title="Branding Settings"
        description="Customize website colors, fonts, and design system"
        showUserGreeting={false}
      />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Save Changes Bar */}
        {Object.keys(changes).length > 0 && (
          <Card className="mb-8 border-primary bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">{Object.keys(changes).length} unsaved changes</Badge>
                  <span className="text-sm text-gray-600">Changes will be applied to the entire website</span>
                </div>
                <Button onClick={saveChanges} disabled={saving} className="gap-2">
                  {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Settings by Category */}
        {Object.entries(groupedSettings).map(([category, categorySettings]) => {
          const Icon = getCategoryIcon(category)

          return (
            <div key={category} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-heading font-bold text-gray-900">{getCategoryTitle(category)}</h2>
                  <p className="text-gray-600 text-sm">Customize {category} settings for your website</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categorySettings.map((setting) => (
                  <Card key={setting.setting_key} className="border-purple-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-gray-900">
                        {setting.setting_key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        {setting.setting_type === "color" ? (
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              value={getCurrentValue(setting)}
                              onChange={(e) => handleChange(setting.setting_key, e.target.value)}
                              className="w-16 h-10 p-1 border-2"
                            />
                            <Input
                              type="text"
                              value={getCurrentValue(setting)}
                              onChange={(e) => handleChange(setting.setting_key, e.target.value)}
                              className="flex-1"
                              placeholder="#000000"
                            />
                          </div>
                        ) : (
                          <Input
                            type={setting.setting_type === "number" ? "number" : "text"}
                            value={getCurrentValue(setting)}
                            onChange={(e) => handleChange(setting.setting_key, e.target.value)}
                            className="w-full"
                          />
                        )}

                        {setting.description && <p className="text-xs text-gray-500">{setting.description}</p>}

                        {changes[setting.setting_key] && (
                          <Badge variant="outline" className="text-xs">
                            Modified
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
