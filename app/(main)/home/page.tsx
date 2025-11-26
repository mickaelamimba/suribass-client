import { HomeClient } from "@/features/home/components"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Accueil - SuribassMusic",
  description:
    "Découvrez les meilleurs tracks et mixtapes Afrobeat, R&B, Dancehall et plus. Plateforme de streaming musical avec contenu exclusif sélectionné par nos experts.",
}

export default function HomePage() {
  return <HomeClient />
}
