'use client'
import { StudyRoom } from "@/components/dashboard/study-room";
export const runtime = 'edge'

export default function DashboardRoomPage({ params }: { params: { id: string } }) {
  return (
    <div className="h-[calc(100vh-8rem)] w-full p-4 md:p-6">
        <StudyRoom />
    </div>
  );
}
