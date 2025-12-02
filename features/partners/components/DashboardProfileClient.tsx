"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/features/auth"
import { usePartnerById } from "@/features/partners/hooks/usePartnerById"
import { UpdatePartnerForm } from "./UpdatePartnerForm"
import Link from "next/link"

export function DashboardProfileClient() {
  const { user } = useAuth()
  const partnerId = user?.partnerId || ""
  const { partner, isLoading } = usePartnerById(partnerId)

  if (!user?.isPartner || !user?.partnerId) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <p className="text-muted-foreground">Vous n&apos;êtes pas encore partenaire.</p>
        <Link href="/partners/register" className="text-primary underline">Devenir partenaire</Link>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!partner) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <p className="text-destructive">Impossible de charger le profil.</p>
        <p className="text-xs text-muted-foreground">Partner ID: {partnerId}</p>
      </div>
    )
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
