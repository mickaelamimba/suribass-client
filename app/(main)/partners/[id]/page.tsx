import { PartnerDetailClient } from "@/features/partners/components/PartnerDetailClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Profil Partenaire | SuribassMusic",
  description: "Découvrez le profil de cet artiste partenaire.",
}

interface PartnerDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function PartnerDetailPage({ params }: PartnerDetailPageProps) {
  const { id } = await params
  return <PartnerDetailClient id={id} />
}
