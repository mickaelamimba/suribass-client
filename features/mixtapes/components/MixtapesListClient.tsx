"use client"

import { MixtapeFilters, MixtapeGrid } from "@/features/mixtapes/components"
import { useMixtapes } from "@/features/mixtapes/hooks/useMixtapes"
import type { MixtapeFiltersData } from "@/features/mixtapes/schemas/mixtape.schema"
import { useState } from "react"

export function MixtapesListClient() {
  const [filters, setFilters] = useState<MixtapeFiltersData>({
    sortBy: "recent",
  })

  const { mixtapes, isLoading } = useMixtapes({
    page: 1,
    pageSize: 20,
    ...filters,
  })

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Mixtapes</h1>
        <p className="text-muted-foreground">
          Découvrez les dernières mixtapes exclusives de SuribassMusic.
        </p>
      </div>

      <MixtapeFilters filters={filters} onFiltersChange={setFilters} />
      
      <MixtapeGrid mixtapes={mixtapes?.items} isLoading={isLoading} />
      
      {/* Pagination would go here */}
    </div>
  )
}
