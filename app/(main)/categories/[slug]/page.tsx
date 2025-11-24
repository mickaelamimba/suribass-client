import { CategoryDetailClient } from "@/features/categories/components/CategoryDetailClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Détail Catégorie | SuribassMusic",
  description: "Découvrez les tracks et mixtapes de cette catégorie.",
}

interface CategoryDetailPageProps {
  params: Promise<{ slug: string }>
}

export default async function CategoryDetailPage({ params }: CategoryDetailPageProps) {
  const { slug } = await params
  return <CategoryDetailClient slug={slug} />
}
