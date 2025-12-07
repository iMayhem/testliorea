"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Edit2, Bell, MessageSquare, Trophy, Settings } from "lucide-react"
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { Logo } from "@/components/icons"
import { UserNav } from "@/components/user-nav"


const communityUsers = [
  { name: 'admins', status: 'Online', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
  { name: 'adminh', status: 'Offline', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d' },
  { name: 'axon', status: 'Offline', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d' },
  { name: 'chucklebunny', status: 'Offline', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d' },
  { name: 'itachiuchiha', status: 'Offline', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d' },
  { name: 'sujeet', status: 'Offline', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026709d' },
]

const Countdown = ({ title, date }: { title: string, date: string }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
  } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(date) - +new Date();
      let newTimeLeft = {};

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      } else {
        newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }
      return newTimeLeft;
    };

    // Set initial time left on mount, only on client
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [date]);


  return (
    <Card className="bg-gray-900 border-gray-800 text-white w-full">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between">
        {!timeLeft ? (
            <div className="text-center w-full">Loading...</div>
        ) : (
            <>
                <div className="text-center">
                <p className="text-4xl font-bold">{timeLeft.days}</p>
                <p className="text-sm">Days</p>
                </div>
                <div className="text-center">
                <p className="text-4xl font-bold">{timeLeft.hours}</p>
                <p className="text-sm">Hours</p>
                </div>
                <div className="text-center">
                <p className="text-4xl font-bold">{timeLeft.minutes}</p>
                <p className="text-sm">Minutes</p>
                </div>
                <div className="text-center">
                <p className="text-4xl font-bold">{timeLeft.seconds}</p>
                <p className="text-sm">Seconds</p>
                </div>
            </>
        )}
      </CardContent>
    </Card>
  );
};


export default function HomePage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2025, 11, 7))

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-black border-b border-gray-800">
        <div className="flex items-center gap-4">
          <Logo className="h-8 w-8" />
          <h1 className="text-xl font-bold">Liorea</h1>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:underline">Home</Link>
          <Link href="/dashboard" className="text-sm font-medium hover:underline">Study</Link>
          <a href="#" className="text-sm font-medium hover:underline">Help</a>
        </nav>
        <div className="flex items-center gap-4">
          <UserNav />
        </div>
      </header>

      <main className="pt-20 px-4 md:px-8 grid grid-cols-12 gap-8">
        {/* Left Community Sidebar */}
        <aside className="col-span-12 md:col-span-3">
          <Card className="bg-gray-900 border-gray-800 text-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Community</CardTitle>
              <Badge variant="secondary" className="bg-green-500/80 text-white border-none">1 Online</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {communityUsers.map((user) => (
                  <div key={user.name} className="flex items-center gap-3">
                    <Avatar className="relative h-9 w-9">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      <span className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ${user.status === 'Online' ? 'bg-green-500' : 'bg-gray-400'}`} />
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className={`text-xs ${user.status === 'Online' ? 'text-green-300' : 'text-gray-400'}`}>{user.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Center Content */}
        <div className="col-span-12 md:col-span-6 flex flex-col items-center gap-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold flex items-center gap-2">
              Welcome, admins! <Edit2 className="h-6 w-6 cursor-pointer" />
            </h2>
          </div>
          <Input
            type="text"
            placeholder="How are you feeling today?"
            className="w-full max-w-md bg-gray-900 border-gray-800 placeholder:text-gray-400 text-white"
          />
          <Card className="bg-gray-900 border-gray-800 text-white">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="p-0"
              classNames={{
                caption_label: "text-lg text-white",
                head_cell: "text-gray-300 w-10",
                day: "w-10 h-10 text-white",
                day_selected:
                  "bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-600",
                day_today: "bg-blue-500/50 rounded-md",
                day_outside: "text-gray-500",
                nav_button: "text-white"
              }}
            />
          </Card>
        </div>

        {/* Right Countdown Sidebar */}
        <aside className="col-span-12 md:col-span-3 flex flex-col gap-6">
          <Countdown title="JEE Mains 2026" date="2026-01-25T00:00:00" />
          <Countdown title="NEET 2026 Countdown" date="2026-05-03T00:00:00" />
          
          <div className="fixed bottom-8 right-8 flex flex-col gap-4">
             <Button variant="ghost" size="icon" className="rounded-full bg-gray-800 border-gray-700 h-12 w-12 text-white hover:bg-gray-700"><Trophy /></Button>
             <Button variant="ghost" size="icon" className="rounded-full bg-gray-800 border-gray-700 h-12 w-12 text-white hover:bg-gray-700"><MessageSquare /></Button>
             <Button variant="ghost" size="icon" className="rounded-full bg-gray-800 border-gray-700 h-12 w-12 text-white hover:bg-gray-700"><Settings /></Button>
          </div>
        </aside>
      </main>
    </div>
  )
}
