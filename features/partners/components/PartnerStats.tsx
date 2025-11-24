import { Card, CardContent } from "@/components/ui/card"
import { Heart, MessageCircle, Play, Share2, Star } from "lucide-react"

interface PartnerStatsProps {
  stats: {
    totalTracks: number
    totalViews: number
    totalLikes: number
    totalComments: number
    totalShares: number
    averageScore: number | null
  }
}

export function PartnerStats({ stats }: PartnerStatsProps) {
  const StatItem = ({ icon: Icon, label, value, subValue }: any) => (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      <Icon className="mb-2 h-5 w-5 text-muted-foreground" />
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
      {subValue && <div className="text-[10px] text-muted-foreground/60">{subValue}</div>}
    </div>
  )

  return (
    <Card>
      <CardContent className="p-0">
        <div className="grid grid-cols-2 divide-x divide-y sm:grid-cols-5 sm:divide-y-0">
          <StatItem
            icon={Play}
            label="Vues totales"
            value={stats.totalViews}
          />
          <StatItem
            icon={Heart}
            label="Likes"
            value={stats.totalLikes}
          />
          <StatItem
            icon={MessageCircle}
            label="Commentaires"
            value={stats.totalComments}
          />
          <StatItem
            icon={Share2}
            label="Partages"
            value={stats.totalShares}
          />
          <StatItem
            icon={Star}
            label="Score moyen"
            value={stats.averageScore ? `${stats.averageScore}/100` : "-"}
          />
        </div>
      </CardContent>
    </Card>
  )
}
