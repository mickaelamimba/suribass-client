import { DashboardProfileClient } from "@/features/partners/components/DashboardProfileClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mon Profil | Dashboard Partenaire",
  description: "Modifiez votre profil artiste.",
}

export default function DashboardProfilePage() {
  return <DashboardProfileClient />
}
