"use client"

import { AuthGuard } from "@/features/auth/components/AuthGuard"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const tabs = [
    { name: "Dashboard", href: "/admin" },
    { name: "Modération", href: "/admin/moderation" },
  ]

  return (
    <AuthGuard roles={["Admin"]}>
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Administration</h1>
          <p className="text-muted-foreground">
            Gérez votre plateforme SuribassMusic
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-8 border-b">
          <nav className="flex gap-6">
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "border-b-2 pb-3 text-sm font-medium transition-colors hover:text-primary",
                  pathname === tab.href
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground"
                )}
              >
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Content */}
        {children}
      </div>
    </AuthGuard>
  )
}
