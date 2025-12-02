"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/features/auth"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useTrackFilters } from "../hooks/useTrackFilters"
import { useTracks } from "../hooks/useTracks"
import { TrackFilters } from "./TrackFilters"
import { TrackGrid } from "./TrackGrid"

export function TracksListClient() {
  const { apiFilters } = useTrackFilters()
  
  const { tracks, isLoading } = useTracks({
    pageIndex: 1,
    pageSize: 20,
    ...apiFilters,
  })

  const { user } = useAuth()
  const canCreate = user && (user.role === "Partner" || user.role === "Admin")

  return (
    <div className="container py-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Tracks</h1>
          <p className="text-muted-foreground">
            Découvrez les dernières sorties de nos partenaires.
          </p>
        </div>
        
        {canCreate && (
          <Button asChild>
            <Link href="/tracks/create">
              <Plus className="mr-2 h-4 w-4" />
              Ajouter une track
            </Link>
          </Button>
        )}
      </div>

      <div className="mb-8">
        <TrackFilters />
      </div>

      <TrackGrid tracks={tracks?.items} isLoading={isLoading} />
    </div>
  )
}
