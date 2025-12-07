"use client"

import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, MessageSquare } from "lucide-react"
import type { User, ChatMessage } from "@/lib/types"
import { PlaceHolderImages } from "@/lib/placeholder-images"

const users: User[] = PlaceHolderImages.filter(img => img.id.startsWith('user') && img.id !== 'user6').map((img, index) => ({
    id: img.id,
    name: img.description.replace('Avatar for ', ''),
    avatarUrl: img.imageUrl,
    status: (index % 2 === 0 ? 'online' : 'offline') as 'online' | 'offline',
    lastSeen: '10m ago'
}));

const messages: ChatMessage[] = [
  { id: '1', userId: 'user1', userName: 'Sarah', avatarUrl: PlaceHolderImages.find(i=>i.id==='user1')?.imageUrl || '', message: "Hey everyone, ready for the session?", timestamp: "10:30 AM" },
  { id: '2', userId: 'user2', userName: 'Mike', avatarUrl: PlaceHolderImages.find(i=>i.id==='user2')?.imageUrl || '', message: "Yep, let's do this!", timestamp: "10:31 AM" },
  { id: '3', userId: 'user6', userName: 'You', avatarUrl: PlaceHolderImages.find(i=>i.id==='user6')?.imageUrl || '', message: "I'm ready. Let's start with the math problems.", timestamp: "10:31 AM" },
  { id: '4', userId: 'user3', userName: 'Emily', avatarUrl: PlaceHolderImages.find(i=>i.id==='user3')?.imageUrl || '', message: "Sounds good to me.", timestamp: "10:32 AM" },
];

export function Chat() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        <MessageSquare />
        <span>Group Chat</span>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <div className="space-y-2">
            {users.map((user) => (
                <div key={user.id} className="flex items-center gap-2">
                    <Avatar className="h-6 w-6 relative">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        <span className={`absolute bottom-0 right-0 block h-2 w-2 rounded-full ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
                    </Avatar>
                    <span className="text-sm font-medium">{user.name}</span>
                </div>
            ))}
        </div>

        <ScrollArea className="h-48 mt-4 rounded-md border p-2">
            <div className="space-y-4">
            {messages.map((msg) => (
                <div key={msg.id} className={`flex items-start gap-2 ${msg.userId === 'user6' ? 'justify-end' : ''}`}>
                    {msg.userId !== 'user6' && <Avatar className="h-6 w-6"><AvatarImage src={msg.avatarUrl} /></Avatar>}
                    <div className={`rounded-lg px-3 py-2 text-sm ${msg.userId === 'user6' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        {msg.userId !== 'user6' && <p className="font-semibold text-xs pb-1">{msg.userName}</p>}
                        <p>{msg.message}</p>
                    </div>
                    {msg.userId === 'user6' && <Avatar className="h-6 w-6"><AvatarImage src={msg.avatarUrl} /></Avatar>}
                </div>
            ))}
            </div>
        </ScrollArea>
        <form className="mt-2 flex gap-2">
            <Input placeholder="Type a message..." className="h-8 bg-transparent" />
            <Button type="submit" size="icon" className="h-8 w-8 flex-shrink-0">
                <Send className="h-4 w-4" />
            </Button>
        </form>

      </SidebarGroupContent>
    </SidebarGroup>
  )
}
