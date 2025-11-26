import { CategoriesListClient } from "@/features/categories/components/CategoriesListClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Catégories | SuribassMusic",
  description: "Explorez notre catalogue par genre musical.",
}

export default function CategoriesPage() {
  return <CategoriesListClient />
}
