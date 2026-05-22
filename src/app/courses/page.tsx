"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { courses } from "@/lib/mock-data"
import { Search, Star, Users, BookOpen, Clock, GraduationCap, Filter } from "lucide-react"

const levelColors: Record<string, string> = {
  beginner: "bg-emerald-100 text-emerald-800 border-emerald-200",
  intermediate: "bg-blue-100 text-blue-800 border-blue-200",
  advanced: "bg-purple-100 text-purple-800 border-purple-200",
  expert: "bg-red-100 text-red-800 border-red-200",
}

const categories = ["All", "Programming", "Design", "Data Science", "Business", "Languages"]

export default function CoursesPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [view, setView] = useState<"all" | "enrolled">("all")

  const filteredCourses = courses.filter(c => {
    if (category !== "All" && c.category !== category) return false
    if (search && !c.title.toLowerCase().includes(search.toLowerCase()) && !c.instructor.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Courses</h1>
        <p className="text-sm text-muted-foreground">Discover and enroll in courses</p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses or instructors..."
            className="pl-9"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Tabs value={view} onValueChange={(v) => setView(v as "all" | "enrolled")}>
            <TabsList>
              <TabsTrigger value="all">All Courses</TabsTrigger>
              <TabsTrigger value="enrolled">Enrolled</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Tabs value={category} onValueChange={setCategory}>
        <TabsList className="flex-wrap h-auto">
          {categories.map(cat => (
            <TabsTrigger key={cat} value={cat} className="text-xs">{cat}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="group overflow-hidden border hover:shadow-md transition-all duration-200">
            <div className={`h-36 flex items-center justify-center ${
              course.category === "Programming" ? "bg-gradient-to-br from-blue-500/10 to-blue-600/5" :
              course.category === "Design" ? "bg-gradient-to-br from-pink-500/10 to-pink-600/5" :
              course.category === "Data Science" ? "bg-gradient-to-br from-green-500/10 to-green-600/5" :
              course.category === "Business" ? "bg-gradient-to-br from-amber-500/10 to-amber-600/5" :
              "bg-gradient-to-br from-purple-500/10 to-purple-600/5"
            }`}>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/80 shadow-sm">
                {course.category === "Programming" ? <BookOpen className="h-7 w-7 text-blue-600" /> :
                 course.category === "Design" ? <svg className="h-7 w-7 text-pink-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg> :
                 course.category === "Data Science" ? <BarChart3 className="h-7 w-7 text-green-600" /> :
                 course.category === "Business" ? <TrendingUp className="h-7 w-7 text-amber-600" /> :
                 <Globe className="h-7 w-7 text-purple-600" />}
              </div>
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base truncate">{course.title}</CardTitle>
                  <CardDescription className="text-xs mt-0.5">{course.instructor}</CardDescription>
                </div>
                <Badge className={`ml-2 text-[10px] px-1.5 py-0 border ${levelColors[course.level]}`}>
                  {course.level}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2 space-y-2">
              <p className="text-xs text-muted-foreground line-clamp-2">{course.description}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Star className="h-3 w-3 text-yellow-500" />{course.rating}</span>
                <span className="flex items-center gap-1"><Users className="h-3 w-3" />{course.enrolled}</span>
                <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" />{course.lessons}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{course.duration}</span>
              </div>
              {course.progress !== undefined && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-1.5" />
                </div>
              )}
              <div className="flex flex-wrap gap-1">
                {course.tags.slice(0, 2).map(tag => (
                  <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">{tag}</Badge>
                ))}
                {course.certificate && (
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-emerald-600 border-emerald-200">Certificate</Badge>
                )}
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button className="w-full" variant={course.progress ? "secondary" : "default"} size="sm">
                {course.progress ? "Continue" : course.price === 0 ? "Enroll Free" : `$${course.price}`}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

function BarChart3({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  )
}

function TrendingUp({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
  )
}

function Globe({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  )
}
