"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/features/auth"

import {
    ArrowLeft,
    LayoutDashboard,
    LogOut,
    Music,
    User,
    Users,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

export function PartnerDashboardSidebar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  const sidebarItems = [
    {
      title: "Vue d'ensemble",
      href: "/partners/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Mes Tracks",
      href: "/partners/dashboard/tracks",
      icon: Music,
    },
    {
      title: "Collaborations",
      href: "/partners/dashboard/collaborations",
      icon: Users,
    },
    {
      title: "Mon Profil",
      href: "/partners/dashboard/profile",
      icon: User,
    },
  ]

  return (
    <aside className="w-full border-r bg-background md:w-64 md:flex-col">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <ArrowLeft className="h-4 w-4" />
          Retour au site
        </Link>
      </div>
      
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center gap-4 px-2 py-4">
          <div className="flex flex-col">
            <span className="font-semibold">{user?.username}</span>
            <span className="text-xs text-muted-foreground">Espace Partenaire</span>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Button
                key={item.href}
                variant={isActive ? "secondary" : "ghost"}
                className="justify-start gap-2"
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            )
          })}
        </nav>

        <div className="mt-auto border-t pt-4">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-destructive hover:text-destructive"
            onClick={() => {
              logout()
              router.push("/")
            }}
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </div>
    </aside>
  )
}
