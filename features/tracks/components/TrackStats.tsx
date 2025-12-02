import { cn } from "@/lib/utils"
import { Eye, Heart, MessageSquare, Share2, Sparkles } from "lucide-react"

interface ScoreData {
  score: number
  recommendationMessage: string | null
  calculatedAt: string
}

interface TrackStatsProps {
  stats: {
    viewCount: number
    likeCount: number
    commentCount?: number
    shareCount?: number
  }
  score?: ScoreData | number | null
  className?: string
}

export function TrackStats({ stats, score, className }: TrackStatsProps) {
  // Extraire la valeur numérique du score
  const scoreValue = score 
    ? typeof score === 'number' 
      ? score 
      : score.score
    : null

  return (
    <div className={cn("flex flex-wrap items-center gap-4 text-sm text-muted-foreground", className)}>
      <div className="flex items-center gap-1">
        <Eye className="h-4 w-4" />
        <span>{(stats.viewCount || 0).toLocaleString()}</span>
      </div>
      <div className="flex items-center gap-1">
        <Heart className="h-4 w-4" />
        <span>{(stats.likeCount || 0).toLocaleString()}</span>
      </div>
      {stats.commentCount !== undefined && (
        <div className="flex items-center gap-1">
          <MessageSquare className="h-4 w-4" />
          <span>{stats.commentCount.toLocaleString()}</span>
        </div>
      )}
      {stats.shareCount !== undefined && (
        <div className="flex items-center gap-1">
          <Share2 className="h-4 w-4" />
          <span>{stats.shareCount.toLocaleString()}</span>
        </div>
      )}
      
      {scoreValue && (
        <div className="flex items-center gap-1 text-primary font-medium">
          <Sparkles className="h-4 w-4" />
          <span>{scoreValue}/100</span>
        </div>
      )}
    </div>
  )
}
