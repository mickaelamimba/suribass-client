import { RegisterPartnerClient } from "@/features/partners/components/RegisterPartnerClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Devenir Partenaire | SuribassMusic",
  description: "Rejoignez la communauté SuribassMusic en tant qu'artiste partenaire.",
}

export default function RegisterPartnerPage() {
  return <RegisterPartnerClient />
}
