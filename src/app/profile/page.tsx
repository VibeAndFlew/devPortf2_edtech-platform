"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { currentStudent, courses, assignments, certificates } from "@/lib/mock-data"
import {
  User, Trophy, Flame, Zap, Star, BookOpen, CheckCircle, Clock, Award,
  Calendar, Target, TrendingUp, Code, Palette, BarChart, Globe,
} from "lucide-react"

export default function ProfilePage() {
  const student = currentStudent
  const nextLevelExp = student.level * 1000
  const currentExp = student.points % 1000 || 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-sm text-muted-foreground">Your learning stats and achievements</p>
      </div>

      <Card className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-0">
        <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
          <Avatar className="h-20 w-20 ring-4 ring-primary/20">
            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-2xl font-bold">
              {student.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-bold">{student.name}</h2>
            <p className="text-sm text-muted-foreground">{student.email}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2">
              <Badge variant="secondary" className="gap-1">
                <Calendar className="h-3 w-3" /> Joined {student.joinDate}
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <Zap className="h-3 w-3 text-primary" /> Level {student.level}
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <Flame className="h-3 w-3 text-orange-500" /> {student.streak} day streak
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Enrolled", value: student.enrolledCourses, icon: BookOpen, color: "text-blue-600", bg: "bg-blue-100" },
          { label: "Completed", value: student.completedCourses, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-100" },
          { label: "Hours Learned", value: student.totalHours, icon: Clock, color: "text-purple-600", bg: "bg-purple-100" },
          { label: "Points", value: student.points.toLocaleString(), icon: Zap, color: "text-primary", bg: "bg-primary/10" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`rounded-full ${stat.bg} p-2.5`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <div>
                <p className="text-lg font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-500" /> Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            {student.achievements.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {student.achievements.map((ach) => (
                  <div key={ach} className="flex items-center gap-2 rounded-lg border p-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
                      <Trophy className="h-4 w-4 text-yellow-600" />
                    </div>
                    <span className="text-xs font-medium">{ach}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No achievements yet. Keep learning!</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" /> Level Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-sm text-muted-foreground">Lv.{student.level}</span>
                <Zap className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Lv.{student.level + 1}</span>
              </div>
              <Progress value={(currentExp / 1000) * 100} className="h-2.5 w-full" />
              <p className="text-xs text-muted-foreground mt-1.5">{currentExp} / 1000 XP to next level</p>
            </div>
            <Separator />
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Points Breakdown</p>
              {[
                { label: "Course Completions", points: 2400, icon: CheckCircle },
                { label: "Daily Streaks", points: 1200, icon: Flame },
                { label: "Assignment Scores", points: 680, icon: Star },
                { label: "Live Class Attendance", points: 300, icon: Clock },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <item.icon className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{item.label}</span>
                  </div>
                  <span className="font-medium">+{item.points}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" /> Course History
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {courses.filter(c => c.progress !== undefined).map((course) => (
            <div key={course.id} className="flex items-center gap-4 rounded-lg border p-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                course.category === "Programming" ? "bg-blue-100 text-blue-600" :
                course.category === "Design" ? "bg-pink-100 text-pink-600" :
                course.category === "Data Science" ? "bg-green-100 text-green-600" :
                "bg-purple-100 text-purple-600"
              }`}>
                {course.category === "Programming" ? <Code className="h-5 w-5" /> :
                 course.category === "Design" ? <Palette className="h-5 w-5" /> :
                 course.category === "Data Science" ? <BarChart className="h-5 w-5" /> :
                 <Globe className="h-5 w-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{course.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Progress value={course.progress} className="h-1.5 w-28" />
                  <span className="text-xs text-muted-foreground">{course.progress}%</span>
                </div>
              </div>
              <Badge variant="secondary" className="text-xs">{course.level}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
