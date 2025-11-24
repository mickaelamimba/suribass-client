import { MixtapesListClient } from "@/features/mixtapes/components/MixtapesListClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mixtapes | SuribassMusic",
  description: "Découvrez les meilleures mixtapes Hip-Hop, R&B et Afrobeat sélectionnées par Suribass.",
}

export default function MixtapesPage() {
  return (
    <div className="container py-8">
      <MixtapesListClient />
    </div>
  )
}
