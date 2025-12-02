"use client"

import { useAuth } from "@/features/auth"
import { usePartnerDashboard } from "@/features/partners/hooks/usePartnerDashboard"
import { PartnerDashboard } from "./PartnerDashboard"

export function PartnerDashboardClient() {
  const { user } = useAuth()
  const partnerId = user?.partnerId || ""
  const { dashboard, isLoading, error } = usePartnerDashboard(partnerId)

  if (!user?.isPartner || !user?.partnerId) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <p className="text-muted-foreground">Vous n&apos;êtes pas encore partenaire.</p>
        <a href="/partners/register" className="text-primary underline">Devenir partenaire</a>
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

  if (error || !dashboard) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <p className="text-destructive">Impossible de charger le dashboard.</p>
        <p className="text-xs text-muted-foreground">Partner ID: {partnerId}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Suivez vos performances et gérez votre activité.
        </p>
      </div>
      
      <PartnerDashboard dashboard={dashboard} />
    </div>
  )
}
