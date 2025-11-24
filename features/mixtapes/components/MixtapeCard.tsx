import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import { Heart, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { MixtapeDto } from "../api/mixtapes.types"

interface MixtapeCardProps {
  mixtape: MixtapeDto
  onClick?: () => void
}

export function MixtapeCard({ mixtape, onClick }: MixtapeCardProps) {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg">
      {/* Thumbnail Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        <Image
          src={mixtape.thumbnailUrl || "/images/placeholder-mixtape.jpg"}
          alt={mixtape.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Overlay Play Button */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            size="icon"
            className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-xl hover:bg-primary/90 hover:scale-105 transition-transform"
            onClick={(e) => {
              e.preventDefault() // Prevent Link navigation if wrapped
              onClick?.()
            }}
          >
            <Play className="h-6 w-6 fill-current ml-1" />
          </Button>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-xs font-medium text-white">
          {formatDuration(mixtape.duration)}
        </div>

        {/* Score Badge (if high) */}
        {mixtape.score && mixtape.score.value >= 80 && (
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="bg-yellow-500/90 text-white hover:bg-yellow-500">
              ★ {mixtape.score.value}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center justify-between">
          <Badge variant="outline" className="text-xs font-normal">
            {mixtape.categoryName}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(mixtape.createdAt), { addSuffix: true, locale: fr })}
          </span>
        </div>

        <Link href={`/mixtapes/${mixtape.id}`} className="group-hover:underline">
          <h3 className="line-clamp-1 text-lg font-semibold tracking-tight">
            {mixtape.title}
          </h3>
        </Link>
        
        {/* Stats Row */}
        <div className="mt-auto flex items-center justify-between pt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Play className="h-3 w-3" />
              <span>{mixtape.platformStats.viewCount + mixtape.siteStats.viewCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              <span>{mixtape.platformStats.likeCount + mixtape.siteStats.likeCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
