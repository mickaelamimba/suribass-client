"use client"

import { cn } from "@/lib/utils"
import { Activity, Ban, Shield } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const tabs = [
  {
    title: "Vue d'ensemble",
    href: "/admin/security",
    icon: Shield,
  },
  {
    title: "Journal des événements",
    href: "/admin/security/events",
    icon: Activity,
  },
  {
    title: "IPs Bloquées",
    href: "/admin/security/blocked-ips",
    icon: Ban,
  },
]

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Sécurité</h1>
        <p className="text-muted-foreground">
          Surveillance et gestion de la sécurité de la plateforme.
        </p>
      </div>

      <div className="flex border-b">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href
          const Icon = tab.icon
          
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex items-center gap-2 border-b-2 px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {tab.title}
            </Link>
          )
        })}
      </div>

      {children}
    </div>
  )
}
