"use client"

import { Button } from "@/components/ui/button"
import { AuthGuard } from "@/features/auth/components/AuthGuard"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { CreateTrackForm } from "./CreateTrackForm"

export function CreateTrackClient() {
  return (
    <AuthGuard roles={["Partner", "Admin"]}>
      <div className="container max-w-2xl py-8">
        <Button variant="ghost" asChild className="mb-6 pl-0">
          <Link href="/tracks">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux tracks
          </Link>
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Ajouter une track</h1>
          <p className="text-muted-foreground">
            Partagez votre musique depuis SoundCloud, YouTube ou Spotify.
          </p>
        </div>

        <CreateTrackForm />
      </div>
    </AuthGuard>
  )
}
