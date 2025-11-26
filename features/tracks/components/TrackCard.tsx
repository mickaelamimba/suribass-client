import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import { Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { TrackDto } from "../api/tracks.types"
import { TrackStats } from "./TrackStats"

interface TrackCardProps {
  track: TrackDto
  onClick?: () => void
}

export function TrackCard({ track, onClick }: TrackCardProps) {
  const isFeatured = (track.score || 0) > 80
  const platformNames = ['SoundCloud', 'YouTube', 'Spotify']
  const platformName = platformNames[track.platform] || 'Unknown'

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
            {platformName}
          </Badge>
          {isFeatured && (
            <Badge variant="default" className="bg-primary text-primary-foreground">
              Featured
            </Badge>
          )}
        </div>

        <div className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
          {track.duration}
        </div>
      </div>

      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/tracks/${track.id}`} className="line-clamp-1 font-semibold hover:underline">
            {track.title}
          </Link>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{track.artistName}</span>
          <span>•</span>
          <span>
            {formatDistanceToNow(new Date(track.createdAt), { addSuffix: true, locale: fr })}
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-2">
        {track.categoryName && (
          <div className="mb-3">
            <Badge variant="outline" className="text-xs">
              {track.categoryName}
            </Badge>
          </div>
        )}
        <TrackStats 
          stats={{ viewCount: track.viewCount, likeCount: track.likeCount }} 
          score={track.score} 
        />
      </CardContent>
    </Card>
  )
}
