import type { TrackDto } from "../api/tracks.types"
import { TrackCard } from "./TrackCard"
import { TrackSkeleton } from "./TrackSkeleton"

interface TrackGridProps {
  tracks?: TrackDto[]
  isLoading?: boolean
}

export function TrackGrid({ tracks, isLoading }: TrackGridProps) {
  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <TrackSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (!tracks || tracks.length === 0) {
    return (
      <div className="flex h-60 items-center justify-center rounded-lg border border-dashed">
        <p className="text-muted-foreground">Aucune track trouvée.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tracks.map((track) => (
        <TrackCard key={track.id} track={track} />
      ))}
    </div>
  )
}
