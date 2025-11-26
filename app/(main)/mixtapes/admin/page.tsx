import { AuthGuard } from "@/features/auth/components/AuthGuard"
import { MixtapesAdminClient } from "@/features/mixtapes/components/MixtapesAdminClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Administration Mixtapes | SuribassMusic",
  description: "Gérez les mixtapes et la synchronisation SoundCloud.",
}

export default function MixtapesAdminPage() {
  return (
    <AuthGuard roles={["Admin"]}>
      <div className="container py-8">
        <MixtapesAdminClient />
      </div>
    </AuthGuard>
  )
}
