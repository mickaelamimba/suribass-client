"use client"

import { Button } from "@/components/ui/button"
import {
    FieldError,
    FieldGroup,
    FieldLabel
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "@tanstack/react-form"
import { useRegisterPartner } from "../hooks/useRegisterPartner"
import { registerPartnerSchema } from "../schemas/partner.schema"

export function RegisterPartnerForm() {
  const { register, isLoading, error } = useRegisterPartner()

  const form = useForm({
    defaultValues: {
      artistName: "",
      bio: "",
    },
    validators: {
      onChange: registerPartnerSchema,
    },
    onSubmit: async ({ value }) => {
      await register(value)
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
        <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <form.Field
        name="artistName"
        validators={{
          onChange: registerPartnerSchema.shape.artistName,
        }}
      >
        {(field) => (
          <FieldGroup>
            <FieldLabel htmlFor={field.name}>Nom d'artiste</FieldLabel>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Votre nom de scène"
            />
            <FieldError errors={field.state.meta.errors} />
          </FieldGroup>
        )}
      </form.Field>

      <form.Field
        name="bio"
        validators={{
          onChange: registerPartnerSchema.shape.bio,
        }}
      >
        {(field) => (
          <FieldGroup>
            <FieldLabel htmlFor={field.name}>Biographie (optionnel)</FieldLabel>
            <Textarea
              id={field.name}
              name={field.name}
              value={field.state.value || ""}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Parlez-nous de vous..."
              className="min-h-[120px]"
            />
            <FieldError errors={field.state.meta.errors} />
          </FieldGroup>
        )}
      </form.Field>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Création..." : "Devenir Partenaire"}
      </Button>
    </form>
  )
}
