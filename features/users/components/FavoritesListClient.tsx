"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Heart } from "lucide-react"
import { useState } from "react"
import { useUserFavorites } from "../hooks/useUserFavorites"
import { FavoriteItemCard, FavoriteItemSkeleton } from "./FavoriteItemCard"

interface FavoritesListClientProps {
  initialPageSize?: number
}

export function FavoritesListClient({ initialPageSize = 12 }: FavoritesListClientProps) {
  const [pageIndex, setPageIndex] = useState(1)
  const { favorites, isLoading, isError } = useUserFavorites({
    pageIndex,
    pageSize: initialPageSize,
  })

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Mes favoris</h1>
          <p className="text-muted-foreground">
            Retrouvez tous vos contenus favoris.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <FavoriteItemSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="container flex min-h-[50vh] flex-col items-center justify-center py-8">
        <p className="text-lg font-semibold text-destructive">
          Erreur lors du chargement des favoris
        </p>
        <p className="text-sm text-muted-foreground">
          Veuillez réessayer plus tard
        </p>
      </div>
    )
  }

  if (!favorites || favorites.items.length === 0) {
    return (
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Mes favoris</h1>
          <p className="text-muted-foreground">
            Retrouvez tous vos contenus favoris.
          </p>
        </div>
        <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <Heart className="mb-4 h-12 w-12 text-muted-foreground/50" />
          <h3 className="text-lg font-semibold">Aucun favori pour le moment</h3>
          <p className="text-sm text-muted-foreground">
            Ajoutez des tracks et mixtapes à vos favoris pour les retrouver ici.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Mes favoris</h1>
        <p className="text-muted-foreground">
          {favorites.totalCount} {favorites.totalCount === 1 ? "favori" : "favoris"}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {favorites.items.map((item) => (
          <FavoriteItemCard key={item.id} item={item} />
        ))}
      </div>

      {favorites.totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPageIndex((p) => Math.max(1, p - 1))}
            disabled={!favorites.hasPreviousPage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {favorites.page} sur {favorites.totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPageIndex((p) => p + 1)}
            disabled={!favorites.hasNextPage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
