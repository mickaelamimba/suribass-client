"use client"

import { cn } from "@/lib/utils"
import { FavoriteButton } from "./FavoriteButton"
import { LikeButton } from "./LikeButton"
import { ShareButton } from "./ShareButton"

interface EngagementBarProps {
  trackId?: string
  mixtapeId?: string
  initialLiked?: boolean
  initialFavorited?: boolean
  likeCount?: number
  title?: string
  className?: string
  buttonVariant?: "outline" | "ghost" | "default"
}

export function EngagementBar({
  trackId,
  mixtapeId,
  initialLiked = false,
  initialFavorited = false,
  likeCount = 0,
  title,
  className,
  buttonVariant = "outline",
}: EngagementBarProps) {
  return (
    <div className={cn("flex gap-2", className)}>
      <LikeButton
        trackId={trackId}
        mixtapeId={mixtapeId}
        initialLiked={initialLiked}
        initialCount={likeCount}
        variant={buttonVariant}
      />
      <FavoriteButton
        trackId={trackId}
        mixtapeId={mixtapeId}
        initialFavorited={initialFavorited}
        variant={buttonVariant}
      />
      <ShareButton
        trackId={trackId}
        mixtapeId={mixtapeId}
        title={title}
        variant={buttonVariant}
      />
    </div>
  )
}
