import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BarChart2, Heart, MessageCircle, Play, Share2 } from "lucide-react"

interface MixtapeStatsProps {
  platformStats: {
    viewCount: number
    likeCount: number
    commentCount: number
    repostCount: number
  }
  siteStats: {
    viewCount: number
    likeCount: number
    commentCount: number
    shareCount: number
  }
  score?: {
    value: number
    recommendationMessage: string | null
  } | null
}

export function MixtapeStats({ platformStats, siteStats, score }: MixtapeStatsProps) {
  const StatItem = ({ icon: Icon, label, value, subValue }: any) => (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      <Icon className="mb-2 h-5 w-5 text-muted-foreground" />
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
      {subValue && <div className="text-[10px] text-muted-foreground/60">({subValue})</div>}
    </div>
  )

  return (
    <Card>
      <CardContent className="p-0">
        <div className="grid grid-cols-2 divide-x divide-y sm:grid-cols-4 sm:divide-y-0">
          <StatItem
            icon={Play}
            label="Écoutes"
            value={platformStats.viewCount + siteStats.viewCount}
            subValue={`SC: ${platformStats.viewCount}`}
          />
          <StatItem
            icon={Heart}
            label="Likes"
            value={platformStats.likeCount + siteStats.likeCount}
            subValue={`SC: ${platformStats.likeCount}`}
          />
          <StatItem
            icon={MessageCircle}
            label="Commentaires"
            value={platformStats.commentCount + siteStats.commentCount}
            subValue={`SC: ${platformStats.commentCount}`}
          />
          <StatItem
            icon={Share2}
            label="Partages"
            value={platformStats.repostCount + siteStats.shareCount}
            subValue={`SC: ${platformStats.repostCount}`}
          />
        </div>
        
        {score && (
          <>
            <Separator />
            <div className="flex items-center justify-between bg-muted/50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <BarChart2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">Score IA</div>
                  <div className="text-xs text-muted-foreground">Analyse de performance</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{score.value}/100</div>
                {score.recommendationMessage && (
                  <div className="text-xs text-muted-foreground">{score.recommendationMessage}</div>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
