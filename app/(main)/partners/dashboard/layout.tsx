import { AuthGuard } from "@/features/auth/components/AuthGuard"
import { PartnerDashboardSidebar } from "@/features/partners/components/PartnerDashboardSidebar"

export default function PartnerDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard roles={["Partner", "Admin"]}>
      <div className="flex min-h-screen flex-col md:flex-row">
        <PartnerDashboardSidebar />
        <main className="flex-1 overflow-y-auto bg-muted/10 p-8">
          <div className="mx-auto max-w-5xl">
            {children}
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
