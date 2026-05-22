"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { liveClasses } from "@/lib/mock-data"
import { Video, Users, Clock, Calendar, Download, Play, Circle, AlertCircle } from "lucide-react"

export default function LivePage() {
  const liveNow = liveClasses.filter(l => l.status === "live")
  const upcoming = liveClasses.filter(l => l.status === "upcoming")
  const recorded = liveClasses.filter(l => l.status === "recorded")
  const cancelled = liveClasses.filter(l => l.status === "cancelled")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Live Classes</h1>
        <p className="text-sm text-muted-foreground">Join interactive live sessions</p>
      </div>

      {liveNow.length > 0 && (
        <Card className="border-2 border-red-200 bg-gradient-to-r from-red-50 to-orange-50">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <Circle className="h-5 w-5 text-red-500 fill-red-500 animate-pulse" />
              </div>
              <div>
                <p className="text-sm text-red-600 font-medium">Live Now</p>
                <p className="text-lg font-bold">{liveNow[0].title}</p>
                <p className="text-sm text-muted-foreground">{liveNow[0].instructor} &middot; {liveNow[0].course}</p>
              </div>
            </div>
            <Button className="bg-red-600 hover:bg-red-700 gap-2">
              <Play className="h-4 w-4 fill-white" /> Join Now
            </Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" /> Upcoming Classes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcoming.map((cls) => (
            <div key={cls.id} className="flex items-center justify-between rounded-lg border p-4 transition-all hover:shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Video className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{cls.title}</p>
                  <p className="text-xs text-muted-foreground">{cls.instructor} &middot; {cls.course}</p>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{cls.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{cls.time} ({cls.duration}min)</span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {cls.attendees}/{cls.maxAttendees}
                    </span>
                  </div>
                </div>
              </div>
              <Button size="sm" className="gap-1.5">
                <Bell className="h-3.5 w-3.5" /> Remind Me
              </Button>
            </div>
          ))}
          {upcoming.length === 0 && <p className="text-sm text-muted-foreground py-4 text-center">No upcoming classes scheduled</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Play className="h-4 w-4 text-muted-foreground" /> Recorded Classes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recorded.map((cls) => (
            <div key={cls.id} className="flex items-center justify-between rounded-lg border p-4 transition-all hover:shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Play className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">{cls.title}</p>
                  <p className="text-xs text-muted-foreground">{cls.instructor} &middot; {cls.course}</p>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{cls.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{cls.duration}min</span>
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" />{cls.attendees} attended</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Play className="h-3.5 w-3.5" /> Watch
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {recorded.length === 0 && <p className="text-sm text-muted-foreground py-4 text-center">No recorded classes yet</p>}
        </CardContent>
      </Card>

      {cancelled.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-muted-foreground" /> Cancelled
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {cancelled.map((cls) => (
              <div key={cls.id} className="flex items-center gap-3 rounded-lg border border-red-100 p-3 bg-red-50/50">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-red-800">{cls.title}</p>
                  <p className="text-xs text-red-600">{cls.date} &middot; {cls.time}</p>
                </div>
                <Badge variant="destructive" className="ml-auto text-xs">Cancelled</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function Bell({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
  )
}
