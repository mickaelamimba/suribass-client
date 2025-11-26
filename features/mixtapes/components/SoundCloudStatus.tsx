"use client"

import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { CheckCircle2, XCircle } from "lucide-react"
import { useSoundCloud } from "../hooks/useSoundCloud"

interface SoundCloudStatusProps {
  variant?: "default" | "compact"
  showDetails?: boolean
}

export function SoundCloudStatus({
  variant = "default",
  showDetails = false
}: SoundCloudStatusProps) {
  const { status, isLoading } = useSoundCloud()

  if (isLoading) {
    return <Skeleton className="h-6 w-24" />
  }

  const isConnected = status?.connected || false

  if (variant === "compact") {
    return (
      <Badge variant={isConnected ? "default" : "secondary"} className="gap-1">
        {isConnected ? (
          <>
            <CheckCircle2 className="h-3 w-3" />
            Connecté
          </>
        ) : (
          <>
            <XCircle className="h-3 w-3" />
            Déconnecté
          </>
        )}
      </Badge>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Badge variant={isConnected ? "default" : "secondary"} className="gap-1">
        {isConnected ? (
          <>
            <CheckCircle2 className="h-3 w-3" />
            SoundCloud connecté
          </>
        ) : (
          <>
            <XCircle className="h-3 w-3" />
            SoundCloud déconnecté
          </>
        )}
      </Badge>
      {showDetails && isConnected && status?.expiresAt && (
        <span className="text-xs text-muted-foreground">
          Expire le {new Date(status.expiresAt).toLocaleDateString("fr-FR")}
        </span>
      )}
    </div>
  )
}
