"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/features/auth"
import { cn } from "@/lib/utils"
import { Heart } from "lucide-react"
import { useState } from "react"
import { useLike } from "../hooks/useLike"

interface LikeButtonProps {
  trackId?: string
  mixtapeId?: string
  initialLiked?: boolean
  initialCount?: number
  showCount?: boolean
  size?: "sm" | "default" | "lg" | "icon"
  variant?: "outline" | "ghost" | "default"
  className?: string
}

export function LikeButton({
  trackId,
  mixtapeId,
  initialLiked = false,
  initialCount = 0,
  showCount = true,
  size = "icon",
  variant = "outline",
  className,
}: LikeButtonProps) {
  const { isAuthenticated } = useAuth()
  const { toggleLike, isLoading } = useLike()
  const [isLiked, setIsLiked] = useState(initialLiked)
  const [count, setCount] = useState(initialCount)

  const handleClick = async () => {
    if (!isAuthenticated) {
      // TODO: Afficher un toast ou rediriger vers login
      return
    }

    try {
      const result = await toggleLike({ trackId, mixtapeId })
      if (result) {
        setIsLiked(result.isLiked)
        setCount((prev) => (result.isLiked ? prev + 1 : prev - 1))
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
        isLiked && "text-red-500 hover:text-red-600",
        className
      )}
      title={isLiked ? "Retirer le like" : "Ajouter un like"}
    >
      <Heart
        className={cn(
          "h-4 w-4",
          isLiked && "fill-current",
          size !== "icon" && "mr-2"
        )}
      />
      {showCount && size !== "icon" && <span>{count}</span>}
    </Button>
  )
}
