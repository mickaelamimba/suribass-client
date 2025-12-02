"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/features/auth"
import { usePartnerStats } from "../hooks/usePartnerStats"
import { BarChart3, Eye, Heart, Music2, TrendingUp } from "lucide-react"
import Link from "next/link"

export function PartnerStatsClient() {
  const { user } = useAuth()
  const partnerId = user?.partnerId || ""
  const { stats, isLoading } = usePartnerStats(partnerId)

  if (!user?.isPartner || !user?.partnerId) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <p className="text-muted-foreground">Vous n&apos;êtes pas encore partenaire.</p>
        <Link href="/partners/register" className="text-primary underline">Devenir partenaire</Link>
      </div>
    )
  }

  const statCards = [
    {
      title: "Total Tracks",
      value: stats?.totalTracks ?? 0,
      icon: Music2,
      description: "Tracks publiées",
    },
    {
      title: "Vues totales",
      value: stats?.totalViews ?? 0,
      icon: Eye,
      description: "Sur toutes vos tracks",
    },
    {
      title: "Favoris",
      value: stats?.totalFavorites ?? 0,
      icon: Heart,
      description: "Utilisateurs qui vous suivent",
    },
    {
      title: "Score moyen",
      value: stats?.averageScore?.toFixed(1) ?? "N/A",
      icon: TrendingUp,
      description: "Note moyenne de vos tracks",
    },
  ]

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Statistiques</h1>
        <p className="text-muted-foreground">
          Suivez vos performances et l&apos;engagement de votre audience.
        </p>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                <div className="h-4 w-4 animate-pulse rounded bg-muted" />
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 animate-pulse rounded bg-muted" />
                <div className="mt-2 h-3 w-32 animate-pulse rounded bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Évolution des vues
          </CardTitle>
          <CardDescription>
            Statistiques détaillées à venir
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-48 items-center justify-center rounded-lg border border-dashed">
            <p className="text-muted-foreground">
              Graphiques de statistiques (bientôt disponible)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
