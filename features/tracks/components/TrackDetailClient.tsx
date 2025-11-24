"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/features/auth"
import { CategoryBadge } from "@/features/categories/components/CategoryBadge"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import {
    AlertTriangle,
    ArrowLeft,
    Calendar,
    Heart,
    Pencil,
    Share2,
    Star,
    Trash2
} from "lucide-react"
import Link from "next/link"
import { useDeleteTrack } from "../hooks/useDeleteTrack"
import { useTrackById } from "../hooks/useTrackById"
import { CollaboratorsList } from "./CollaboratorsList"
import { TrackPlayer } from "./TrackPlayer"
import { TrackStats } from "./TrackStats"

interface TrackDetailClientProps {
  id: string
}

export function TrackDetailClient({ id }: TrackDetailClientProps) {
  const { track, isLoading, isError } = useTrackById(id)
  const { deleteTrack } = useDeleteTrack()
  const { user } = useAuth()

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

  const isOwner = user?.id === track.partnerId || user?.role === "Admin"

  return (
    <div className="container py-8">
      <Button variant="ghost" asChild className="mb-6 pl-0">
        <Link href="/tracks">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux tracks
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <TrackPlayer 
            embedUrl={track.embedUrl} 
            platform={track.platform} 
            title={track.title} 
          />

          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{track.title}</h1>
                <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                  <Link href={`/partners/${track.partnerId}`} className="flex items-center gap-2 hover:text-foreground">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={track.partnerAvatarUrl || undefined} />
                      <AvatarFallback>{track.partnerName[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{track.partnerName}</span>
                  </Link>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {track.publishedAt 
                        ? format(new Date(track.publishedAt), "d MMMM yyyy", { locale: fr })
                        : "Date inconnue"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Heart className={track.isLikedByCurrentUser ? "fill-primary text-primary" : ""} />
                </Button>
                <Button variant="outline" size="icon">
                  <Star className={track.isFavoritedByCurrentUser ? "fill-yellow-400 text-yellow-400" : ""} />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <CategoryBadge 
                category={{
                  id: track.categoryId,
                  name: track.categoryName,
                  slug: track.categorySlug,
                  description: null,
                  trackCount: 0,
                  mixtapeCount: 0
                }} 
              />
              <Badge variant="outline">{track.platform}</Badge>
            </div>

            <TrackStats stats={track.stats} score={track.score} className="text-base" />
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Description</h3>
            <div className="prose max-w-none text-muted-foreground">
              {track.description ? (
                <p className="whitespace-pre-wrap">{track.description}</p>
              ) : (
                <p className="italic">Aucune description.</p>
              )}
            </div>
          </div>

          {track.playlistInfo && (
            <div className="rounded-lg border bg-muted/50 p-4">
              <h4 className="font-semibold mb-2">Infos Playlist</h4>
              <p className="text-sm text-muted-foreground">{track.playlistInfo}</p>
            </div>
          )}

          <CollaboratorsList collaborators={track.collaborators} />
        </div>

        <div className="space-y-6">
          {isOwner && (
            <div className="rounded-lg border p-4 space-y-4">
              <h3 className="font-semibold">Administration</h3>
              <div className="flex flex-col gap-2">
                <Button variant="outline" asChild className="w-full justify-start">
                  <Link href={`/tracks/${track.id}/edit`}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Modifier la track
                  </Link>
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Supprimer la track
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Cette action est irréversible. La track sera définitivement supprimée.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteTrack(track.id)}
                        className="bg-destructive hover:bg-destructive/90"
                      >
                        Supprimer
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          )}

          {/* Placeholder for comments or related tracks */}
          <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
            Espace commentaires à venir...
          </div>
        </div>
      </div>
    </div>
  )
}
