"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { currentStudent } from "@/lib/mock-data"
import { User, Bell, Shield, CreditCard, Eye, Save } from "lucide-react"

export default function SettingsPage() {
  const student = currentStudent

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile" className="gap-1.5"><User className="h-4 w-4" /> Profile</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1.5"><Bell className="h-4 w-4" /> Notifications</TabsTrigger>
          <TabsTrigger value="preferences" className="gap-1.5"><Eye className="h-4 w-4" /> Preferences</TabsTrigger>
          <TabsTrigger value="security" className="gap-1.5"><Shield className="h-4 w-4" /> Security</TabsTrigger>
          <TabsTrigger value="billing" className="gap-1.5"><CreditCard className="h-4 w-4" /> Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Profile Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={student.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={student.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue={student.name.toLowerCase().replace(" ", ".")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input id="timezone" defaultValue="America/New_York" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input id="bio" defaultValue="Passionate learner exploring the world of technology." />
              </div>
              <Button className="gap-2"><Save className="h-4 w-4" /> Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Notification Preferences</CardTitle>
              <CardDescription>Choose what notifications you receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Course Updates", desc: "Notifications about course content changes" },
                { label: "Live Class Reminders", desc: "Get reminded before live sessions start" },
                { label: "Assignment Deadlines", desc: "Reminders before assignments are due" },
                { label: "Achievement Alerts", desc: "Notifications when you earn achievements" },
                { label: "Weekly Digest", desc: "Weekly summary of your learning progress" },
                { label: "Marketing Emails", desc: "Receive promotional offers and updates" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={item.label !== "Marketing Emails"} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Learning Preferences</CardTitle>
              <CardDescription>Customize your learning experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Dark Mode", desc: "Use dark theme across the platform" },
                { label: "Compact View", desc: "Show more content with compact layouts" },
                { label: "Auto-Play Videos", desc: "Automatically play course videos" },
                { label: "Show Subtitles", desc: "Display subtitles on video content" },
                { label: "Focus Mode", desc: "Hide distractions during study sessions" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={item.label === "Auto-Play Videos"} />
                </div>
              ))}
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="language">Preferred Language</Label>
                <Input id="language" defaultValue="English" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-pw">Current Password</Label>
                <Input id="current-pw" type="password" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-pw">New Password</Label>
                  <Input id="new-pw" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-pw">Confirm Password</Label>
                  <Input id="confirm-pw" type="password" />
                </div>
              </div>
              <Button variant="outline" className="gap-2"><Shield className="h-4 w-4" /> Change Password</Button>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Two-Factor Authentication</p>
                  <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Billing & Subscription</CardTitle>
              <CardDescription>Manage your subscription and payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4 bg-gradient-to-r from-primary/5 to-accent/5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Free Plan</p>
                    <p className="text-xs text-muted-foreground">Access to free courses and basic features</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <CreditCard className="h-3.5 w-3.5" /> Upgrade
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Payment Methods</Label>
                <p className="text-sm text-muted-foreground">No payment methods saved yet.</p>
              </div>
              <Button variant="outline" size="sm">Add Payment Method</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
