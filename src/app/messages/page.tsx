"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { students, tutorSessions } from "@/lib/mock-data"
import { Search, Send, Phone, Video, MoreHorizontal, Paperclip } from "lucide-react"

interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: string
  unread: boolean
}

interface Conversation {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unread: number
  online: boolean
  messages: Message[]
}

const conversations: Conversation[] = students.slice(0, 6).map((s, idx) => {
  const sessionMsgs = tutorSessions.find(t => t.studentName === s.name)
  const msgs: Message[] = sessionMsgs
    ? sessionMsgs.messages.map((m, i) => ({
        id: `${s.id}-msg-${i}`,
        senderId: m.role === "student" ? s.id : "tutor",
        senderName: m.role === "student" ? s.name : "AI Tutor",
        content: m.content,
        timestamp: m.timestamp,
        unread: false,
      }))
    : []
  if (msgs.length === 0) {
    msgs.push({
      id: `${s.id}-msg-0`,
      senderId: s.id,
      senderName: s.name,
      content: "Hi! I have a question about the course.",
      timestamp: new Date().toISOString(),
      unread: idx === 0,
    })
  }
  return {
    id: s.id,
    name: s.name,
    avatar: s.avatar,
    lastMessage: msgs[msgs.length - 1]?.content || "",
    timestamp: s.lastActive,
    unread: idx < 2 ? Math.floor(Math.random() * 3) + 1 : 0,
    online: s.status === "active",
    messages: msgs,
  }
})

export default function MessagesPage() {
  const [selected, setSelected] = useState(conversations[0]?.id || null)
  const [newMsg, setNewMsg] = useState("")
  const [searchQ, setSearchQ] = useState("")

  const filtered = conversations.filter(c =>
    c.name.toLowerCase().includes(searchQ.toLowerCase())
  )

  const activeConv = conversations.find(c => c.id === selected)

  const handleSend = () => {
    if (!newMsg.trim() || !activeConv) return
    activeConv.messages.push({
      id: `msg-${Date.now()}`,
      senderId: "me",
      senderName: "You",
      content: newMsg,
      timestamp: new Date().toISOString(),
      unread: false,
    })
    activeConv.lastMessage = newMsg
    setNewMsg("")
  }

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-6">Messages</h1>
      <Card className="overflow-hidden border-0 shadow-sm">
        <div className="flex h-[600px]">
          <div className="w-80 border-r flex flex-col">
            <div className="p-3 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-9 h-9 text-sm"
                  value={searchQ}
                  onChange={e => setSearchQ(e.target.value)}
                />
              </div>
            </div>
            <ScrollArea className="flex-1">
              {filtered.map((conv) => (
                <div
                  key={conv.id}
                  className={`flex items-center gap-3 p-3 cursor-pointer transition-colors ${
                    selected === conv.id ? "bg-primary/5 border-l-2 border-primary" : "hover:bg-muted/50 border-l-2 border-transparent"
                  }`}
                  onClick={() => setSelected(conv.id)}
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-sm font-medium">
                        {conv.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    {conv.online && (
                      <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-emerald-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate">{conv.name}</p>
                      <span className="text-[10px] text-muted-foreground shrink-0">{conv.timestamp}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <Badge className="h-5 min-w-5 flex items-center justify-center rounded-full text-[10px] px-1">
                      {conv.unread}
                    </Badge>
                  )}
                </div>
              ))}
            </ScrollArea>
          </div>

          <div className="flex-1 flex flex-col">
            {activeConv ? (
              <>
                <div className="flex items-center justify-between p-3 border-b">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-sm font-medium">
                        {activeConv.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{activeConv.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {activeConv.online ? "Online" : "Offline"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Phone className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Video className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                  </div>
                </div>

                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-3">
                    {activeConv.messages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.senderId === "me" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                          msg.senderId === "me"
                            ? "bg-gradient-to-r from-primary to-accent text-white rounded-br-sm"
                            : "bg-muted rounded-bl-sm"
                        }`}>
                          <p className="text-sm">{msg.content}</p>
                          <p className={`text-[10px] mt-0.5 ${msg.senderId === "me" ? "text-white/70" : "text-muted-foreground"}`}>
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="p-3 border-t">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
                      <Paperclip className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      className="flex-1 h-9 text-sm"
                      value={newMsg}
                      onChange={e => setNewMsg(e.target.value)}
                      onKeyDown={e => { if (e.key === "Enter") handleSend() }}
                    />
                    <Button size="icon" className="h-9 w-9 shrink-0" onClick={handleSend}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <p>Select a conversation to start chatting</p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
