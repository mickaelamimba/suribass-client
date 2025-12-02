"use client"

import { useForm } from "@tanstack/react-form"
import { useRouter } from "next/navigation"
import * as React from "react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { getSession, signUp } from "@/lib/auth-client"
import { getDefaultRedirectForRole } from "@/lib/routes.config"
import { registerSchema } from "../schemas/auth.schema"
import { GoogleSignInButton } from "./GoogleSignInButton"

export function RegisterForm() {
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: registerSchema,
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true)
      setError(null)
      try {
        const result = await signUp(value.email, value.username, value.password)
        if (result.success) {
          // Récupérer la session pour connaître le rôle
          const session = await getSession()
          const redirectUrl = getDefaultRedirectForRole(session?.user?.role)
          router.push(redirectUrl)
          router.refresh()
        } else {
          setError(result.error || "Une erreur est survenue lors de l'inscription")
        }
      } catch (err: any) {
        setError(err.message || "Une erreur est survenue lors de l'inscription")
      } finally {
        setIsLoading(false)
      }
    },
  })

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Inscription</CardTitle>
        <CardDescription>
          Créez un compte pour commencer.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="register-form"
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="space-y-4"
        >
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <FieldGroup>
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && field.state.meta.errors.length > 0
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="exemple@email.com"
                      autoComplete="email"
                      className={isInvalid ? "border-destructive" : ""}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )
              }}
            />

            <form.Field
              name="username"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && field.state.meta.errors.length > 0
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Nom d'utilisateur</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Pseudo"
                      autoComplete="username"
                      className={isInvalid ? "border-destructive" : ""}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )
              }}
            />

            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && field.state.meta.errors.length > 0
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Mot de passe</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      className={isInvalid ? "border-destructive" : ""}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )
              }}
            />

            <form.Field
              name="confirmPassword"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && field.state.meta.errors.length > 0
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Confirmer le mot de passe</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      className={isInvalid ? "border-destructive" : ""}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button
          type="submit"
          form="register-form"
          className="w-full"
          disabled={isLoading || !form.state.canSubmit}
        >
          {isLoading ? "Inscription..." : "S'inscrire"}
        </Button>

        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Ou continuer avec
            </span>
          </div>
        </div>

        <GoogleSignInButton 
          onError={(err) => setError(err)} 
          disabled={isLoading} 
        />
      </CardFooter>
    </Card>
  )
}
