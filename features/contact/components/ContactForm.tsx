"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "@tanstack/react-form"
import { CheckCircle, Loader2, Send } from "lucide-react"
import * as React from "react"
import { sendContactForm } from "../actions/contact.actions"
import { contactFormSchema } from "../schemas/contact.schema"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitResult, setSubmitResult] = React.useState<{
    success: boolean
    message: string
  } | null>(null)

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validators: {
      onSubmit: contactFormSchema,
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true)
      setSubmitResult(null)

      const result = await sendContactForm(value)
      setSubmitResult(result)

      if (result.success) {
        form.reset()
      }

      setIsSubmitting(false)
    },
  })

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl">Envoyez-nous un message</CardTitle>
        <CardDescription>
          Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {submitResult?.success ? (
          <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700 dark:text-green-300">
              {submitResult.message}
            </AlertDescription>
          </Alert>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
          >
            <div className="space-y-6">
              {submitResult && !submitResult.success && (
                <Alert variant="destructive">
                  <AlertDescription>{submitResult.message}</AlertDescription>
                </Alert>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <form.Field name="name">
                  {(field) => (
                    <FieldGroup>
                      <FieldLabel htmlFor={field.name}>Nom complet</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Jean Dupont"
                        disabled={isSubmitting}
                      />
                      <FieldError errors={field.state.meta.errors} />
                    </FieldGroup>
                  )}
                </form.Field>

                <form.Field name="email">
                  {(field) => (
                    <FieldGroup>
                      <FieldLabel htmlFor={field.name}>Adresse email</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="email"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="jean@example.com"
                        disabled={isSubmitting}
                      />
                      <FieldError errors={field.state.meta.errors} />
                    </FieldGroup>
                  )}
                </form.Field>
              </div>

              <form.Field name="subject">
                {(field) => (
                  <FieldGroup>
                    <FieldLabel htmlFor={field.name}>Sujet</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Question sur SuribassMusic"
                      disabled={isSubmitting}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </FieldGroup>
                )}
              </form.Field>

              <form.Field name="message">
                {(field) => (
                  <FieldGroup>
                    <FieldLabel htmlFor={field.name}>Message</FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Bonjour, j'ai une question..."
                      rows={6}
                      disabled={isSubmitting}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </FieldGroup>
                )}
              </form.Field>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Envoyer le message
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
