"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  Palette,
  Type,
  Ruler,
  Layout,
  CornerDownRight,
  Layers,
  Zap,
  Save,
  RefreshCw,
  AlertTriangle,
  Database,
  Paintbrush2,
  Hash,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { HeroDashboard } from "@/components/dashboard-hero"

interface BrandingSetting {
  id: number
  setting_key: string
  setting_value: string
  setting_type: string
  category: string
  subcategory: string
  description: string
  css_variable: string
  display_order: number
}

interface ApiResponse {
  settings: BrandingSetting[]
  message?: string
  error?: string
}

export default function BrandingPage() {
  const [settings, setSettings] = useState<BrandingSetting[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [changes, setChanges] = useState<Record<string, string>>({})
  const [apiMessage, setApiMessage] = useState<string>("")
  const [hasError, setHasError] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      setHasError(false)

      const response = await fetch("/api/branding", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: ApiResponse = await response.json()

      if (data.settings && Array.isArray(data.settings)) {
        // Sort by display_order
        const sortedSettings = data.settings.sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
        setSettings(sortedSettings)
        if (data.message) {
          setApiMessage(data.message)
        }
      } else {
        throw new Error("Invalid response format - settings not found")
      }
    } catch (error) {
      console.error("Error fetching branding settings:", error)
      setHasError(true)
      setApiMessage(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
      setSettings([])

      toast({
        title: "Database Error",
        description: "Please run the branding database migration script",
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

    if (hasError) {
      toast({
        title: "Cannot Save",
        description: "Cannot save changes due to database error. Please check your database connection.",
        variant: "destructive",
      })
      return
    }

    setSaving(true)

    try {
      const promises = Object.entries(changes).map(([setting_key, setting_value]) =>
        fetch("/api/branding", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ setting_key, setting_value }),
        }),
      )

      const responses = await Promise.all(promises)
      const failedRequests = responses.filter((r) => !r.ok)

      if (failedRequests.length > 0) {
        throw new Error(`${failedRequests.length} update(s) failed`)
      }

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
        description: "Design tokens updated successfully",
      })

      // Generate and apply CSS variables
      generateCSSVariables()
    } catch (error) {
      console.error("Error saving settings:", error)
      toast({
        title: "Error",
        description: `Failed to save settings: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const generateCSSVariables = () => {
    const cssVars = settings
      .map((setting) => {
        const value = changes[setting.setting_key] || setting.setting_value
        let cssValue = value

        // Format values based on type
        if (setting.setting_type === "number") {
          if (
            setting.css_variable?.includes("font-size") ||
            setting.css_variable?.includes("spacing") ||
            setting.css_variable?.includes("radius") ||
            setting.css_variable?.includes("width")
          ) {
            cssValue = `${value}px`
          }
        }

        return `  ${setting.css_variable}: ${cssValue};`
      })
      .join("\n")

    console.log("Generated CSS Variables:\n:root {\n" + cssVars + "\n}")
  }

  const getCurrentValue = (setting: BrandingSetting) => {
    return changes[setting.setting_key] || setting.setting_value
  }

  // Group settings by category and subcategory
  const groupedSettings = settings.reduce(
    (acc, setting) => {
      if (!acc[setting.category]) {
        acc[setting.category] = {}
      }
      if (!acc[setting.category][setting.subcategory]) {
        acc[setting.category][setting.subcategory] = []
      }
      acc[setting.category][setting.subcategory].push(setting)
      return acc
    },
    {} as Record<string, Record<string, BrandingSetting[]>>,
  )

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "colours":
        return Palette
      case "typography":
        return Type
      case "spacing":
        return Ruler
      case "layout":
        return Layout
      case "border-radius":
        return CornerDownRight
      case "shadows":
        return Layers
      case "transitions":
        return Zap
      default:
        return Hash
    }
  }

  const getSubcategoryIcon = (subcategory: string) => {
    switch (subcategory) {
      case "brand":
        return Paintbrush2
      case "greyscale":
        return Hash
      case "status":
        return AlertTriangle
      default:
        return Hash
    }
  }

  const getCategoryTitle = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ")
  }

  const getSubcategoryTitle = (subcategory: string) => {
    return subcategory
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HeroDashboard title="Design System" description="Loading design tokens..." showUserGreeting={false} />
        <div className="flex items-center justify-center py-20">
          <RefreshCw className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroDashboard
        title="Design System"
        description="Manage your website's design tokens, colors, typography, and spacing"
        showUserGreeting={false}
      />

      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Status Alert */}
          {apiMessage && (
            <Alert className={`mb-6 ${hasError ? "border-red-200 bg-red-50" : "border-blue-200 bg-blue-50"}`}>
              <div className="flex items-center gap-2">
                {hasError ? (
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                ) : (
                  <Database className="h-4 w-4 text-blue-600" />
                )}
                <AlertDescription className={hasError ? "text-red-800" : "text-blue-800"}>
                  {apiMessage}
                  {hasError && (
                    <div className="mt-2">
                      <Button variant="outline" size="sm" onClick={fetchSettings} className="mr-2">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Retry
                      </Button>
                      <span className="text-sm">Run script: 012-update-branding-structure.sql</span>
                    </div>
                  )}
                </AlertDescription>
              </div>
            </Alert>
          )}

          {/* Save Changes Bar */}
          {Object.keys(changes).length > 0 && (
            <Card className="mb-8 border-primary bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">{Object.keys(changes).length} unsaved changes</Badge>
                    <span className="text-sm text-gray-600">Changes will update CSS variables across the website</span>
                  </div>
                  <Button onClick={saveChanges} disabled={saving || hasError} className="gap-2">
                    {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Design Tokens
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Design Token Categories */}
          {Object.entries(groupedSettings).map(([category, subcategories]) => {
            const CategoryIcon = getCategoryIcon(category)

            return (
              <div key={category} className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <CategoryIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-heading font-bold text-gray-900">
                      {category === "colours"
                        ? "1. "
                        : category === "typography"
                          ? "2. "
                          : category === "spacing"
                            ? "3. "
                            : category === "layout"
                              ? "4. "
                              : category === "border-radius"
                                ? "5. "
                                : category === "shadows"
                                  ? "6. "
                                  : category === "transitions"
                                    ? "7. "
                                    : ""}
                      {getCategoryTitle(category)}
                    </h1>
                    <p className="text-gray-600">Design tokens for {category.replace("-", " ")}</p>
                  </div>
                </div>

                {/* Subcategories */}
                {Object.entries(subcategories).map(([subcategory, subcategorySettings]) => {
                  const SubcategoryIcon = getSubcategoryIcon(subcategory)

                  return (
                    <div key={subcategory} className="mb-10">
                      <div className="flex items-center gap-2 mb-4">
                        <SubcategoryIcon className="w-5 h-5 text-primary" />
                        <h2 className="text-lg font-semibold text-gray-800">{getSubcategoryTitle(subcategory)}</h2>
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {subcategorySettings.map((setting) => (
                          <Card
                            key={setting.setting_key}
                            className="border-purple-200 hover:border-purple-300 transition-colors"
                          >
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-medium text-gray-900">
                                  {setting.setting_key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                                </CardTitle>
                                {changes[setting.setting_key] && (
                                  <Badge variant="outline" className="text-xs">
                                    Modified
                                  </Badge>
                                )}
                              </div>
                              <code className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded">
                                {setting.css_variable}
                              </code>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <div className="space-y-3">
                                {setting.setting_type === "color" ? (
                                  <div className="space-y-2">
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
                                        className="flex-1 font-mono text-sm"
                                        placeholder="#000000"
                                      />
                                    </div>
                                    <div
                                      className="w-full h-8 rounded border-2 border-gray-200"
                                      style={{ backgroundColor: getCurrentValue(setting) }}
                                    />
                                  </div>
                                ) : (
                                  <div className="space-y-2">
                                    <Input
                                      type={setting.setting_type === "number" ? "number" : "text"}
                                      value={getCurrentValue(setting)}
                                      onChange={(e) => handleChange(setting.setting_key, e.target.value)}
                                      className="w-full font-mono text-sm"
                                    />
                                    {setting.setting_type === "number" && (
                                      <div className="text-xs text-gray-500">
                                        Preview: {getCurrentValue(setting)}
                                        {setting.css_variable?.includes("font-size") ||
                                        setting.css_variable?.includes("spacing") ||
                                        setting.css_variable?.includes("radius") ||
                                        setting.css_variable?.includes("width")
                                          ? "px"
                                          : ""}
                                      </div>
                                    )}
                                  </div>
                                )}

                                {setting.description && <p className="text-xs text-gray-500">{setting.description}</p>}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      {subcategory !== Object.keys(subcategories)[Object.keys(subcategories).length - 1] && (
                        <Separator className="mt-8" />
                      )}
                    </div>
                  )
                })}
              </div>
            )
          })}

          {/* Empty State */}
          {settings.length === 0 && !loading && (
            <Card className="text-center py-12">
              <CardContent>
                <Database className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Design Tokens Found</h3>
                <p className="text-gray-600 mb-4">Run the database migration to set up the design system.</p>
                <Button onClick={fetchSettings} variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  )
}
