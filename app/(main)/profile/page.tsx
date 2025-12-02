import { ProfilePageClient } from "@/features/profile"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mon Profil | SuribassMusic",
  description: "Gérez vos informations personnelles sur SuribassMusic.",
}

export default function ProfilePage() {
  return <ProfilePageClient />
}
