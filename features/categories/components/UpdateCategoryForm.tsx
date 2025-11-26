"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useForm } from "@tanstack/react-form"
import { AlertTriangle, Loader2 } from "lucide-react"
import type { CategoryDto } from "../api/categories.types"
import { useUpdateCategory } from "../hooks/useUpdateCategory"
import { updateCategorySchema } from "../schemas/category.schema"

interface UpdateCategoryFormProps {
  category: CategoryDto
  onSuccess?: () => void
}

export function UpdateCategoryForm({ category, onSuccess }: UpdateCategoryFormProps) {
  const { update, isLoading, error } = useUpdateCategory()
  const { toast } = useToast()

  const form = useForm({
    defaultValues: {
      name: category.name,
      description: category.description || "",
    },

    validators: {
      onChange: updateCategorySchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await update(category.id, value)
        toast({
          title: "Catégorie mise à jour",
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
        name="name"
        children={(field) => (
          <FieldGroup>
            <FieldLabel htmlFor="name">Nom</FieldLabel>
            <Input
              id="name"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
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
