"use client"

import React, { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Plus, ListTodo } from "lucide-react"
import type { Task } from "@/lib/types"

const initialTasks: Task[] = [
  { id: "1", text: "Chapter 5 reading", completed: true },
  { id: "2", text: "Math problem set", completed: false },
  { id: "3", text: "Prepare for quiz", completed: false },
]

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [newTask, setNewTask] = useState("")

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now().toString(), text: newTask.trim(), completed: false },
      ])
      setNewTask("")
    }
  }

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  return (
    <>
      <SidebarGroupLabel>
        <ListTodo />
        <span>Shared Tasks</span>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <div className="space-y-2">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center gap-3">
              <Checkbox
                id={`task-${task.id}`}
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
                className="transition-all"
              />
              <label
                htmlFor={`task-${task.id}`}
                className={`text-sm ${
                  task.completed ? "text-muted-foreground line-through" : ""
                }`}
              >
                {task.text}
              </label>
            </div>
          ))}
        </div>
        <form onSubmit={handleAddTask} className="mt-4 flex gap-2">
          <Input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="h-8 bg-transparent"
          />
          <Button type="submit" size="icon" className="h-8 w-8 flex-shrink-0">
            <Plus className="h-4 w-4" />
          </Button>
        </form>
      </SidebarGroupContent>
    </>
  )
}
