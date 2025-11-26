import { Alert, AlertDescription } from "@/components/ui/alert"
import type { PartnerDto } from "../api/partners.types"
import { PartnerCard } from "./PartnerCard"
import { PartnerSkeleton } from "./PartnerSkeleton"

interface PartnerGridProps {
  partners?: PartnerDto[]
  isLoading?: boolean
}

export function PartnerGrid({ partners, isLoading }: PartnerGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <PartnerSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (!partners || partners.length === 0) {
    return (
      <Alert>
        <AlertDescription>
          Aucun partenaire trouvé.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {partners.map((partner) => (
        <PartnerCard key={partner.id} partner={partner} />
      ))}
    </div>
  )
}
