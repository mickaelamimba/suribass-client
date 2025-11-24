import { MixtapeDetailClient } from "@/features/mixtapes/components/MixtapeDetailClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Détail Mixtape | SuribassMusic",
  description: "Écoutez cette mixtape exclusive sur SuribassMusic.",
}

interface MixtapePageProps {
  params: Promise<{ id: string }>
}

export default async function MixtapePage({ params }: MixtapePageProps) {
  const { id } = await params
  return (
    <div className="container py-8">
      <MixtapeDetailClient id={id} />
    </div>
  )
}
