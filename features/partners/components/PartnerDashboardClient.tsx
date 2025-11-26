"use client"

import { useAuth } from "@/features/auth"
import { usePartnerDashboard } from "@/features/partners/hooks/usePartnerDashboard"
import { PartnerDashboard } from "./PartnerDashboard"

export function PartnerDashboardClient() {
  const { user } = useAuth()
  const { dashboard, isLoading } = usePartnerDashboard(user?.id || "")

  if (isLoading) {
    return <div>Chargement du dashboard...</div>
  }

  if (!dashboard) {
    return <div>Impossible de charger le dashboard.</div>
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
