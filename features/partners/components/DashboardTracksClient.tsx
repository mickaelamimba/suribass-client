"use client"

import { useAuth } from "@/features/auth"
import { PartnerTracksSection } from "./PartnerTracksSection"
import Link from "next/link"

export function DashboardTracksClient() {
  const { user } = useAuth()
  const partnerId = user?.partnerId || ""

  if (!user?.isPartner || !user?.partnerId) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <p className="text-muted-foreground">Vous n&apos;êtes pas encore partenaire.</p>
        <Link href="/partners/register" className="text-primary underline">Devenir partenaire</Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mes Tracks</h1>
        <p className="text-muted-foreground">
          Gérez votre discographie et ajoutez de nouvelles musiques.
        </p>
      </div>

      <PartnerTracksSection partnerId={partnerId} isOwner />
    </div>
  )
}
