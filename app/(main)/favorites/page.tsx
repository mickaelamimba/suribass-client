import { FavoritesListClient } from "@/features/users"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mes favoris | SuribassMusic",
  description: "Retrouvez tous vos contenus favoris.",
}

export default function FavoritesPage() {
  return <FavoritesListClient />
}
