"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SoundCloudConnect, SoundCloudStatus, SyncButton } from "@/features/mixtapes/components"
import { useMixtapes } from "@/features/mixtapes/hooks/useMixtapes"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Edit2 } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export function MixtapesAdminClient() {
  const { mixtapes, isLoading } = useMixtapes({
    page: 1,
    pageSize: 50,
    sortBy: "recent",
  })
  const searchParams = useSearchParams()
  const { toast } = useToast()

  // Gérer les messages de callback SoundCloud
  useEffect(() => {
    const connected = searchParams.get("soundcloud_connected")
    const error = searchParams.get("soundcloud_error")

    if (connected === "true") {
      toast({
        title: "SoundCloud connecté",
        description: "Votre compte SoundCloud a été connecté avec succès.",
      })

      // Nettoyer l'URL
      window.history.replaceState({}, "", "/mixtapes/admin")
    }

    if (error) {
      const errorMessages: Record<string, string> = {
        no_code: "Aucun code d'autorisation reçu",
        unauthorized: "Vous devez être connecté",
        callback_failed: "Échec du traitement du callback",
        unknown_error: "Une erreur inconnue est survenue",
      }

      toast({
        title: "Erreur de connexion SoundCloud",
        description: errorMessages[error] || decodeURIComponent(error),
        variant: "destructive",
      })

      // Nettoyer l'URL
      window.history.replaceState({}, "", "/mixtapes/admin")
    }
  }, [searchParams, toast])

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Gestion des Mixtapes</h1>
          <p className="text-muted-foreground">
            Synchronisez et gérez les mixtapes depuis SoundCloud.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <SoundCloudStatus variant="default" showDetails />
          <SyncButton />
        </div>
      </div>

      {/* Carte de connexion SoundCloud */}
      <SoundCloudConnect />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Stats (Vues)</TableHead>
              <TableHead>Score IA</TableHead>
              <TableHead>Dernière Sync</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Chargement...
                </TableCell>
              </TableRow>
            ) : mixtapes?.items.map((mixtape) => (
              <TableRow key={mixtape.id}>
                <TableCell className="font-medium">
                  {mixtape.title}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{mixtape.categoryName}</Badge>
                </TableCell>
                <TableCell>
                  {mixtape.viewCount}
                </TableCell>
                <TableCell>
                  {mixtape.score !== null ? (
                    <Badge variant={mixtape.score >= 80 ? "default" : "secondary"}>
                      {mixtape.score}
                    </Badge>
                  ) : "-"}
                </TableCell>
                <TableCell>
                  {format(new Date(mixtape.createdAt), "PP p", { locale: fr })}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/mixtapes/${mixtape.id}`}>
                      <Edit2 className="h-4 w-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
