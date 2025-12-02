import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CommentSection } from "@/features/comments/components"
import { EngagementBar } from "@/features/engagement"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Calendar, User } from "lucide-react"
import type { MixtapeDetailDto } from "../api/mixtapes.types"
import { MixtapePlayer } from "./MixtapePlayer"
import { MixtapeStats } from "./MixtapeStats"

interface MixtapeDetailViewProps {
  mixtape: MixtapeDetailDto
}

export function MixtapeDetailView({ mixtape }: MixtapeDetailViewProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Player Section */}
      <MixtapePlayer 
        embedUrl={mixtape.embedUrl} 
        title={mixtape.title}
        thumbnailUrl={mixtape.thumbnailUrl}
      />

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Header */}
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {mixtape.title}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{mixtape.artistName}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Publié le {format(new Date(mixtape.createdAt), "PPP", { locale: fr })}
                    </span>
                  </div>
                  <Badge variant="secondary">{mixtape.categoryName}</Badge>
                </div>
              </div>
              
              <EngagementBar
                mixtapeId={mixtape.id}
                likeCount={mixtape.likeCount}
                title={mixtape.title}
              />
            </div>

            {/* Tags */}
            {mixtape.tags && mixtape.tags.trim().length > 0 && (
              <div className="flex flex-wrap gap-2">
                {mixtape.tags.split(' ').filter(tag => tag.trim()).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    #{tag.trim()}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Description */}
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <h3 className="text-lg font-semibold">À propos</h3>
            <p className="whitespace-pre-wrap text-muted-foreground">
              {mixtape.description || "Aucune description disponible."}
            </p>
          </div>

          <Separator />

          {/* Comments Section Placeholder */}
          <CommentSection mixtapeId={mixtape.id} />
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          <MixtapeStats 
            viewCount={mixtape.viewCount}
            likeCount={mixtape.likeCount}
            score={mixtape.score}
          />
        </div>
      </div>
    </div>
  )
}
