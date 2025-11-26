"use client"

import { Button } from "@/components/ui/button"
import {
    FieldError,
    FieldGroup,
    FieldLabel
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useForm } from "@tanstack/react-form"
import type { PartnerDetailDto } from "../api/partners.types"
import { useUpdatePartner } from "../hooks/useUpdatePartner"
import { updatePartnerSchema } from "../schemas/partner.schema"

interface UpdatePartnerFormProps {
  partner: PartnerDetailDto
  onSuccess?: () => void
}

export function UpdatePartnerForm({ partner, onSuccess }: UpdatePartnerFormProps) {
  const { update, isLoading } = useUpdatePartner()
  const { toast } = useToast()

  const form = useForm({
    defaultValues: {
      artistName: partner.artistName,
      bio: partner.bio || "",
      avatarUrl: partner.avatarUrl || "",
    },
    validators: {
      onChange: updatePartnerSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await update(partner.id, {
          artistName: value.artistName,
          bio: value.bio || undefined,
          avatarUrl: value.avatarUrl || undefined,
        })
        toast({
          title: "Profil mis à jour",
          description: "Vos modifications ont été enregistrées.",
        })
        onSuccess?.()
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour le profil.",
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
      className="space-y-6"
    >
      <form.Field
        name="artistName"
        validators={{
          onChange: updatePartnerSchema.shape.artistName,
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
            />
            <FieldError errors={field.state.meta.errors} />
          </FieldGroup>
        )}
      </form.Field>

      <form.Field
        name="avatarUrl"
        validators={{
          onChange: updatePartnerSchema.shape.avatarUrl,
        }}
      >
        {(field) => (
          <FieldGroup>
            <FieldLabel htmlFor={field.name}>URL Avatar</FieldLabel>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="https://..."
            />
            <FieldError errors={field.state.meta.errors} />
          </FieldGroup>
        )}
      </form.Field>

      <form.Field
        name="bio"
        validators={{
          onChange: updatePartnerSchema.shape.bio,
        }}
      >
        {(field) => (
          <FieldGroup>
            <FieldLabel htmlFor={field.name}>Biographie</FieldLabel>
            <Textarea
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="min-h-[120px]"
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
