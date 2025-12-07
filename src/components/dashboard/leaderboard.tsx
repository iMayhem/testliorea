"use client"

import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Trophy } from "lucide-react"
import type { LeaderboardEntry } from "@/lib/types"
import { PlaceHolderImages } from "@/lib/placeholder-images"

const leaderboardData: LeaderboardEntry[] = [
  { id: "1", name: "Sarah", avatarUrl: PlaceHolderImages.find(i=>i.id==='user1')?.imageUrl || '', score: 1250, rank: 1 },
  { id: "2", name: "Mike", avatarUrl: PlaceHolderImages.find(i=>i.id==='user2')?.imageUrl || '', score: 1100, rank: 2 },
  { id: "3", name: "Emily", avatarUrl: PlaceHolderImages.find(i=>i.id==='user3')?.imageUrl || '', score: 980, rank: 3 },
  { id: "4", name: "You", avatarUrl: PlaceHolderImages.find(i=>i.id==='user6')?.imageUrl || '', score: 950, rank: 4 },
];

export function Leaderboard() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        <Trophy />
        <span>Leaderboard</span>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <div className="space-y-3">
          {leaderboardData.map((entry) => (
            <div key={entry.id} className="flex items-center gap-3">
              <span className="font-bold text-lg w-4">{entry.rank}</span>
              <Avatar className="h-8 w-8">
                <AvatarImage src={entry.avatarUrl} alt={entry.name} />
                <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">{entry.name}</p>
                <p className="text-xs text-muted-foreground">{entry.score} pts</p>
              </div>
            </div>
          ))}
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
