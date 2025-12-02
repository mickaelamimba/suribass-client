import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BarChart2, Heart, Play } from "lucide-react"

interface ScoreData {
  score: number
  recommendationMessage: string | null
  calculatedAt: string
}

interface MixtapeStatsProps {
  viewCount: number
  likeCount: number
  score?: ScoreData | number | null
}

export function MixtapeStats({ viewCount, likeCount, score }: MixtapeStatsProps) {
  // Extraire la valeur numérique du score
  const scoreValue = score 
    ? typeof score === 'number' 
      ? score 
      : score.score
    : null
  
  const recommendationMessage = score && typeof score === 'object' 
    ? score.recommendationMessage 
    : null

  const StatItem = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: number }) => (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      <Icon className="mb-2 h-5 w-5 text-muted-foreground" />
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  )

  return (
    <Card>
      <CardContent className="p-0">
        <div className="grid grid-cols-2 divide-x">
          <StatItem
            icon={Play}
            label="Écoutes"
            value={viewCount}
          />
          <StatItem
            icon={Heart}
            label="Likes"
            value={likeCount}
          />
        </div>
        
        {scoreValue !== null && scoreValue !== undefined && (
          <>
            <Separator />
            <div className="flex flex-col gap-2 bg-muted/50 p-4">
              <div className="flex items-center justify-between">
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
                  <div className="text-2xl font-bold text-primary">{scoreValue}/100</div>
                </div>
              </div>
              {recommendationMessage && (
                <p className="text-sm text-muted-foreground italic">
                  {recommendationMessage}
                </p>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
