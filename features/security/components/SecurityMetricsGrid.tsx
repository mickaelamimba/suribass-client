import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Lock, ShieldAlert, UserX } from "lucide-react"
import type { SecurityDashboardDto } from "../api/security.types"

interface SecurityMetricsGridProps {
  stats: SecurityDashboardDto
}

export function SecurityMetricsGrid({ stats }: SecurityMetricsGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Échecs de connexion (24h)</CardTitle>
          <UserX className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.failedLoginAttempts?.last24h}</div>
          <p className="text-xs text-muted-foreground">
            {stats.failedLoginAttempts?.trend > 0 ? '+' : ''}{stats.failedLoginAttempts?.trend}% vs période préc.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Comptes verrouillés</CardTitle>
          <Lock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.lockedAccounts?.current}</div>
          <p className="text-xs text-muted-foreground">
            {stats.lockedAccounts?.last24h} nouveaux ces dernières 24h
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Rate Limit Hits (24h)</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.rateLimitHits?.last24h}</div>
          <p className="text-xs text-muted-foreground">
            Top: {stats.rateLimitHits?.topEndpoints[0]?.endpoint || 'Aucun'}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Injections détectées</CardTitle>
          <ShieldAlert className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.injectionAttempts?.last24h}</div>
          <p className="text-xs text-muted-foreground">
            {stats.injectionAttempts?.last7days} sur les 7 derniers jours
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
