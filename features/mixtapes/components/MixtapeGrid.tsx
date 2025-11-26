import type { MixtapeDto } from "../api/mixtapes.types"
import { MixtapeCard } from "./MixtapeCard"
import { MixtapeSkeleton } from "./MixtapeSkeleton"

interface MixtapeGridProps {
  mixtapes: MixtapeDto[] | undefined
  isLoading?: boolean
}

export function MixtapeGrid({ mixtapes, isLoading }: MixtapeGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <MixtapeSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (!mixtapes || mixtapes.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-in fade-in-50">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <svg
            className="h-6 w-6 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
            />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-semibold">Aucune mixtape trouvée</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          Essayez de modifier vos filtres ou revenez plus tard.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {mixtapes.map((mixtape) => (
        <MixtapeCard key={mixtape.id} mixtape={mixtape} />
      ))}
    </div>
  )
}
