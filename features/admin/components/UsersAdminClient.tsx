"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useGlobalStats } from "@/features/admin/hooks/useGlobalStats"
import { AlertTriangle, Construction, TrendingUp, UserCheck, UserPlus, Users } from "lucide-react"

export function UsersAdminClient() {
  const { stats, isLoading, isError } = useGlobalStats()

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-64" />
      </div>
    )
  }

  if (isError || !stats) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Erreur lors du chargement des statistiques utilisateurs
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats utilisateurs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Utilisateurs totaux
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Comptes enregistrés sur la plateforme
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Partenaires
            </CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPartners.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Artistes et créateurs vérifiés
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Nouveaux utilisateurs
            </CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.newUsersLast30Days?.toLocaleString() || "—"}
            </div>
            <p className="text-xs text-muted-foreground">
              Au cours des 30 derniers jours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ratio partenaires
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalUsers > 0 
                ? ((stats.totalPartners / stats.totalUsers) * 100).toFixed(1) + "%"
                : "—"
              }
            </div>
            <p className="text-xs text-muted-foreground">
              Utilisateurs devenus partenaires
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Notice fonctionnalité en développement */}
      <Alert>
        <Construction className="h-4 w-4" />
        <AlertTitle>Module en développement</AlertTitle>
        <AlertDescription className="mt-2">
          <p className="mb-3">
            La gestion détaillée des utilisateurs (liste, recherche, modification des rôles, 
            suspension de comptes) sera disponible dans une prochaine mise à jour.
          </p>
          <p className="text-sm text-muted-foreground">
            Pour le moment, utilisez les statistiques ci-dessus pour avoir une vue d&apos;ensemble 
            des utilisateurs de la plateforme.
          </p>
        </AlertDescription>
      </Alert>

      {/* Informations supplémentaires */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Types d&apos;utilisateurs</CardTitle>
            <CardDescription>
              Répartition des rôles sur la plateforme
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">User</Badge>
                <span className="text-sm text-muted-foreground">Utilisateurs standards</span>
              </div>
              <span className="font-medium">
                {(stats.totalUsers - stats.totalPartners).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="default">Partner</Badge>
                <span className="text-sm text-muted-foreground">Partenaires / Artistes</span>
              </div>
              <span className="font-medium">{stats.totalPartners.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="destructive">Admin</Badge>
                <span className="text-sm text-muted-foreground">Administrateurs</span>
              </div>
              <span className="font-medium text-muted-foreground">—</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activité utilisateurs</CardTitle>
            <CardDescription>
              Engagement global de la communauté
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Commentaires publiés</span>
              <span className="font-medium">{stats.totalComments?.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Likes donnés</span>
              <span className="font-medium">{stats.totalLikes?.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Vues totales</span>
              <span className="font-medium">{stats.totalViews?.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Tracks publiées</span>
              <span className="font-medium">{stats.totalTracks?.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
