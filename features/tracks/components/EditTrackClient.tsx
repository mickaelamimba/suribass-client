"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/features/auth"
import { AuthGuard } from "@/features/auth/components/AuthGuard"
import { AlertTriangle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useTrackById } from "../hooks/useTrackById"
import { UpdateTrackForm } from "./UpdateTrackForm"

interface EditTrackClientProps {
  id: string
}

export function EditTrackClient({ id }: EditTrackClientProps) {
  const { track, isLoading, isError } = useTrackById(id)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (track && user && user.role !== "Admin" && user.id !== track.partnerId) {
      router.push("/tracks")
    }
  }, [track, user, router])

  if (isLoading) {
    return (
      <div className="container flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (isError || !track) {
    return (
      <div className="container flex flex-col gap-6 py-8">
        <Button variant="ghost" asChild className="w-fit pl-0">
          <Link href="/tracks">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux tracks
          </Link>
        </Button>
        
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>
            Impossible de charger la track.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  const handleSuccess = () => {
    router.push(`/tracks/${id}`)
  }

  return (
    <AuthGuard roles={["Partner", "Admin"]}>
      <div className="container max-w-2xl py-8">
        <Button variant="ghost" asChild className="mb-6 pl-0">
          <Link href={`/tracks/${id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la track
          </Link>
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Modifier la track</h1>
          <p className="text-muted-foreground">
            Mettez à jour les informations de "{track.title}".
          </p>
        </div>

        <UpdateTrackForm 
          track={track} 
          onSuccess={handleSuccess} 
        />
        
      </div>
    </AuthGuard>
  )
}
