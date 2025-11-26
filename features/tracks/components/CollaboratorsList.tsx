import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface CollaboratorsListProps {
  collaborators: {
    partnerId: string
    partnerName: string
    partnerAvatarUrl: string | null
    role: string
  }[]
}

export function CollaboratorsList({ collaborators }: CollaboratorsListProps) {
  if (collaborators.length === 0) return null

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Collaborateurs</h3>
      <div className="flex flex-wrap gap-4">
        {collaborators.map((collab) => (
          <Link
            key={collab.partnerId}
            href={`/partners/${collab.partnerId}`}
            className="group flex items-center gap-3 rounded-lg border p-2 transition-colors hover:bg-muted/50"
          >
            <Avatar>
              <AvatarImage src={collab.partnerAvatarUrl || undefined} />
              <AvatarFallback>{collab.partnerName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium group-hover:underline">
                {collab.partnerName}
              </span>
              <Badge variant="secondary" className="w-fit text-xs">
                {collab.role}
              </Badge>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
