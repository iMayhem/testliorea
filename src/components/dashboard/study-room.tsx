"use client"

import React, { useRef, useState, useEffect } from 'react'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, MicOff, Video, VideoOff, ScreenShare, PhoneOff, Flag, Settings } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import { User } from '@/lib/types'

const participants: Partial<User>[] = PlaceHolderImages.filter(img => img.id.startsWith('user')).slice(0, 4).map(img => ({
    id: img.id,
    name: img.description.replace('Avatar for ', '').replace('current user', 'You'),
    avatarUrl: img.imageUrl,
}));

export function StudyRoom() {
    const { toast } = useToast()
    const [isMicOn, setIsMicOn] = useState(true)
    const [isCameraOn, setIsCameraOn] = useState(true)
    const [isScreenSharing, setIsScreenSharing] = useState(false)
    const localVideoRef = useRef<HTMLVideoElement>(null)
    const screenShareRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (isCameraOn) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then(stream => {
                    if (localVideoRef.current) {
                        localVideoRef.current.srcObject = stream
                    }
                })
                .catch(err => {
                    console.error("Error accessing media devices.", err)
                    setIsCameraOn(false)
                    setIsMicOn(false)
                })
        } else {
            if (localVideoRef.current && localVideoRef.current.srcObject) {
                (localVideoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
                localVideoRef.current.srcObject = null;
            }
        }
    }, [isCameraOn])

    const toggleMic = () => {
        if (localVideoRef.current?.srcObject) {
            const stream = localVideoRef.current.srcObject as MediaStream
            stream.getAudioTracks().forEach(track => track.enabled = !isMicOn)
            setIsMicOn(!isMicOn)
        }
    }

    const toggleCamera = () => {
        setIsCameraOn(!isCameraOn)
    }

    const handleScreenShare = async () => {
        if (isScreenSharing) {
            // Stop screen sharing
            if (screenShareRef.current && screenShareRef.current.srcObject) {
                (screenShareRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
                screenShareRef.current.srcObject = null;
            }
            setIsScreenSharing(false);
            // TODO: Signal other peers that screen sharing has stopped
        } else {
            // Start screen sharing
            try {
                const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
                if (screenShareRef.current) {
                    screenShareRef.current.srcObject = stream;
                }
                setIsScreenSharing(true);
                // TODO: Implement WebRTC signaling using Cloudflare D1
                // 1. Create RTCPeerConnection
                // 2. Add screen track to connection
                // 3. Create offer
                // 4. Set local description
                // 5. INSERT offer into D1 `signaling_messages` table via a server action/API
                // 6. Start polling D1 for an answer from the other peer
                stream.getVideoTracks()[0].onended = () => {
                    setIsScreenSharing(false);
                    if (screenShareRef.current) screenShareRef.current.srcObject = null;
                }
            } catch (err) {
                console.error("Error sharing screen:", err);
            }
        }
    }

    const handleReport = () => {
        toast({
            title: "Report Submitted",
            description: "Thank you. Our admins will review the situation.",
        })
    }

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)]">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {participants.map((p, index) => (
                    <Card key={p.id} className="relative overflow-hidden glassmorphism">
                        <CardContent className="p-0 h-full">
                            {index === 0 && isCameraOn ? (
                                <video ref={localVideoRef} autoPlay muted playsInline className="h-full w-full object-cover"></video>
                            ) : (
                                <Image
                                    src={p.avatarUrl!}
                                    alt={p.name!}
                                    fill
                                    className="object-cover"
                                    data-ai-hint="person portrait"
                                />
                            )}
                            <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded-md text-sm">{p.name}</div>
                        </CardContent>
                    </Card>
                ))}
                {isScreenSharing && (
                     <Card className="relative overflow-hidden glassmorphism md:col-span-2 lg:col-span-1">
                        <CardContent className="p-0 h-full">
                            <video ref={screenShareRef} autoPlay className="h-full w-full object-contain"></video>
                            <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded-md text-sm">Your Screen Share</div>
                        </CardContent>
                    </Card>
                )}
            </div>

            <div className="mt-4 flex justify-center">
                <Card className="glassmorphism">
                    <CardContent className="p-2 flex items-center gap-2">
                        <Button variant={isMicOn ? "secondary" : "destructive"} size="icon" onClick={toggleMic} className="rounded-full h-12 w-12">
                            {isMicOn ? <Mic /> : <MicOff />}
                        </Button>
                        <Button variant={isCameraOn ? "secondary" : "destructive"} size="icon" onClick={toggleCamera} className="rounded-full h-12 w-12">
                            {isCameraOn ? <Video /> : <VideoOff />}
                        </Button>
                        <Button variant={isScreenSharing ? "default" : "secondary"} size="icon" onClick={handleScreenShare} className="rounded-full h-12 w-12 bg-primary hover:bg-primary/90 text-primary-foreground">
                            <ScreenShare />
                        </Button>
                        <Button variant="destructive" size="icon" className="rounded-full h-12 w-12">
                            <PhoneOff />
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                                    <Flag className="text-destructive" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Report an issue</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Describe the issue you're facing. This will be sent to the administrators.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <Textarea placeholder="Please provide details about the user or content..." />
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleReport}>Submit Report</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
