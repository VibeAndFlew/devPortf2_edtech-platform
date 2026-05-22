"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { tutorSessions } from "@/lib/mock-data"
import { Bot, MessageSquare, Star, Clock, Play, Volume2, Sparkles, ArrowRight } from "lucide-react"

const subjectIcons: Record<string, { icon: string; color: string }> = {
  Python: { icon: "🐍", color: "bg-blue-100" },
  React: { icon: "⚛️", color: "bg-cyan-100" },
  "Data Science": { icon: "📊", color: "bg-green-100" },
  Design: { icon: "🎨", color: "bg-pink-100" },
  TypeScript: { icon: "📘", color: "bg-indigo-100" },
}

const statusColors: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-800",
  completed: "bg-blue-100 text-blue-800",
  requested: "bg-amber-100 text-amber-800",
  cancelled: "bg-red-100 text-red-800",
}

export default function TutorsPage() {
  const activeSessions = tutorSessions.filter(s => s.status === "active")
  const recentSessions = tutorSessions.filter(s => s.status !== "requested").slice(0, 4)

  const subjects = [...new Set(tutorSessions.map(s => s.subject))]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Tutors</h1>
        <p className="text-sm text-muted-foreground">Get personalized help from AI tutors</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject) => (
          <Card key={subject} className="group hover:shadow-md transition-all duration-200">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 text-lg">
                  {subjectIcons[subject]?.icon || "🤖"}
                </div>
                <div>
                  <CardTitle className="text-base">{subject} Tutor</CardTitle>
                  <CardDescription>AI-powered {subject} help</CardDescription>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Get instant help with {subject.toLowerCase()} concepts, debugging, and practice problems.
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <Star className="h-3 w-3 text-yellow-500" />
                <span>4.9 rating</span>
                <span>&middot;</span>
                <Clock className="h-3 w-3" />
                <span>Available 24/7</span>
              </div>
              <Button className="w-full gap-2" size="sm">
                <Bot className="h-4 w-4" /> Start Session
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {activeSessions.length > 0 && (
        <Card className="border-2 border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                  <MessageSquare className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-800">Active Session</p>
                  <p className="text-xs text-emerald-600">{activeSessions[0].subject} &middot; {activeSessions[0].mode === "chat" ? "Chat" : "Voice"}</p>
                </div>
              </div>
              <Button size="sm" className="gap-1.5 bg-emerald-600 hover:bg-emerald-700">
                <MessageSquare className="h-3.5 w-3.5" /> Continue
              </Button>
            </div>
            <div className="rounded-lg bg-white p-3 space-y-2 max-h-32 overflow-y-auto">
              {activeSessions[0].messages.slice(-3).map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "student" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-lg px-3 py-1.5 text-xs ${
                    msg.role === "student" ? "bg-primary/10 text-foreground" : "bg-muted text-foreground"
                  }`}>
                    <p className="font-medium mb-0.5">{msg.role === "student" ? "You" : "Tutor"}</p>
                    <p>{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Session History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {recentSessions.map((session) => (
            <div key={session.id} className="flex items-center gap-3 rounded-lg border p-3 transition-all hover:shadow-sm">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-lg">
                {subjectIcons[session.subject]?.icon || "🤖"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{session.subject}</p>
                  <Badge className={`text-[10px] px-1.5 py-0 ${statusColors[session.status]}`}>
                    {session.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                  <span>{session.mode === "chat" ? "Chat" : "Voice"}</span>
                  <span>&middot;</span>
                  <span>{session.duration} min</span>
                  {session.rating && (
                    <>
                      <span>&middot;</span>
                      <span className="flex items-center gap-0.5">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        {session.rating}
                      </span>
                    </>
                  )}
                </div>
                {session.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {session.topics.map(topic => (
                      <Badge key={topic} variant="secondary" className="text-[10px] px-1.5 py-0">{topic}</Badge>
                    ))}
                  </div>
                )}
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
