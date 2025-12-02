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
import { AlertTriangle, Loader2, Wand2 } from "lucide-react"
import { useCreateTrack } from "../hooks/useCreateTrack"
import { useExtractMetadata } from "../hooks/useExtractMetadata"
import { createTrackSchema, type CreateTrackFormData } from "../schemas/track.schema"
import { ExtractMetadataPreview } from "./ExtractMetadataPreview"

interface CreateTrackModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function CreateTrackModal({ open, onOpenChange, onSuccess }: CreateTrackModalProps) {
  const { create, isLoading, error } = useCreateTrack()
  const { extract, metadata, isLoading: isExtracting, error: extractError, reset: resetMetadata } = useExtractMetadata()
  const { toast } = useToast()

  const form = useForm({
    defaultValues: {
      platformUrl: "",
      title: "",
      description: "",
      categoryId: "",
      playlistInfo: "",
    } as CreateTrackFormData,
    validators: {
      onChange: createTrackSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await create({
          ...value,
          description: value.description || undefined,
          playlistInfo: value.playlistInfo || undefined,
        })
        toast({
          title: "Track créée",
          description: "Votre track a été ajoutée avec succès.",
        })
        form.reset()
        resetMetadata?.()
        onOpenChange(false)
        onSuccess?.()
      } catch {
        // Error handled by hook
      }
    },
  })

  const handleExtract = async (url: string) => {
    if (!url) return
    try {
      const meta = await extract({ url })
      form.setFieldValue("title", meta.title)
    } catch {
      // Error handled by hook
    }
  }

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      form.reset()
      resetMetadata?.()
    }
    onOpenChange(isOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Ajouter une track</DialogTitle>
          <DialogDescription>
            Partagez votre musique depuis SoundCloud, YouTube ou Spotify.
          </DialogDescription>
        </DialogHeader>

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

          <div className="space-y-4 rounded-lg border p-4">
            <h3 className="font-medium">Source</h3>
            <form.Field
              name="platformUrl"
              children={(field) => (
                <FieldGroup>
                  <FieldLabel htmlFor="modal-platformUrl">URL de la track</FieldLabel>
                  <div className="flex gap-2">
                    <Input
                      id="modal-platformUrl"
                      placeholder="https://soundcloud.com/..."
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <Button 
                      type="button" 
                      variant="secondary"
                      disabled={isExtracting || !field.state.value}
                      onClick={() => handleExtract(field.state.value)}
                    >
                      {isExtracting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Wand2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <FieldError errors={field.state.meta.errors} />
                  {extractError && (
                    <p className="text-sm text-destructive">{extractError}</p>
                  )}
                </FieldGroup>
              )}
            />

            {metadata && <ExtractMetadataPreview metadata={metadata} />}
          </div>

          <div className="space-y-4">
            <form.Field
              name="title"
              children={(field) => (
                <FieldGroup>
                  <FieldLabel htmlFor="modal-title">Titre</FieldLabel>
                  <Input
                    id="modal-title"
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
                  <FieldLabel htmlFor="modal-description">Description</FieldLabel>
                  <Textarea
                    id="modal-description"
                    className="min-h-[80px]"
                    value={field.state.value || ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </FieldGroup>
              )}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => handleClose(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Publier
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
