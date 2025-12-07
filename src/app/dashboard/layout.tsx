import React from "react"
import Link from 'next/link'
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/icons"
import { DashboardHeader } from "@/components/dashboard/header"
import { MainNav } from "@/components/main-nav"
import { TaskList } from "@/components/dashboard/task-list"
import { Chat } from "@/components/dashboard/chat"
import { Leaderboard } from "@/components/dashboard/leaderboard"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="relative min-h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('/background-gradient.svg')",
            opacity: 0.5,
          }}
        />
        <div className="relative z-10 md:flex">
          <Sidebar>
            <SidebarHeader>
              <Link href="/">
                <Button variant="ghost" size="icon" className="w-fit h-fit p-1">
                  <Logo />
                </Button>
              </Link>
            </SidebarHeader>
            <SidebarContent>
              <MainNav />
              <Leaderboard />
              <TaskList />
              <Chat />
            </SidebarContent>
            <SidebarFooter>
              {/* Optional footer content */}
            </SidebarFooter>
          </Sidebar>
          <div className="flex-1 flex flex-col">
            <DashboardHeader />
            <main className="p-4 md:p-6 flex-1">
              {children}
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
