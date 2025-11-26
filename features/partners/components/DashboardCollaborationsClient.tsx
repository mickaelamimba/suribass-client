"use client"

import { useAuth } from "@/features/auth"
import { CollaborationManager } from "./CollaborationManager"

export function DashboardCollaborationsClient() {
  const { user } = useAuth()

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Collaborations</h1>
        <p className="text-muted-foreground">
          Gérez vos featurings et vos apparitions sur d'autres tracks.
        </p>
      </div>

      <CollaborationManager partnerId={user?.id || ""} />
    </div>
  )
}
