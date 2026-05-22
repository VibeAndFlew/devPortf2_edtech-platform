"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { currentStudent, courses, liveClasses, activities } from "@/lib/mock-data"
import {
  BookOpen, CheckCircle, Clock, Trophy, Flame, Zap, Star, Video, ArrowRight, TrendingUp,
  GraduationCap, Users, Code, Palette, BarChart, Globe,
} from "lucide-react"

const categoryIcons: Record<string, React.ReactNode> = {
  Programming: <Code className="h-4 w-4" />,
  Design: <Palette className="h-4 w-4" />,
  "Data Science": <BarChart className="h-4 w-4" />,
  Business: <TrendingUp className="h-4 w-4" />,
  Languages: <Globe className="h-4 w-4" />,
}

export default function DashboardPage() {
  const student = currentStudent
  const continueCourses = courses.filter(c => c.progress && c.progress > 0 && c.progress < 100)
  const upcomingLive = liveClasses.filter(l => l.status === "upcoming" || l.status === "live").slice(0, 4)

  const kpis = [
    { label: "Enrolled", value: student.enrolledCourses, icon: BookOpen, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Completed", value: student.completedCourses, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-100" },
    { label: "Hours", value: student.totalHours, icon: Clock, color: "text-purple-600", bg: "bg-purple-100" },
    { label: "Achievements", value: student.achievements.length, icon: Trophy, color: "text-yellow-600", bg: "bg-yellow-100" },
    { label: "Streak", value: `${student.streak}d`, icon: Flame, color: "text-orange-600", bg: "bg-orange-100" },
    { label: "Points", value: student.points.toLocaleString(), icon: Zap, color: "text-primary", bg: "bg-primary/10" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Track your learning journey</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 px-3 py-1.5">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium">{student.streak} day streak</span>
          </div>
          <Button size="sm">Start Learning</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="border-0 shadow-sm">
            <CardContent className="p-4 flex flex-col items-center gap-1.5 text-center">
              <div className={`rounded-full ${kpi.bg} p-2`}>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </div>
              <span className="text-xl font-bold">{kpi.value}</span>
              <span className="text-xs text-muted-foreground">{kpi.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Continue Learning</CardTitle>
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                View All <ArrowRight className="h-3 w-3" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {continueCourses.map((course) => (
                <div key={course.id} className="group flex items-center gap-4 rounded-lg border p-3 transition-all hover:shadow-sm">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                    course.category === "Programming" ? "bg-blue-100 text-blue-600" :
                    course.category === "Design" ? "bg-pink-100 text-pink-600" :
                    course.category === "Data Science" ? "bg-green-100 text-green-600" :
                    "bg-purple-100 text-purple-600"
                  }`}>
                    {categoryIcons[course.category] || <BookOpen className="h-5 w-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{course.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress value={course.progress} className="h-1.5 w-24" />
                      <span className="text-xs text-muted-foreground">{course.progress}%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <BookOpen className="h-3 w-3" />
                    {course.lessons} lessons
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {continueCourses.length === 0 && (
                <p className="text-sm text-muted-foreground py-4 text-center">No courses in progress. Enroll in one to get started!</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Learning Path</CardTitle>
              <Badge variant="secondary" className="text-xs">Level {student.level}</Badge>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-muted" />
                <div className="space-y-6">
                  {[
                    { title: "Python Fundamentals", progress: 65, status: "In Progress" },
                    { title: "React & Next.js Mastery", progress: 30, status: "In Progress" },
                    { title: "Motion Design", progress: 10, status: "Just Started" },
                    { title: "Advanced TypeScript", progress: 15, status: "In Progress" },
                  ].map((item, i) => (
                    <div key={i} className="relative flex items-start gap-4 pl-10">
                      <div className={`absolute left-2.5 top-1 h-4 w-4 rounded-full border-2 ${
                        item.progress === 100 ? "bg-primary border-primary" : "bg-background border-muted-foreground"
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={item.progress} className="h-1.5 w-32" />
                          <span className="text-xs text-muted-foreground">{item.progress}%</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Video className="h-4 w-4 text-primary" />
                Upcoming Live Classes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {upcomingLive.map((live) => (
                <div key={live.id} className="flex items-start gap-3 rounded-lg border p-3">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    live.status === "live" ? "bg-red-100 text-red-600 animate-pulse" : "bg-primary/10 text-primary"
                  }`}>
                    <Video className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{live.title}</p>
                    <p className="text-xs text-muted-foreground">{live.date} at {live.time}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={live.status === "live" ? "destructive" : "secondary"} className="text-[10px] px-1.5 py-0">
                        {live.status === "live" ? "LIVE" : "Upcoming"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        <Users className="h-3 w-3 inline mr-0.5" />
                        {live.attendees}/{live.maxAttendees}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {upcomingLive.length === 0 && (
                <p className="text-sm text-muted-foreground py-3 text-center">No upcoming classes</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-72 overflow-y-auto">
              {activities.slice(0, 6).map((act) => (
                <div key={act.id} className="flex items-start gap-3">
                  <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                    act.type === "completed" ? "bg-emerald-100 text-emerald-600" :
                    act.type === "achievement" ? "bg-yellow-100 text-yellow-600" :
                    act.type === "live_class" ? "bg-red-100 text-red-600" :
                    act.type === "certificate" ? "bg-purple-100 text-purple-600" :
                    "bg-blue-100 text-blue-600"
                  }`}>
                    {act.type === "enrolled" ? <BookOpen className="h-3.5 w-3.5" /> :
                     act.type === "completed" ? <CheckCircle className="h-3.5 w-3.5" /> :
                     act.type === "achievement" ? <Trophy className="h-3.5 w-3.5" /> :
                     act.type === "live_class" ? <Video className="h-3.5 w-3.5" /> :
                     act.type === "certificate" ? <GraduationCap className="h-3.5 w-3.5" /> :
                     <ClipboardList className="h-3.5 w-3.5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{act.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{act.description}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{act.timestamp}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function ClipboardList({ className }: { className?: string }) {
  return <ClipboardListIcon className={className} />
}

function ClipboardListIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  )
}
