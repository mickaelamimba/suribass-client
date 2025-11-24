import { Disc3, Eye, Heart, MessageSquare, Music, TrendingUp, Users } from "lucide-react"
import type { GlobalStatsDto } from "../api/admin.types"
import { StatsCard } from "./StatsCard"

interface GlobalStatsGridProps {
  stats: GlobalStatsDto
}

export function GlobalStatsGrid({ stats }: GlobalStatsGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Utilisateurs Total"
        value={stats?.totalUsers}
        icon={Users}
        trend={{
          value: stats.newUsersLast30Days,
          isPositive: true,
        }}
      />
      <StatsCard
        title="Partenaires"
        value={stats?.totalPartners}
        icon={TrendingUp}
      />
      <StatsCard
        title="Tracks"
        value={stats?.totalTracks}
        icon={Music}
        trend={{
          value: stats?.newTracksLast30Days,
          isPositive: true,
        }}
      />
      <StatsCard
        title="Mixtapes"
        value={stats.totalMixtapes}
        icon={Disc3}
      />
      <StatsCard
        title="Commentaires"
        value={stats.totalComments}
        icon={MessageSquare}
      />
      <StatsCard
        title="Vues Totales"
        value={stats.totalViews?.toLocaleString()}
        icon={Eye}
      />
      <StatsCard
        title="Likes Totaux"
        value={stats.totalLikes?.toLocaleString()}
        icon={Heart}
      />
    </div>
  )
}
