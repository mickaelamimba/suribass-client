"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { GlobalStatsGrid } from "@/features/admin/components/GlobalStatsGrid"
import { ScoreRefreshButton } from "@/features/admin/components/ScoreRefreshButton"
import { TopCategoriesChart } from "@/features/admin/components/TopCategoriesChart"
import { TopPartnersTable } from "@/features/admin/components/TopPartnersTable"
import { useGlobalStats } from "@/features/admin/hooks/useGlobalStats"

export function AdminDashboardClient() {
  const { stats, isLoading, isError } = useGlobalStats()
  console.log(stats)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(7)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    )
  }

  if (isError || !stats) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Erreur lors du chargement des statistiques
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex justify-end">
        <ScoreRefreshButton />
      </div>

      {/* Stats Grid */}
      <GlobalStatsGrid stats={stats} />

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <TopCategoriesChart data={stats.topCategories || []} />
        <TopPartnersTable data={stats.topPartners || []} />
      </div>
    </div>
  )
}
