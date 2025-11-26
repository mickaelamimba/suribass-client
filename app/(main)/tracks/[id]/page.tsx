import { TrackDetailClient } from "@/features/tracks/components/TrackDetailClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Détail Track | SuribassMusic",
  description: "Écoutez et découvrez cette track.",
}

interface TrackDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function TrackDetailPage({ params }: TrackDetailPageProps) {
  const { id } = await params
  return <TrackDetailClient id={id} />
}
