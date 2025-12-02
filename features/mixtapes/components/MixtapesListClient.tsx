"use client"

import { MixtapeFilters, MixtapeGrid } from "@/features/mixtapes/components"
import { useMixtapeFilters } from "@/features/mixtapes/hooks/useMixtapeFilters"
import { useMixtapes } from "@/features/mixtapes/hooks/useMixtapes"

export function MixtapesListClient() {
  const { apiFilters } = useMixtapeFilters()

  const { mixtapes, isLoading } = useMixtapes({
    page: 1,
    pageSize: 20,
    ...apiFilters,
  })

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Mixtapes</h1>
        <p className="text-muted-foreground">
          Découvrez les dernières mixtapes exclusives de SuribassMusic.
        </p>
      </div>

      <MixtapeFilters />
      
      <MixtapeGrid mixtapes={mixtapes?.items} isLoading={isLoading} />
      
      {/* Pagination would go here */}
    </div>
  )
}
