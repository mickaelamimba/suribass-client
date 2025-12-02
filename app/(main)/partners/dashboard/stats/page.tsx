import { PartnerStatsClient } from "@/features/partners/components/PartnerStatsClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Statistiques | Dashboard Partenaire",
  description: "Consultez vos statistiques et performances.",
}

export default function DashboardStatsPage() {
  return <PartnerStatsClient />
}
