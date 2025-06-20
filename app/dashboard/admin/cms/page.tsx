"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Settings,
  FileText,
  ImageIcon,
  Save,
  RefreshCw,
  Plus,
  Edit,
  Eye,
  AlertTriangle,
  CheckCircle,
  Database,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { HeroDashboard } from "@/components/dashboard-hero"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface CMSStatus {
  tablesExist: boolean
  tables: Array<{ table: string; exists: boolean; error: string | null }>
  message: string
}

export default function CMSPage() {
  const [settings, setSettings] = useState<Record<string, any>>({})
  const [pages, setPages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [changes, setChanges] = useState<Record<string, string>>({})
  const [error, setError] = useState<string | null>(null)
  const [cmsStatus, setCmsStatus] = useState<CMSStatus | null>(null)
  const [setupMode, setSetupMode] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    checkCMSStatus()
  }, [])

  const checkCMSStatus = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/cms/status", {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        // If status endpoint fails, it might be a database connection issue
        if (response.status === 500) {
          setSetupMode(true)
          setError("Database connection failed. Please check your database setup.")
          return
        }
        throw new Error(`Status check failed: ${response.status}`)
      }

      const statusData = await response.json()
      setCmsStatus(statusData)

      if (statusData.tablesExist) {
        // Tables exist, now fetch the data
        await fetchData()
      } else {
        setError("CMS tables not found. Please run the database setup script first.")
      }
    } catch (error) {
      console.error("Error checking CMS status:", error)
      setError(error instanceof Error ? error.message : "Unknown error")
      setSetupMode(true)
    } finally {
      setLoading(false)
    }
  }

  const fetchData = async () => {
    try {
      // Fetch settings
      const settingsResponse = await fetch("/api/cms/settings", {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!settingsResponse.ok) {
        const errorText = await settingsResponse.text()
        throw new Error(`Settings fetch failed: ${settingsResponse.status} - ${errorText}`)
      }

      const settingsData = await settingsResponse.json()

      // Fetch pages
      const pagesResponse = await fetch("/api/cms/pages", {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!pagesResponse.ok) {
        const errorText = await pagesResponse.text()
        throw new Error(`Pages fetch failed: ${pagesResponse.status} - ${errorText}`)
      }

      const pagesData = await pagesResponse.json()

      if (settingsData.success) {
        setSettings(settingsData.settings)
      } else {
        throw new Error(settingsData.error || "Failed to load settings")
      }

      if (pagesData.success) {
        setPages(pagesData.pages)
      } else {
        throw new Error(pagesData.error || "Failed to load pages")
      }
    } catch (error) {
      console.error("Error fetching CMS data:", error)
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      setError(errorMessage)

      toast({
        title: "Error",
        description: `Failed to load CMS data: ${errorMessage}`,
        variant: "destructive",
      })
    }
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
      const promises = Object.entries(changes).map(([key, value]) =>
        fetch("/api/cms/settings", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ setting_key: key, setting_value: value }),
        }),
      )

      const responses = await Promise.all(promises)
      const failedRequests = responses.filter((r) => !r.ok)

      if (failedRequests.length > 0) {
        throw new Error(`${failedRequests.length} update(s) failed`)
      }

      // Update local state
      setSettings((prev) => ({
        ...prev,
        ...changes,
      }))

      setChanges({})

      toast({
        title: "Success",
        description: "Settings updated successfully",
      })
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

  const handleSettingChange = (key: string, value: string) => {
    setChanges((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const getCurrentValue = (key: string) => {
    return changes[key] !== undefined ? changes[key] : settings[key] || ""
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HeroDashboard title="Content Management" description="Checking CMS status..." showUserGreeting={false} />
        <div className="flex items-center justify-center py-20">
          <RefreshCw className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  if (setupMode || error || (cmsStatus && !cmsStatus.tablesExist)) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HeroDashboard title="Content Management" description="CMS Setup Required" showUserGreeting={false} />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>CMS Setup Required:</strong> {error || cmsStatus?.message}
            </AlertDescription>
          </Alert>

          {cmsStatus && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Database Table Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {cmsStatus.tables.map((table) => (
                    <div key={table.table} className="flex items-center justify-between p-3 border rounded">
                      <span className="font-mono text-sm">{table.table}</span>
                      <div className="flex items-center gap-2">
                        {table.exists ? (
                          <Badge variant="default" className="gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Exists
                          </Badge>
                        ) : (
                          <Badge variant="destructive" className="gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            Missing
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Setup Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <p>To use the CMS, you need to run the database setup script:</p>
                <div className="bg-gray-100 p-4 rounded-md">
                  <code className="text-sm">scripts/013-create-cms-tables.sql</code>
                </div>
                <p className="text-sm text-gray-600">
                  This will create the necessary database tables and seed them with default settings.
                </p>
              </div>
              <div className="flex gap-3">
                <Button onClick={checkCMSStatus} className="gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Check Status Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroDashboard
        title="Content Management System"
        description="Manage your website content, settings, and pages"
        showUserGreeting={false}
      />

      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Save Changes Bar */}
          {Object.keys(changes).length > 0 && (
            <Card className="mb-8 border-primary bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">{Object.keys(changes).length} unsaved changes</Badge>
                    <span className="text-sm text-gray-600">Changes will be applied to your website</span>
                  </div>
                  <Button onClick={saveChanges} disabled={saving} className="gap-2">
                    {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Tabs defaultValue="settings" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </TabsTrigger>
              <TabsTrigger value="pages" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Pages
              </TabsTrigger>
              <TabsTrigger value="media" className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Media
              </TabsTrigger>
            </TabsList>

            <TabsContent value="settings" className="space-y-6">
              {Object.keys(settings).length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-gray-500">
                      No CMS settings found. The database may need to be seeded with default settings.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(settings).map(([key, value]) => (
                    <Card key={key}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">
                          {key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </CardTitle>
                        {changes[key] && (
                          <Badge variant="outline" className="text-xs w-fit">
                            Modified
                          </Badge>
                        )}
                      </CardHeader>
                      <CardContent className="pt-0">
                        {key.includes("description") || key.includes("address") ? (
                          <Textarea
                            value={getCurrentValue(key)}
                            onChange={(e) => handleSettingChange(key, e.target.value)}
                            className="w-full"
                            rows={3}
                          />
                        ) : (
                          <Input
                            type="text"
                            value={getCurrentValue(key)}
                            onChange={(e) => handleSettingChange(key, e.target.value)}
                            className="w-full"
                          />
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="pages" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Website Pages</h3>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  New Page
                </Button>
              </div>

              {pages.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-gray-500">No pages found. Create your first page to get started.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {pages.map((page) => (
                    <Card key={page.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{page.title}</h4>
                            <p className="text-sm text-gray-600">/{page.slug}</p>
                            <Badge variant={page.status === "published" ? "default" : "secondary"}>{page.status}</Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="media" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Media Library</h3>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Upload Media
                </Button>
              </div>

              <div className="text-center py-12 text-gray-500">
                <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Media management coming soon...</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
