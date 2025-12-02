"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/features/auth"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import {
  Calendar,
  Crown,
  Mail,
  Music2,
  Pencil,
  Shield,
  User,
} from "lucide-react"
import Link from "next/link"

export function ProfilePageClient() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <ProfileSkeleton />
  }

  if (!user) {
    return (
      <div className="container py-8">
        <Card className="mx-auto max-w-2xl">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <User className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Non connecté</h2>
            <p className="text-muted-foreground mb-4">
              Connectez-vous pour voir votre profil
            </p>
            <Button asChild>
              <Link href="/login">Se connecter</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const roleInfo = {
    Admin: { icon: Crown, color: "bg-red-500", label: "Administrateur" },
    Partner: { icon: Music2, color: "bg-blue-500", label: "Partenaire" },
    User: { icon: User, color: "bg-green-500", label: "Utilisateur" },
  }

  const currentRole = roleInfo[user.role] || roleInfo.User

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mon Profil</h1>
            <p className="text-muted-foreground">
              Gérez vos informations personnelles
            </p>
          </div>
          <Button variant="outline" disabled>
            <Pencil className="mr-2 h-4 w-4" />
            Modifier le profil
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Carte principale */}
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-20 w-20 border-4 border-background shadow-lg">
                  <AvatarImage src={user.partner?.avatarUrl || undefined} />
                  <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
                    {user.username[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-2xl">{user.username}</CardTitle>
                    <Badge 
                      variant="secondary" 
                      className={`${currentRole.color} text-white`}
                    >
                      <currentRole.icon className="mr-1 h-3 w-3" />
                      {currentRole.label}
                    </Badge>
                  </div>
                  <CardDescription className="mt-1 flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {user.email}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Separator />
              
              {/* Informations */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Identifiant
                  </p>
                  <p className="font-mono text-sm">{user.id}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Membre depuis
                  </p>
                  <p className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {user.createdAt 
                      ? format(new Date(user.createdAt), "d MMMM yyyy", { locale: fr })
                      : "Date inconnue"
                    }
                  </p>
                </div>
              </div>

              {/* Partner Info */}
              {user.partner && (
                <>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Music2 className="h-5 w-5" />
                      Profil Artiste
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Nom d'artiste
                        </p>
                        <p className="font-medium">{user.partner.artistName}</p>
                      </div>
                      {user.partner.bio && (
                        <div className="space-y-1 sm:col-span-2">
                          <p className="text-sm font-medium text-muted-foreground">
                            Biographie
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {user.partner.bio}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions rapides */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/favorites">
                    <User className="mr-2 h-4 w-4" />
                    Mes favoris
                  </Link>
                </Button>
                
                {(user.role === "Partner" || user.role === "Admin") && (
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/partners/dashboard">
                      <Music2 className="mr-2 h-4 w-4" />
                      Dashboard partenaire
                    </Link>
                  </Button>
                )}
                
                {user.role === "Admin" && (
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/admin">
                      <Shield className="mr-2 h-4 w-4" />
                      Administration
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Sécurité */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sécurité</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" disabled>
                  Changer le mot de passe
                </Button>
                <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive" disabled>
                  Supprimer mon compte
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfileSkeleton() {
  return (
    <div className="container py-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-9 w-48" />
            <Skeleton className="h-5 w-64" />
          </div>
          <Skeleton className="h-10 w-40" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-start gap-4">
                <Skeleton className="h-20 w-20 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-7 w-48" />
                  <Skeleton className="h-5 w-64" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Separator />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-5 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-5 w-40" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
