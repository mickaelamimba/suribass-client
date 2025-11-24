import { AuthGuard } from "@/features/auth/components/AuthGuard"
import { CategoriesAdminClient } from "@/features/categories/components/CategoriesAdminClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gestion des Catégories | Admin",
  description: "Gérez les catégories de la plateforme.",
}

export default function CategoriesAdminPage() {
  return (
    <AuthGuard roles={["Admin"]}>
      <div className="container py-8">
        <CategoriesAdminClient />
      </div>
    </AuthGuard>
  )
}
