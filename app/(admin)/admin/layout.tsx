"use client"

import { AdminSidebar } from "@/features/admin/components/AdminSidebar"
import { AuthGuard } from "@/features/auth/components/AuthGuard"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard roles={["Admin"]}>
      <div className="flex h-screen w-full overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto bg-background p-8">
          {children}
        </main>
      </div>
    </AuthGuard>
  )
}
