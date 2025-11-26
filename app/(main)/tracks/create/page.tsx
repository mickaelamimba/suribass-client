import { CreateTrackClient } from "@/features/tracks/components/CreateTrackClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ajouter une Track | SuribassMusic",
  description: "Partagez votre musique avec la communauté.",
}

export default function CreateTrackPage() {
  return <CreateTrackClient />
}
