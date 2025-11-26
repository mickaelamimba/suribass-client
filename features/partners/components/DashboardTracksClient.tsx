"use client"

import { useAuth } from "@/features/auth"
import { PartnerTracksSection } from "./PartnerTracksSection"

export function DashboardTracksClient() {
  const { user } = useAuth()

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mes Tracks</h1>
        <p className="text-muted-foreground">
          Gérez votre discographie et ajoutez de nouvelles musiques.
        </p>
      </div>

      <PartnerTracksSection partnerId={user?.id || ""} isOwner />
    </div>
  )
}
