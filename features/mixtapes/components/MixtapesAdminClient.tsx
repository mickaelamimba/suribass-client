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
import { SyncButton } from "@/features/mixtapes/components"
import { useMixtapes } from "@/features/mixtapes/hooks/useMixtapes"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Edit2 } from "lucide-react"
import Link from "next/link"

export function MixtapesAdminClient() {
  const { mixtapes, isLoading } = useMixtapes({
    pageIndex: 1,
    pageSize: 50,
    sortBy: "recent",
  })

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Gestion des Mixtapes</h1>
          <p className="text-muted-foreground">
            Synchronisez et gérez les mixtapes depuis SoundCloud.
          </p>
        </div>
        <SyncButton />
      </div>

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
                  <div className="flex flex-col">
                    <span>{mixtape.title}</span>
                    <span className="text-xs text-muted-foreground">ID: {mixtape.soundCloudId}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{mixtape.categoryName}</Badge>
                </TableCell>
                <TableCell>
                  {mixtape.platformStats.viewCount + mixtape.siteStats.viewCount}
                </TableCell>
                <TableCell>
                  {mixtape.score ? (
                    <Badge variant={mixtape.score.value >= 80 ? "default" : "secondary"}>
                      {mixtape.score.value}
                    </Badge>
                  ) : "-"}
                </TableCell>
                <TableCell>
                  {format(new Date(mixtape.lastSyncAt), "PP p", { locale: fr })}
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
