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

  // Calculate derived state
  const threatLevel = dashboard?.summary.failedLogins > 10 || dashboard?.summary.injectionAttempts > 0 
    ? "High" 
    : dashboard?.summary.failedLogins > 5 
      ? "Medium" 
      : "Low"
      
  const activeAlerts = (dashboard?.summary.suspiciousActivities || 0) + (dashboard?.summary.injectionAttempts || 0)

  // Map to expected props for MetricsGrid
  const metricsStats = {
    failedLoginAttempts: {
      last24h: dashboard?.summary.failedLogins || 0,
      trend: 0, // Not available in API
    },
    lockedAccounts: {
      current: dashboard?.summary.accountsLocked || 0,
      last24h: 0, // Not available
    },
    rateLimitHits: {
      last24h: dashboard?.summary.rateLimitViolations || 0,
      topEndpoints: [], // Not available
    },
    injectionAttempts: {
      last24h: dashboard?.summary.injectionAttempts || 0,
      last7days: 0, // Not available
    }
  }

  // Map hourly trend to chart data
  const chartData = dashboard?.hourlyTrend.map(item => ({
    timestamp: item.hour,
    count: item.count
  })) || []

  return (
    <div className="flex flex-col gap-6">
      {/* Alerte Critique */}
      {(threatLevel === "Critical" || activeAlerts > 0) && (
        <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Attention requise</AlertTitle>
          <AlertDescription>
            Niveau de menace {threatLevel} détecté avec {activeAlerts} alerte(s) active(s).
          </AlertDescription>
        </Alert>
      )}

      {/* Threat Level */}
      <ThreatLevelIndicator 
        level={threatLevel} 
        activeAlerts={activeAlerts} 
      />

      {/* Metrics Grid */}
      <SecurityMetricsGrid stats={metricsStats} />

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <FailedLoginsChart data={chartData} />
        {/* RateLimit chart needs its own data or we reuse hourly trend for now */}
        <RateLimitStatsChart data={[]} /> 
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
