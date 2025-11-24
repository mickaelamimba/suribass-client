"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthGuard } from "@/features/auth/components/AuthGuard"
import { CheckCircle2 } from "lucide-react"
import { RegisterPartnerForm } from "./RegisterPartnerForm"

export function RegisterPartnerClient() {
  const benefits = [
    "Profil artiste dédié et personnalisable",
    "Tableau de bord analytics complet",
    "Gestion de vos tracks et collaborations",
    "Visibilité accrue sur la plateforme",
  ]

  return (
    <AuthGuard>
      <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-8">
        <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-2">
          <div className="flex flex-col justify-center gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Devenez Partenaire
              </h1>
              <p className="text-lg text-muted-foreground">
                Rejoignez la communauté SuribassMusic et partagez votre musique avec le monde.
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Créer votre profil artiste</CardTitle>
              <CardDescription>
                Remplissez ce formulaire pour commencer votre aventure.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RegisterPartnerForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthGuard>
  )
}
