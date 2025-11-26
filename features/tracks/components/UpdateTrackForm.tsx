"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CategorySelect } from "@/features/categories/components/CategorySelect"
import { useToast } from "@/hooks/use-toast"
import { useForm } from "@tanstack/react-form"
import { AlertTriangle, Loader2 } from "lucide-react"
import type { TrackDetailDto } from "../api/tracks.types"
import { useUpdateTrack } from "../hooks/useUpdateTrack"
import { updateTrackSchema, type UpdateTrackFormData } from "../schemas/track.schema"

interface UpdateTrackFormProps {
  track: TrackDetailDto
  onSuccess?: () => void
}

export function UpdateTrackForm({ track, onSuccess }: UpdateTrackFormProps) {
  const { update, isLoading, error } = useUpdateTrack()
  const { toast } = useToast()

  const form = useForm({
    defaultValues: {
      title: track.title,
      description: track.description || "",
      categoryId: track.categoryId,
      playlistInfo: track.playlistInfo || "",
    } as UpdateTrackFormData,
    validators: {
      onChange: updateTrackSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await update(track.id, {
          ...value,
          description: value.description || undefined,
          playlistInfo: value.playlistInfo || undefined,
        })
        toast({
          title: "Track mise à jour",
          description: "Les modifications ont été enregistrées.",
        })
        onSuccess?.()
      } catch {
        // Error handled by hook
      }
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="space-y-6"
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
            <FieldLabel htmlFor="title">Titre</FieldLabel>
            <Input
              id="title"
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
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              id="description"
              className="min-h-[100px]"
              value={field.state.value || ""}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            <FieldError errors={field.state.meta.errors} />
          </FieldGroup>
        )}
      />

      <form.Field
        name="playlistInfo"
        children={(field) => (
          <FieldGroup>
            <FieldLabel htmlFor="playlistInfo">Infos Playlist</FieldLabel>
            <Textarea
              id="playlistInfo"
              value={field.state.value || ""}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            <FieldError errors={field.state.meta.errors} />
          </FieldGroup>
        )}
      />

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Mettre à jour
      </Button>
    </form>
  )
}
