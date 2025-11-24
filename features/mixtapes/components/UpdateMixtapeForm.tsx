"use client"

import { Button } from "@/components/ui/button"
import {
    FieldError,
    FieldGroup,
    FieldLabel
} from "@/components/ui/field"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useForm } from "@tanstack/react-form"
import type { MixtapeDetailDto } from "../api/mixtapes.types"
import { useUpdateMixtape } from "../hooks/useUpdateMixtape"
import { updateMixtapeSchema } from "../schemas/mixtape.schema"

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
      categoryId: mixtape.categoryId,
    },
    validators: {
      onChange: updateMixtapeSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await updateMixtape(mixtape.id, {
          description: value.description || undefined,
          categoryId: value.categoryId,
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
      <form.Field
        name="categoryId"
        validators={{
          onChange: updateMixtapeSchema.shape.categoryId,
        }}
      >
        {(field) => (
          <FieldGroup>
            <FieldLabel htmlFor={field.name}>Catégorie</FieldLabel>
            <Select
              value={field.state.value}
              onValueChange={field.handleChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError errors={field.state.meta.errors} />
          </FieldGroup>
        )}
      </form.Field>

      <form.Field
        name="description"
        validators={{
          onChange: updateMixtapeSchema.shape.description,
        }}
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
