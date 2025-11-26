import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Calendar } from "lucide-react"
import type { PartnerDetailDto } from "../api/partners.types"

interface PartnerProfileProps {
  partner: PartnerDetailDto
}

export function PartnerProfile({ partner }: PartnerProfileProps) {
  const initials = partner.artistName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
        <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
          <AvatarImage src={partner.avatarUrl || undefined} alt={partner.artistName} />
          <AvatarFallback className="text-4xl font-bold">{initials}</AvatarFallback>
        </Avatar>
        
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {partner.artistName}
              </h1>
              <Badge variant="secondary" className="h-fit">Partenaire</Badge>
            </div>

            {partner.joinedAt && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Membre depuis {format(new Date(partner.joinedAt), "MMMM yyyy", { locale: fr })}</span>
              </div>
            )}
          </div>

          <p className="max-w-2xl text-muted-foreground">
            {partner.bio || "Aucune biographie disponible pour cet artiste."}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-4">
        <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
          <div className="text-2xl font-bold">{partner.trackCount}</div>
          <div className="text-xs text-muted-foreground">Tracks publiées</div>
        </div>
      </div>
    </div>
  )
}
