"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CreateTrackModal } from "@/features/tracks/components/CreateTrackModal"
import { DeleteTrackModal } from "@/features/tracks/components/DeleteTrackModal"
import { EditTrackModal } from "@/features/tracks/components/EditTrackModal"
import type { TrackDto } from "@/features/tracks/api/tracks.types"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Edit, MoreHorizontal, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { usePartnerTracks } from "../hooks/usePartnerTracks"

interface PartnerTracksSectionProps {
  partnerId: string
  isOwner?: boolean
}

export function PartnerTracksSection({ partnerId, isOwner }: PartnerTracksSectionProps) {
  const { tracks, isLoading, mutate } = usePartnerTracks(partnerId, {
    pageIndex: 1,
    pageSize: 20,
    sortBy: "recent",
  })

  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedTrack, setSelectedTrack] = useState<TrackDto | null>(null)

  const handleEdit = (track: TrackDto) => {
    setSelectedTrack(track)
    setEditModalOpen(true)
  }

  const handleDelete = (track: TrackDto) => {
    setSelectedTrack(track)
    setDeleteModalOpen(true)
  }

  const handleSuccess = () => {
    mutate()
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Tracks</h2>
        {isOwner && (
          <Button onClick={() => setCreateModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter une track
          </Button>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Date d&apos;ajout</TableHead>
              <TableHead className="text-right">Durée</TableHead>
              <TableHead className="text-right">Vues</TableHead>
              {isOwner && <TableHead className="w-[70px]" />}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={isOwner ? 5 : 4} className="h-24 text-center">
                  Chargement...
                </TableCell>
              </TableRow>
            ) : !tracks?.items?.length ? (
              <TableRow>
                <TableCell colSpan={isOwner ? 5 : 4} className="h-24 text-center text-muted-foreground">
                  Aucune track trouvée.
                </TableCell>
              </TableRow>
            ) : (
              tracks.items.map((track) => (
                <TableRow key={track.id}>
                  <TableCell>
                    <Link 
                      href={`/tracks/${track.id}`} 
                      className="font-medium hover:underline"
                    >
                      {track.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {track.createdAt && format(new Date(track.createdAt), "PP", { locale: fr })}
                  </TableCell>
                  <TableCell className="text-right">
                    {track.duration}
                  </TableCell>
                  <TableCell className="text-right">{track.viewCount}</TableCell>
                  {isOwner && (
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(track)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(track)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modals */}
      <CreateTrackModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSuccess={handleSuccess}
      />

      <EditTrackModal
        track={selectedTrack}
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        onSuccess={handleSuccess}
      />

      <DeleteTrackModal
        track={selectedTrack}
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onSuccess={handleSuccess}
      />
    </div>
  )
}
