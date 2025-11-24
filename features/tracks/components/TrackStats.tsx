import { cn } from "@/lib/utils"
import { Eye, Heart, MessageSquare, Share2, Sparkles } from "lucide-react"

interface TrackStatsProps {
  stats: {
    viewCount: number
    likeCount: number
    commentCount: number
    shareCount: number
  }
  score?: {
    value: number
    recommendationMessage: string | null
  } | null
  className?: string
}

export function TrackStats({ stats, score, className }: TrackStatsProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-4 text-sm text-muted-foreground", className)}>
      <div className="flex items-center gap-1">
        <Eye className="h-4 w-4" />
        <span>{stats.viewCount.toLocaleString()}</span>
      </div>
      <div className="flex items-center gap-1">
        <Heart className="h-4 w-4" />
        <span>{stats.likeCount.toLocaleString()}</span>
      </div>
      <div className="flex items-center gap-1">
        <MessageSquare className="h-4 w-4" />
        <span>{stats.commentCount.toLocaleString()}</span>
      </div>
      <div className="flex items-center gap-1">
        <Share2 className="h-4 w-4" />
        <span>{stats.shareCount.toLocaleString()}</span>
      </div>
      
      {score && (
        <div className="flex items-center gap-1 text-primary font-medium">
          <Sparkles className="h-4 w-4" />
          <span>{score.value}/100</span>
        </div>
      )}
    </div>
  )
}
