"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { assignments } from "@/lib/mock-data"
import { Calendar, Clock, FileText, Code, PenTool, Users, AlertCircle } from "lucide-react"

const typeIcons: Record<string, React.ReactNode> = {
  quiz: <FileText className="h-4 w-4" />,
  essay: <PenTool className="h-4 w-4" />,
  project: <Code className="h-4 w-4" />,
  coding: <Code className="h-4 w-4" />,
  presentation: <Presentation className="h-4 w-4" />,
}

const typeColors: Record<string, string> = {
  quiz: "bg-purple-100 text-purple-800",
  essay: "bg-amber-100 text-amber-800",
  project: "bg-blue-100 text-blue-800",
  coding: "bg-emerald-100 text-emerald-800",
  presentation: "bg-pink-100 text-pink-800",
}

function getDaysLeft(dueDate: string): { days: number; urgent: boolean } {
  const due = new Date(dueDate)
  const now = new Date()
  const diff = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  return { days: Math.max(0, diff), urgent: diff <= 2 && diff >= 0 }
}

export default function AssignmentsPage() {
  const openAssignments = assignments.filter(a => a.status === "open")
  const gradingAssignments = assignments.filter(a => a.status === "grading")
  const closedAssignments = assignments.filter(a => a.status === "closed")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Assignments</h1>
        <p className="text-sm text-muted-foreground">Track and submit your assignments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{openAssignments.length}</p>
              <p className="text-xs text-muted-foreground">Open Assignments</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-200">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{gradingAssignments.length}</p>
              <p className="text-xs text-muted-foreground">Being Graded</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
              <FileText className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{closedAssignments.length}</p>
              <p className="text-xs text-muted-foreground">Closed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-blue-500" /> Open Assignments
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {openAssignments.map((a) => {
            const { days, urgent } = getDaysLeft(a.dueDate)
            return (
              <Card key={a.id} className={`${urgent ? "border-red-200 bg-red-50/50" : ""}`}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${typeColors[a.type]}`}>
                        {typeIcons[a.type]}
                      </div>
                      <div>
                        <CardTitle className="text-sm">{a.title}</CardTitle>
                        <CardTitle className="text-xs font-normal text-muted-foreground">{a.course}</CardTitle>
                      </div>
                    </div>
                    <Badge className={`text-[10px] px-1.5 py-0 ${typeColors[a.type]}`}>{a.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs text-muted-foreground line-clamp-1">{a.description}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className={`flex items-center gap-1 ${urgent ? "text-red-600 font-medium" : ""}`}>
                      <Calendar className="h-3 w-3" />
                      {days === 0 ? "Due today!" : `${days} days left`}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {a.submitted}/{a.submitted + a.pending} submitted
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      Max: {a.maxScore}
                    </span>
                  </div>
                  <Progress value={(a.submitted / (a.submitted + a.pending)) * 100} className="h-1.5" />
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {gradingAssignments.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4 text-amber-500" /> Being Graded
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {gradingAssignments.map((a) => (
              <Card key={a.id} className="border-amber-200">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${typeColors[a.type]}`}>
                        {typeIcons[a.type]}
                      </div>
                      <div>
                        <CardTitle className="text-sm">{a.title}</CardTitle>
                        <CardTitle className="text-xs font-normal text-muted-foreground">{a.course}</CardTitle>
                      </div>
                    </div>
                    <Badge variant="warning" className="text-[10px] px-1.5 py-0">Grading</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {a.submitted} submitted
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      Max: {a.maxScore}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {closedAssignments.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" /> Closed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {closedAssignments.map((a) => (
              <Card key={a.id} className="opacity-70">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${typeColors[a.type]}`}>
                        {typeIcons[a.type]}
                      </div>
                      <div>
                        <CardTitle className="text-sm">{a.title}</CardTitle>
                        <CardTitle className="text-xs font-normal text-muted-foreground">{a.course}</CardTitle>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">Closed</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">Due date has passed</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function Presentation({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
    </svg>
  )
}
