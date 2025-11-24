"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Disc, Music } from "lucide-react"
import { useCategories } from "../hooks/useCategories"
import { CategoryCard } from "./CategoryCard"

export function CategoriesListClient() {
  const { categories, isLoading } = useCategories()

  const totalTracks = categories.reduce((acc, cat) => acc + cat.trackCount, 0)
  const totalMixtapes = categories.reduce((acc, cat) => acc + cat.mixtapeCount, 0)

  return (
    <div className="container py-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Catégories</h1>
          <p className="text-muted-foreground">
            Explorez notre catalogue par genre musical.
          </p>
        </div>

        <div className="flex gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 rounded-lg border bg-card px-3 py-1">
            <Music className="h-4 w-4" />
            <span>{totalTracks} Tracks</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border bg-card px-3 py-1">
            <Disc className="h-4 w-4" />
            <span>{totalMixtapes} Mixtapes</span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      ) : categories.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <div className="flex h-60 items-center justify-center rounded-lg border border-dashed">
          <p className="text-muted-foreground">Aucune catégorie disponible.</p>
        </div>
      )}
    </div>
  )
}
