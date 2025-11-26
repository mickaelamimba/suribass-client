import { PartnerDashboardClient } from "@/features/partners/components/PartnerDashboardClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard Partenaire | SuribassMusic",
  description: "Gérez votre activité et suivez vos performances.",
}

export default function DashboardPage() {
  return <PartnerDashboardClient />
}
