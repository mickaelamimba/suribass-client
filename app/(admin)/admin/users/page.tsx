import { UsersAdminClient } from "@/features/admin/components/UsersAdminClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gestion des utilisateurs | Admin - SuribassMusic",
  description: "Gérez les utilisateurs de la plateforme SuribassMusic",
}

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Utilisateurs</h1>
        <p className="text-muted-foreground">
          Vue d&apos;ensemble des utilisateurs de la plateforme
        </p>
      </div>

      <UsersAdminClient />
    </div>
  )
}
