import { DashboardTracksClient } from "@/features/partners/components/DashboardTracksClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mes Tracks | Dashboard Partenaire",
  description: "Gérez votre discographie.",
}

export default function DashboardTracksPage() {
  return <DashboardTracksClient />
}
