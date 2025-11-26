"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useForm } from "@tanstack/react-form"

import { AlertTriangle, Loader2 } from "lucide-react"
import { useCreateCategory } from "../hooks/useCreateCategory"
import { createCategorySchema } from "../schemas/category.schema"
import { FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"

interface CreateCategoryFormProps {
  onSuccess?: () => void
}

export function CreateCategoryForm({ onSuccess }: CreateCategoryFormProps) {
  const { create, isLoading, error } = useCreateCategory()
  const { toast } = useToast()

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    validators: {
      onChange: createCategorySchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await create(value)
        toast({
          title: "Catégorie créée",
          description: "La catégorie a été créée avec succès.",
        })
        form.reset()
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
              placeholder="Ex: Trap, Drill, Afro..."
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
              placeholder="Description de la catégorie..."
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
        Créer la catégorie
      </Button>
    </form>
  )
}
