"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Users, Lock } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function StudyTogetherPage() {
  const [roomId, setRoomId] = React.useState("");

  return (
    <Card className="w-full max-w-md bg-black/40 text-white border-white/30 backdrop-blur-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">Study Together</CardTitle>
        <CardDescription className="text-gray-300">
          Study with others.
        </CardDescription>
        <div className="flex justify-center items-center gap-4 pt-2 text-sm text-gray-300">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>Public: 5</span>
          </div>
          <div className="flex items-center gap-1">
            <Lock className="h-4 w-4" />
            <span>Private: 1</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Link href="/dashboard/room/public" passHref>
          <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Join Public Room
          </Button>
        </Link>
        <Button variant="outline" size="lg" className="w-full bg-transparent border-blue-500 hover:bg-blue-500/20 hover:text-white">
          Create Private Room
        </Button>
        <div className="flex flex-col gap-2 pt-4">
          <label htmlFor="room-id" className="text-sm font-medium text-gray-300">Room ID</label>
          <Input 
            id="room-id"
            type="text" 
            placeholder="Enter Room ID" 
            className="bg-black/50 border-gray-600 placeholder:text-gray-500 text-white"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <Button disabled={!roomId} className="w-full bg-gray-600 text-gray-400 cursor-not-allowed">
            Join Room
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
