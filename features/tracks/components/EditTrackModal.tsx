"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CategorySelect } from "@/features/categories/components/CategorySelect"
import { useToast } from "@/hooks/use-toast"
import { useForm } from "@tanstack/react-form"
import { AlertTriangle, Loader2 } from "lucide-react"
import { useEffect } from "react"
import type { TrackDto } from "../api/tracks.types"
import { useUpdateTrack } from "../hooks/useUpdateTrack"

interface EditTrackModalProps {
  track: TrackDto | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function EditTrackModal({ track, open, onOpenChange, onSuccess }: EditTrackModalProps) {
  const { update, isLoading, error } = useUpdateTrack()
  const { toast } = useToast()

  const form = useForm({
    defaultValues: {
      title: track?.title || "",
      description: track?.description || "",
      categoryId: track?.categorySlug || "",
    },
    onSubmit: async ({ value }) => {
      if (!track) return
      try {
        await update(track.id, {
          title: value.title,
          description: value.description || undefined,
          categoryId: value.categoryId || undefined,
        })
        toast({
          title: "Track modifiée",
          description: "Les modifications ont été enregistrées.",
        })
        onOpenChange(false)
        onSuccess?.()
      } catch {
        // Error handled by hook
      }
    },
  })

  // Reset form when track changes
  useEffect(() => {
    if (track) {
      form.setFieldValue("title", track.title)
      form.setFieldValue("description", track.description || "")
      form.setFieldValue("categoryId", track.categorySlug || "")
    }
  }, [track])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Modifier la track</DialogTitle>
          <DialogDescription>
            Modifiez les informations de votre track.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="space-y-4"
        >
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Erreur</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form.Field
            name="title"
            children={(field) => (
              <FieldGroup>
                <FieldLabel htmlFor="edit-title">Titre</FieldLabel>
                <Input
                  id="edit-title"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldError errors={field.state.meta.errors} />
              </FieldGroup>
            )}
          />

          <form.Field
            name="categoryId"
            children={(field) => (
              <FieldGroup>
                <FieldLabel>Catégorie</FieldLabel>
                <CategorySelect
                  value={field.state.value}
                  onValueChange={field.handleChange}
                />
                <FieldError errors={field.state.meta.errors} />
              </FieldGroup>
            )}
          />

          <form.Field
            name="description"
            children={(field) => (
              <FieldGroup>
                <FieldLabel htmlFor="edit-description">Description</FieldLabel>
                <Textarea
                  id="edit-description"
                  className="min-h-[80px]"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldError errors={field.state.meta.errors} />
              </FieldGroup>
            )}
          />

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Enregistrer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
