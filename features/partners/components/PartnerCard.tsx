import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Music } from "lucide-react"
import Link from "next/link"
import type { PartnerDto } from "../api/partners.types"

interface PartnerCardProps {
  partner: PartnerDto
}

export function PartnerCard({ partner }: PartnerCardProps) {
  const initials = partner.artistName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center gap-4 p-6">
        <Avatar className="h-16 w-16 border-2 border-primary/10">
          <AvatarImage src={partner.avatarUrl || undefined} alt={partner.artistName} />
          <AvatarFallback className="text-lg font-bold">{initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1 overflow-hidden">
          <h3 className="truncate text-lg font-semibold leading-none tracking-tight">
            {partner.artistName}
          </h3>
          <p className="line-clamp-2 text-xs text-muted-foreground">
            {partner.bio || "Aucune bio disponible"}
          </p>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 pt-0">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Music className="h-4 w-4" />
          <span>{partner.trackCount} tracks</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full" variant="secondary">
          <Link href={`/partners/${partner.id}`}>Voir le profil</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
