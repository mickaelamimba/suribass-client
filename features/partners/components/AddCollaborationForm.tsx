"use client"

import { Button } from "@/components/ui/button"
import {
    FieldError,
    FieldGroup,
    FieldLabel
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useForm } from "@tanstack/react-form"
import { useAddCollaboration } from "../hooks/useAddCollaboration"
import { usePartnerTracks } from "../hooks/usePartnerTracks"
import { usePartners } from "../hooks/usePartners"
import { addCollaborationSchema } from "../schemas/partner.schema"

interface AddCollaborationFormProps {
  partnerId: string
  onSuccess?: () => void
}

export function AddCollaborationForm({ partnerId, onSuccess }: AddCollaborationFormProps) {
  const { addCollaboration, isLoading } = useAddCollaboration()
  const { toast } = useToast()
  
  // Fetch my tracks
  const { tracks } = usePartnerTracks(partnerId, { pageSize: 100 })
  
  // Fetch potential collaborators (all partners except me)
  const { partners } = usePartners({ pageSize: 100 })
  const collaborators = partners?.items.filter(p => p.id !== partnerId) || []

  const form = useForm({
    defaultValues: {
      trackId: "",
      collaboratorPartnerId: "",
      role: "featuring",
    },
    validators: {
      onChange: addCollaborationSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await addCollaboration(value)
        toast({
          title: "Collaboration ajoutée",
          description: "La collaboration a été enregistrée.",
        })
        onSuccess?.()
      } catch (error) {
        // Error handled in hook
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
        name="trackId"
        validators={{
          onChange: addCollaborationSchema.shape.trackId,
        }}
      >
        {(field) => (
          <FieldGroup>
            <FieldLabel htmlFor={field.name}>Track</FieldLabel>
            <Select
              value={field.state.value}
              onValueChange={field.handleChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une track" />
              </SelectTrigger>
              <SelectContent>
                {tracks?.items.map((track) => (
                  <SelectItem key={track.id} value={track.id}>
                    {track.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError errors={field.state.meta.errors} />
          </FieldGroup>
        )}
      </form.Field>

      <form.Field
        name="collaboratorPartnerId"
        validators={{
          onChange: addCollaborationSchema.shape.collaboratorPartnerId,
        }}
      >
        {(field) => (
          <FieldGroup>
            <FieldLabel htmlFor={field.name}>Collaborateur</FieldLabel>
            <Select
              value={field.state.value}
              onValueChange={field.handleChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un partenaire" />
              </SelectTrigger>
              <SelectContent>
                {collaborators.map((partner) => (
                  <SelectItem key={partner.id} value={partner.id}>
                    {partner.artistName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError errors={field.state.meta.errors} />
          </FieldGroup>
        )}
      </form.Field>

      <form.Field
        name="role"
        validators={{
          onChange: addCollaborationSchema.shape.role,
        }}
      >
        {(field) => (
          <FieldGroup>
            <FieldLabel htmlFor={field.name}>Rôle</FieldLabel>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="ex: featuring, producer, remix"
            />
            <FieldError errors={field.state.meta.errors} />
          </FieldGroup>
        )}
      </form.Field>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Ajout..." : "Ajouter la collaboration"}
      </Button>
    </form>
  )
}
