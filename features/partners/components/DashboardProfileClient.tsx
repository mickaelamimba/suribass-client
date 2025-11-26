"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/features/auth"
import { usePartnerById } from "@/features/partners/hooks/usePartnerById"
import { UpdatePartnerForm } from "./UpdatePartnerForm"

export function DashboardProfileClient() {
  const { user } = useAuth()
  const { partner, isLoading } = usePartnerById(user?.id || "")

  if (isLoading) {
    return <div>Chargement du profil...</div>
  }

  if (!partner) {
    return <div>Impossible de charger le profil.</div>
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mon Profil Artiste</h1>
        <p className="text-muted-foreground">
          Modifiez les informations visibles sur votre page publique.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations générales</CardTitle>
          <CardDescription>
            Ces informations seront visibles par tous les utilisateurs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UpdatePartnerForm partner={partner} />
        </CardContent>
      </Card>
    </div>
  )
}
