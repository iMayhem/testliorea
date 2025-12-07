import React from "react";
import Link from 'next/link'
import Image from 'next/image'
import { Logo } from "@/components/icons"
import { UserNav } from "@/components/user-nav"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const studyBg = PlaceHolderImages.find(img => img.id === 'study-bg');

  return (
    <div className="relative min-h-screen w-full bg-black text-white">
      {studyBg && (
        <Image
          src={studyBg.imageUrl}
          alt={studyBg.description}
          fill
          className="object-cover"
          data-ai-hint={studyBg.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/50" />

      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-black/30 backdrop-blur-sm border-b border-white/20">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Logo className="h-8 w-8" />
          </Link>
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
      
      <main className="relative z-10 flex min-h-screen items-center justify-center pt-16">
        {children}
      </main>
    </div>
  )
}
