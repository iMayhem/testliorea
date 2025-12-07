import React from "react"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarGroup
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
        <div className="relative z-10">
          <Sidebar variant="inset" collapsible="icon">
            <SidebarHeader>
              <Button variant="ghost" size="icon" className="w-fit h-fit p-1">
                <Logo />
              </Button>
            </SidebarHeader>
            <SidebarContent>
              <MainNav />
              <SidebarGroup className="mt-auto" collapsible={false}>
                <Leaderboard />
              </SidebarGroup>
              <SidebarGroup>
                <TaskList />
              </SidebarGroup>
              <SidebarGroup>
                <Chat />
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              {/* Optional footer content */}
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <DashboardHeader />
            <main className="p-4 md:p-6">
              {children}
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}
