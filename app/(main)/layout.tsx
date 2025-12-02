"use client"

import { AppSidebar } from "@/components/layout/AppSidebar"
import { usePathname } from "next/navigation"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  // Masquer la sidebar principale sur le dashboard partenaire (qui a sa propre sidebar)
  const isPartnerDashboard = pathname?.startsWith("/partners/dashboard")
  
  if (isPartnerDashboard) {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar className="hidden md:flex" />
      <main className="flex-1 overflow-y-auto bg-background p-6">
        {children}
      </main>
    </div>
  )
}
