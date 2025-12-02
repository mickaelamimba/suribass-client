"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/features/auth"
import { cn } from "@/lib/utils"
import { Star } from "lucide-react"
import { useState } from "react"
import { useFavorite } from "../hooks/useFavorite"

interface FavoriteButtonProps {
  trackId?: string
  mixtapeId?: string
  initialFavorited?: boolean
  size?: "sm" | "default" | "lg" | "icon"
  variant?: "outline" | "ghost" | "default"
  className?: string
}

export function FavoriteButton({
  trackId,
  mixtapeId,
  initialFavorited = false,
  size = "icon",
  variant = "outline",
  className,
}: FavoriteButtonProps) {
  const { isAuthenticated } = useAuth()
  const { toggleFavorite, isLoading } = useFavorite()
  const [isFavorited, setIsFavorited] = useState(initialFavorited)

  const handleClick = async () => {
    if (!isAuthenticated) {
      // TODO: Afficher un toast ou rediriger vers login
      return
    }

    try {
      const result = await toggleFavorite({ trackId, mixtapeId })
      if (result) {
        setIsFavorited(result.isFavorited)
      }
    } catch {
      // Erreur gérée dans le hook
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={isLoading}
      className={cn(
        isFavorited && "text-yellow-500 hover:text-yellow-600",
        className
      )}
      title={isFavorited ? "Retirer des favoris" : "Ajouter aux favoris"}
    >
      <Star
        className={cn(
          "h-4 w-4",
          isFavorited && "fill-current"
        )}
      />
    </Button>
  )
}
