import { PartnersListClient } from "@/features/partners/components/PartnersListClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Partenaires | SuribassMusic",
  description: "Découvrez nos artistes partenaires et leurs créations exclusives.",
}

export default function PartnersPage() {
  return <PartnersListClient />
}
