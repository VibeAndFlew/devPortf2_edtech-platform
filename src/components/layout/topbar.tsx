"use client"
import { Bell, Zap, Trophy, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { currentStudent } from "@/lib/mock-data"

export function Topbar() {
  const student = currentStudent

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-lg px-6">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold">
          Welcome back, <span className="text-primary">{student.name.split(" ")[0]}</span>
        </h2>
        <Badge variant="secondary" className="gap-1">
          <Flame className="h-3.5 w-3.5 text-orange-500" />
          {student.streak} day streak
        </Badge>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Trophy className="h-4 w-4 text-yellow-500" />
          <span className="font-semibold text-foreground">{student.points.toLocaleString()}</span>
          <span>pts</span>
        </div>

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Zap className="h-4 w-4 text-primary" />
          <span className="font-semibold text-foreground">Lv.{student.level}</span>
        </div>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            3
          </span>
        </Button>

        <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-primary/20">
          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-sm font-semibold">
            {student.name.split(" ").map(n => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
