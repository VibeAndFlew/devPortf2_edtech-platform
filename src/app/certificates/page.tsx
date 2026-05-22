"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { certificates } from "@/lib/mock-data"
import { Award, Download, ShieldCheck, Calendar, Clock, AlertTriangle, CheckCircle } from "lucide-react"

const statusColors: Record<string, string> = {
  valid: "bg-emerald-100 text-emerald-800 border-emerald-200",
  expired: "bg-amber-100 text-amber-800 border-amber-200",
  revoked: "bg-red-100 text-red-800 border-red-200",
}

export default function CertificatesPage() {
  const validCerts = certificates.filter(c => c.status === "valid")
  const otherCerts = certificates.filter(c => c.status !== "valid")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Certificates</h1>
        <p className="text-sm text-muted-foreground">Your earned credentials and achievements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {validCerts.map((cert) => (
          <Card key={cert.id} className="group hover:shadow-md transition-all duration-200 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-primary via-accent to-primary" />
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-100 to-amber-200">
                  <Award className="h-5 w-5 text-amber-700" />
                </div>
                <Badge className={statusColors[cert.status]}>
                  <CheckCircle className="h-3 w-3 mr-0.5" /> {cert.status}
                </Badge>
              </div>
              <h3 className="font-semibold text-sm mb-1">{cert.courseName}</h3>
              <p className="text-xs text-muted-foreground mb-3">{cert.studentName}</p>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" />
                  <span>Issued: {cert.issueDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3 w-3" />
                  <span>Expires: {cert.expiryDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3 w-3" />
                  <span className="font-mono text-[11px]">{cert.credentialId}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-3">
                {cert.skills.map(skill => (
                  <Badge key={skill} variant="secondary" className="text-[10px] px-1.5 py-0">{skill}</Badge>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t">
                <div className="text-xs">
                  <span className="text-muted-foreground">Grade: </span>
                  <span className="font-semibold text-emerald-600">{cert.grade}</span>
                  <span className="text-muted-foreground ml-2">{cert.hoursCompleted}h completed</span>
                </div>
                <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                  <Download className="h-3.5 w-3.5" /> Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {otherCerts.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" /> Other Certificates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherCerts.map((cert) => (
              <Card key={cert.id} className="opacity-75">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                      <Award className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{cert.courseName}</h3>
                      <p className="text-xs text-muted-foreground">{cert.studentName}</p>
                    </div>
                    <Badge className={`ml-auto ${statusColors[cert.status]}`}>
                      {cert.status === "expired" ? "Expired" : "Revoked"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Credential: {cert.credentialId}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
