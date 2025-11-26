"use client"

import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Plus } from "lucide-react"
import Link from "next/link"
import { usePartnerTracks } from "../hooks/usePartnerTracks"

interface PartnerTracksSectionProps {
  partnerId: string
  isOwner?: boolean
}

export function PartnerTracksSection({ partnerId, isOwner }: PartnerTracksSectionProps) {
  const { tracks, isLoading } = usePartnerTracks(partnerId, {
    pageIndex: 1,
    pageSize: 20,
    sortBy: "recent",
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Tracks</h2>
        {isOwner && (
          <Button asChild>
            <Link href="/tracks/new">
              <Plus className="mr-2 h-4 w-4" />
              Ajouter une track
            </Link>
          </Button>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Date d'ajout</TableHead>
              <TableHead className="text-right">Durée</TableHead>
              <TableHead className="text-right">Vues</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  Chargement...
                </TableCell>
              </TableRow>
            ) : !tracks?.items?.length ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  Aucune track trouvée.
                </TableCell>
              </TableRow>
            ) : (
              tracks.items.map((track) => (
                <TableRow key={track.id}>
                  <TableCell className="font-medium">{track.title}</TableCell>
                  <TableCell>
                    {format(new Date(track.createdAt), "PP", { locale: fr })}
                  </TableCell>
                  <TableCell className="text-right">
                    {track.duration}
                  </TableCell>
                  <TableCell className="text-right">{track.viewCount}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
