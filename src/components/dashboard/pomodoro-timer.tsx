"use client"

import React, { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Settings, Coffee, BookOpen } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const STUDY_TIME = 25 * 60
const SHORT_BREAK_TIME = 5 * 60
const LONG_BREAK_TIME = 15 * 60

type SessionType = "study" | "shortBreak" | "longBreak"

export function PomodoroTimer() {
  const [studyMinutes, setStudyMinutes] = useState(25)
  const [shortBreakMinutes, setShortBreakMinutes] = useState(5)
  const [longBreakMinutes, setLongBreakMinutes] = useState(15)

  const getTimeForSession = useCallback((session: SessionType) => {
    switch (session) {
      case "study":
        return studyMinutes * 60
      case "shortBreak":
        return shortBreakMinutes * 60
      case "longBreak":
        return longBreakMinutes * 60
    }
  }, [studyMinutes, shortBreakMinutes, longBreakMinutes])

  const [sessionType, setSessionType] = useState<SessionType>("study")
  const [timeLeft, setTimeLeft] = useState(getTimeForSession("study"))
  const [isActive, setIsActive] = useState(false)
  const [sessionCount, setSessionCount] = useState(0)

  useEffect(() => {
    setTimeLeft(getTimeForSession(sessionType))
  }, [studyMinutes, shortBreakMinutes, longBreakMinutes, sessionType, getTimeForSession])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      if (sessionType === "study") {
        const newSessionCount = sessionCount + 1
        setSessionCount(newSessionCount)
        if (newSessionCount % 4 === 0) {
          setSessionType("longBreak")
        } else {
          setSessionType("shortBreak")
        }
      } else {
        setSessionType("study")
      }
      setIsActive(false)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isActive, timeLeft, sessionType, sessionCount, getTimeForSession])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setSessionType("study")
    setSessionCount(0)
    setTimeLeft(getTimeForSession("study"))
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const totalTime = getTimeForSession(sessionType)
  const progress = (timeLeft / totalTime) * 100
  const radius = 18
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  const isAdmin = true // In a real app, this would come from user auth state

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-10 w-10">
        <svg className="transform -rotate-90" width="40" height="40" viewBox="0 0 40 40">
          <circle
            cx="20"
            cy="20"
            r={radius}
            stroke="hsl(var(--secondary))"
            strokeWidth="3"
            fill="transparent"
          />
          <circle
            cx="20"
            cy="20"
            r={radius}
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
            {sessionType === 'study' ? <BookOpen className="h-4 w-4 text-primary" /> : <Coffee className="h-4 w-4 text-primary" />}
        </div>
      </div>
      <span className="text-xl font-semibold font-mono w-24 tabular-nums">
        {formatTime(timeLeft)}
      </span>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" onClick={toggleTimer} className="h-8 w-8">
          {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={resetTimer} className="h-8 w-8">
          <RefreshCw className="h-4 w-4" />
        </Button>
        {isAdmin && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="grid gap-4">
              <h4 className="font-medium leading-none">Timer Settings</h4>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="study-time">Study</Label>
                  <Input id="study-time" type="number" value={studyMinutes} onChange={(e) => setStudyMinutes(Number(e.target.value))} className="col-span-2 h-8" />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="short-break">Short Break</Label>
                  <Input id="short-break" type="number" value={shortBreakMinutes} onChange={(e) => setShortBreakMinutes(Number(e.target.value))} className="col-span-2 h-8" />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="long-break">Long Break</Label>
                  <Input id="long-break" type="number" value={longBreakMinutes} onChange={(e) => setLongBreakMinutes(Number(e.target.value))} className="col-span-2 h-8" />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        )}
      </div>
    </div>
  )
}
