import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CategoryBadge } from "@/features/categories/components/CategoryBadge"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import { Heart, Play, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { TrackDto } from "../api/tracks.types"
import { TrackStats } from "./TrackStats"

interface TrackCardProps {
  track: TrackDto
  onClick?: () => void
}

export function TrackCard({ track, onClick }: TrackCardProps) {
  const isFeatured = (track.score?.value || 0) > 80

  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={track.thumbnailUrl}
          alt={track.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            size="icon"
            className="h-12 w-12 rounded-full"
            onClick={(e) => {
              e.stopPropagation()
              onClick?.()
            }}
          >
            <Play className="h-6 w-6 ml-1" />
          </Button>
        </div>

        <div className="absolute left-2 top-2 flex gap-2">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
            {track.platform}
          </Badge>
          {isFeatured && (
            <Badge variant="default" className="bg-primary text-primary-foreground">
              Featured
            </Badge>
          )}
        </div>

        <div className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
          {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
        </div>
      </div>

      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/tracks/${track.id}`} className="line-clamp-1 font-semibold hover:underline">
            {track.title}
          </Link>
          <div className="flex gap-1">
            {track.isLikedByCurrentUser && <Heart className="h-4 w-4 fill-primary text-primary" />}
            {track.isFavoritedByCurrentUser && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href={`/partners/${track.partnerId}`} className="flex items-center gap-2 hover:text-foreground">
            <Avatar className="h-5 w-5">
              <AvatarImage src={track.partnerAvatarUrl || undefined} />
              <AvatarFallback>{track.partnerName[0]}</AvatarFallback>
            </Avatar>
            <span>{track.partnerName}</span>
          </Link>
          <span>•</span>
          <span>
            {track.publishedAt
              ? formatDistanceToNow(new Date(track.publishedAt), { addSuffix: true, locale: fr })
              : "Récemment"}
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-2">
        <div className="mb-3">
          <CategoryBadge
            category={{
              id: track.categoryId,
              name: track.categoryName,
              slug: track.categorySlug,
              description: null,
              trackCount: 0,
              mixtapeCount: 0
            }}
            variant="outline"
            className="text-xs"
          />
        </div>
        <TrackStats stats={track.stats} score={track.score} />
      </CardContent>
    </Card>
  )
}
