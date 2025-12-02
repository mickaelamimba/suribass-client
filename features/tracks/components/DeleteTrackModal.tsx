"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import type { TrackDto } from "../api/tracks.types"
import { useDeleteTrack } from "../hooks/useDeleteTrack"

interface DeleteTrackModalProps {
  track: TrackDto | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function DeleteTrackModal({ track, open, onOpenChange, onSuccess }: DeleteTrackModalProps) {
  const { deleteTrack, isLoading } = useDeleteTrack()
  const { toast } = useToast()

  const handleDelete = async () => {
    if (!track) return
    try {
      await deleteTrack(track.id)
      toast({
        title: "Track supprimée",
        description: "La track a été supprimée avec succès.",
      })
      onOpenChange(false)
      onSuccess?.()
    } catch {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la track.",
        variant: "destructive",
      })
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer la track</AlertDialogTitle>
          <AlertDialogDescription>
            Êtes-vous sûr de vouloir supprimer &quot;{track?.title}&quot; ? Cette action est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
