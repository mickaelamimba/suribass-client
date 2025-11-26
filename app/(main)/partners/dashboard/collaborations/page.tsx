import { DashboardCollaborationsClient } from "@/features/partners/components/DashboardCollaborationsClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Collaborations | Dashboard Partenaire",
  description: "Gérez vos collaborations.",
}

export default function DashboardCollaborationsPage() {
  return <DashboardCollaborationsClient />
}
