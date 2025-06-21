"use client"

import { useState } from "react"
import { CleanPortalLayout } from "@/components/clean-portal-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Settings, Bell, Shield, Palette } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/hooks/use-auth"

export default function SettingsPage() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    marketing: false,
  })

  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    registrationOpen: true,
    emailVerification: true,
    twoFactorAuth: false,
  })

  const handleSaveNotifications = () => {
    toast.success("Notification preferences saved!")
  }

  const handleSaveSystem = () => {
    toast.success("System settings updated!")
  }

  if (user?.role !== "admin") {
    return (
      <CleanPortalLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </div>
        </div>
      </CleanPortalLayout>
    )
  }

  return (
    <CleanPortalLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[#7b329b]">System Settings</h1>
          <p className="text-gray-600">Configure portal settings and preferences</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-[#7b329b]/5 border-[#7b329b]/20">
            <TabsTrigger value="general" className="data-[state=active]:bg-[#7b329b] data-[state=active]:text-white">
              General
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-[#7b329b] data-[state=active]:text-white"
            >
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-[#7b329b] data-[state=active]:text-white">
              Security
            </TabsTrigger>
            <TabsTrigger value="branding" className="data-[state=active]:bg-[#7b329b] data-[state=active]:text-white">
              Branding
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card className="border-[#7b329b]/20 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-[#7b329b]/5 to-white border-b border-[#7b329b]/20">
                <CardTitle className="flex items-center gap-2 text-[#7b329b]">
                  <Settings className="w-5 h-5" />
                  General Settings
                </CardTitle>
                <CardDescription>Basic portal configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="site-name">Site Name</Label>
                    <Input
                      id="site-name"
                      defaultValue="Diva Fitness Portal"
                      className="border-[#7b329b]/20 focus:border-[#7b329b] focus:ring-[#7b329b]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      defaultValue="admin@divafitness.com"
                      className="border-[#7b329b]/20 focus:border-[#7b329b] focus:ring-[#7b329b]"
                    />
                  </div>
                </div>

                <Separator className="bg-[#7b329b]/20" />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                        <p className="text-sm text-gray-600">Temporarily disable public access</p>
                      </div>
                      <Switch
                        id="maintenance-mode"
                        checked={systemSettings.maintenanceMode}
                        onCheckedChange={(checked) =>
                          setSystemSettings({ ...systemSettings, maintenanceMode: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="registration-open">Open Registration</Label>
                        <p className="text-sm text-gray-600">Allow new user registrations</p>
                      </div>
                      <Switch
                        id="registration-open"
                        checked={systemSettings.registrationOpen}
                        onCheckedChange={(checked) =>
                          setSystemSettings({ ...systemSettings, registrationOpen: checked })
                        }
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={handleSaveSystem} className="bg-[#7b329b] hover:bg-[#6b2c87]">
                  Save General Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-[#7b329b]/20 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-[#7b329b]/5 to-white border-b border-[#7b329b]/20">
                <CardTitle className="flex items-center gap-2 text-[#7b329b]">
                  <Bell className="w-5 h-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>Configure how users receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Default Notification Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-gray-600">Send notifications via email</p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={notifications.email}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push-notifications">Push Notifications</Label>
                        <p className="text-sm text-gray-600">Send browser push notifications</p>
                      </div>
                      <Switch
                        id="push-notifications"
                        checked={notifications.push}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sms-notifications">SMS Notifications</Label>
                        <p className="text-sm text-gray-600">Send text message notifications</p>
                      </div>
                      <Switch
                        id="sms-notifications"
                        checked={notifications.sms}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="marketing-emails">Marketing Emails</Label>
                        <p className="text-sm text-gray-600">Send promotional content</p>
                      </div>
                      <Switch
                        id="marketing-emails"
                        checked={notifications.marketing}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={handleSaveNotifications} className="bg-[#7b329b] hover:bg-[#6b2c87]">
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="border-[#7b329b]/20 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-[#7b329b]/5 to-white border-b border-[#7b329b]/20">
                <CardTitle className="flex items-center gap-2 text-[#7b329b]">
                  <Shield className="w-5 h-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>Configure security and authentication options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Authentication</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-verification">Email Verification Required</Label>
                        <p className="text-sm text-gray-600">Require email verification for new accounts</p>
                      </div>
                      <Switch
                        id="email-verification"
                        checked={systemSettings.emailVerification}
                        onCheckedChange={(checked) =>
                          setSystemSettings({ ...systemSettings, emailVerification: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-600">Enable 2FA for admin accounts</p>
                      </div>
                      <Switch
                        id="two-factor"
                        checked={systemSettings.twoFactorAuth}
                        onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, twoFactorAuth: checked })}
                      />
                    </div>
                  </div>
                </div>

                <Separator className="bg-[#7b329b]/20" />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Password Policy</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="min-length">Minimum Length</Label>
                      <Input
                        id="min-length"
                        type="number"
                        defaultValue="8"
                        className="border-[#7b329b]/20 focus:border-[#7b329b] focus:ring-[#7b329b]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                      <Input
                        id="session-timeout"
                        type="number"
                        defaultValue="60"
                        className="border-[#7b329b]/20 focus:border-[#7b329b] focus:ring-[#7b329b]"
                      />
                    </div>
                  </div>
                </div>

                <Button className="bg-[#7b329b] hover:bg-[#6b2c87]">Save Security Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="branding" className="space-y-6">
            <Card className="border-[#7b329b]/20 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-[#7b329b]/5 to-white border-b border-[#7b329b]/20">
                <CardTitle className="flex items-center gap-2 text-[#7b329b]">
                  <Palette className="w-5 h-5" />
                  Branding Settings
                </CardTitle>
                <CardDescription>Customize the portal appearance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primary-color"
                        defaultValue="#7b329b"
                        className="border-[#7b329b]/20 focus:border-[#7b329b] focus:ring-[#7b329b]"
                      />
                      <div
                        className="w-10 h-10 rounded border border-[#7b329b]/20"
                        style={{ backgroundColor: "#7b329b" }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logo-url">Logo URL</Label>
                    <Input
                      id="logo-url"
                      defaultValue="/diva-logo-fitness.png"
                      className="border-[#7b329b]/20 focus:border-[#7b329b] focus:ring-[#7b329b]"
                    />
                  </div>
                </div>

                <Button className="bg-[#7b329b] hover:bg-[#6b2c87]">Save Branding Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CleanPortalLayout>
  )
}
