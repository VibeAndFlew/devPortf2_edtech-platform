import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"
import { AppProviders } from "@/providers/app-providers"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Eduverse - Interactive Learning Platform",
  description: "A collaborative, friendly, learning-first educational platform",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen antialiased">
        <AppProviders>
          <Sidebar />
          <div className="pl-64">
            <Topbar />
            <main className="p-6">
              {children}
            </main>
          </div>
        </AppProviders>
      </body>
    </html>
  )
}
