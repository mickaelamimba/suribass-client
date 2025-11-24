"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
    FailedLoginsChart,
    RateLimitStatsChart,
    SecurityMetricsGrid,
    ThreatLevelIndicator,
} from "@/features/security/components"
import { useSecurityDashboard } from "@/features/security/hooks/useSecurityDashboard"
import { AlertTriangle } from "lucide-react"

export function SecurityDashboardClient() {
  const { dashboard, isLoading, isError } = useSecurityDashboard()
  console.log(dashboard)

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (isError || !dashboard) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Erreur</AlertTitle>
        <AlertDescription>
          Impossible de charger le tableau de bord de sécurité.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Alerte Critique */}
      {(dashboard.threatLevel === "Critical" || dashboard.activeAlerts > 0) && (
        <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Attention requise</AlertTitle>
          <AlertDescription>
            Niveau de menace {dashboard.threatLevel} détecté avec {dashboard.activeAlerts} alerte(s) active(s).
          </AlertDescription>
        </Alert>
      )}

      {/* Threat Level */}
      <ThreatLevelIndicator 
        level={dashboard.threatLevel} 
        activeAlerts={dashboard.activeAlerts} 
      />

      {/* Metrics Grid */}
      <SecurityMetricsGrid stats={dashboard} />

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <FailedLoginsChart data={dashboard.failedLoginsTimeline || []} />
        <RateLimitStatsChart data={dashboard.rateLimitTimeline || []} />
      </div>

      {/* Recent Events & Blocked IPs */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Événements récents</h3>
          {/* Note: On pourrait créer un composant simplifié pour le dashboard */}
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">IPs Bloquées récemment</h3>
          {/* Note: Idem */}
        </div>
      </div>
    </div>
  )
}
