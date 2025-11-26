"use client"

import { Button } from "@/components/ui/button"
import {
    FieldError,
    FieldGroup,
    FieldLabel
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useForm } from "@tanstack/react-form"
import type { MixtapeDetailDto } from "../api/mixtapes.types"
import { useUpdateMixtape } from "../hooks/useUpdateMixtape"

// TODO: Fetch from API
const CATEGORIES = [
  { id: "hip-hop", name: "Hip Hop" },
  { id: "rnb", name: "R&B" },
  { id: "afrobeat", name: "Afrobeat" },
  { id: "dancehall", name: "Dancehall" },
]

interface UpdateMixtapeFormProps {
  mixtape: MixtapeDetailDto
  onSuccess?: () => void
}

export function UpdateMixtapeForm({ mixtape, onSuccess }: UpdateMixtapeFormProps) {
  const { updateMixtape, isLoading } = useUpdateMixtape()
  const { toast } = useToast()

  const form = useForm({
    defaultValues: {
      description: mixtape.description || "",
    },
    onSubmit: async ({ value }) => {
      try {
        await updateMixtape(mixtape.id, {
          description: value.description || undefined,
        })
        toast({
          title: "Mixtape mise à jour",
          description: "Les modifications ont été enregistrées.",
        })
        onSuccess?.()
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour la mixtape.",
          variant: "destructive",
        })
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
      className="space-y-4"
    >
      {/* Category selection removed temporarily - API doesn't return categoryId 
          TODO: Either add categoryId to API response or fetch categories and map by slug */}
      <div className="rounded-lg border border-muted bg-muted/50 p-4 text-sm text-muted-foreground">
        <strong>Catégorie actuelle:</strong> {mixtape.categoryName}
      </div>

      <form.Field
        name="description"
      >
        {(field) => (
          <FieldGroup>
            <FieldLabel htmlFor={field.name}>Description</FieldLabel>
            <Textarea
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Description de la mixtape..."
              className="min-h-[150px]"
            />
            <FieldError errors={field.state.meta.errors} />
          </FieldGroup>
        )}
      </form.Field>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Enregistrement..." : "Enregistrer les modifications"}
      </Button>
    </form>
  )
}
