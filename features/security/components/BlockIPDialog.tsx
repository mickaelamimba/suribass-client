"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  FieldError,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useForm } from "@tanstack/react-form"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useBlockIP } from "../hooks/useBlockIP"
import { blockIPSchema } from "../schemas/security.schema"

interface BlockIPDialogProps {
  onSuccess: () => void
}

export function BlockIPDialog({ onSuccess }: BlockIPDialogProps) {
  const [open, setOpen] = useState(false)
  const { blockIP, isLoading } = useBlockIP()
  const { toast } = useToast()

  const form = useForm({
    defaultValues: {
      ipAddress: "",
      reason: "",
      duration: 24 as number | null | undefined,
    },
    validators: {
      onChange: blockIPSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await blockIP({
          ipAddress: value.ipAddress,
          reason: value.reason,
          duration: value.duration || null,
        })
        toast({
          title: "IP Bloquée",
          description: `L'adresse IP ${value.ipAddress} a été bloquée avec succès.`,
        })
        setOpen(false)
        form.reset()
        onSuccess()
      } catch (error: any) {
        toast({
          title: "Erreur",
          description: error.message || "Impossible de bloquer l'IP.",
          variant: "destructive",
        })
      }
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Bloquer une IP
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Bloquer une adresse IP</DialogTitle>
          <DialogDescription>
            Bloquer manuellement une adresse IP suspecte.
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
          <form.Field
            name="ipAddress"
            validators={{
              onChange: blockIPSchema.shape.ipAddress,
            }}
          >
            {(field) => (
              <FieldGroup>
                <FieldLabel htmlFor={field.name}>Adresse IP</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="192.168.1.1"
                />
                <FieldError errors={field.state.meta.errors} />
              </FieldGroup>
            )}
          </form.Field>

          <form.Field
            name="reason"
            validators={{
              onChange: blockIPSchema.shape.reason,
            }}
          >
            {(field) => (
              <FieldGroup>
                <FieldLabel htmlFor={field.name}>Raison</FieldLabel>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Tentatives de connexion suspectes..."
                />
                <FieldError errors={field.state.meta.errors} />
              </FieldGroup>
            )}
          </form.Field>

          <form.Field
            name="duration"
            validators={{
              onChange: blockIPSchema.shape.duration,
            }}
          >
            {(field) => (
              <FieldGroup>
                <FieldLabel htmlFor={field.name}>Durée (heures)</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  value={field.state.value ?? ""}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value ? parseInt(e.target.value) : null)}
                />
                <FieldError errors={field.state.meta.errors} />
              </FieldGroup>
            )}
          </form.Field>

          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Blocage..." : "Bloquer l'IP"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
