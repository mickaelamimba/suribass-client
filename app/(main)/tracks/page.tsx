import { TracksListClient } from "@/features/tracks/components/TracksListClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tracks | SuribassMusic",
  description: "Découvrez les dernières sorties de nos partenaires.",
}

export default function TracksPage() {
  return <TracksListClient />
}
