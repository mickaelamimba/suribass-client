"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/features/auth"
import type { UserRole } from "@/features/auth/api/auth.types"
import { cn } from "@/lib/utils"
import {
    BarChart3,
    Disc,
    Home,
    LayoutDashboard,
    Library,
    LogOut,
    Music2,
    Settings,
    Users
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  roles?: UserRole[]
  variant?: "default" | "ghost"
}

export function AppSidebar({ className }: { className?: string }) {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const mainNav: NavItem[] = [
    {
      title: "Accueil",
      href: "/",
      icon: Home,
    },
    {
      title: "Tracks",
      href: "/tracks",
      icon: Music2,
    },
    {
      title: "Mixtapes",
      href: "/mixtapes",
      icon: Disc,
    },
    {
      title: "Catégories",
      href: "/categories",
      icon: Library,
    },
    {
      title: "Partenaires",
      href: "/partners",
      icon: Users,
    },
  ]

  const partnerNav: NavItem[] = [
    {
      title: "Tableau de bord",
      href: "/dashboard",
      icon: LayoutDashboard,
      roles: ["Partner", "Admin"],
    },
    {
      title: "Mes Tracks",
      href: "/dashboard/tracks",
      icon: Music2,
      roles: ["Partner", "Admin"],
    },
    {
      title: "Statistiques",
      href: "/dashboard/stats",
      icon: BarChart3,
      roles: ["Partner", "Admin"],
    },
  ]

  const adminNav: NavItem[] = [
    {
      title: "Administration",
      href: "/admin",
      icon: Settings,
      roles: ["Admin"],
    },
    {
      title: "Utilisateurs",
      href: "/admin/users",
      icon: Users,
      roles: ["Admin"],
    },
  ]

  const filterNav = (items: NavItem[]) => {
    return items.filter((item) => {
      if (!item.roles) return true
      if (!user) return false
      return item.roles.includes(user.role)
    })
  }

  return (
    <div className={cn("flex h-screen w-64 flex-col border-r bg-background", className)}>
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="h-8 w-8 rounded-full bg-primary" />
          <span>Suribass</span>
        </Link>
      </div>
      
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Découvrir
            </h2>
            <div className="space-y-1">
              {filterNav(mainNav).map((item) => (
                <Button
                  key={item.href}
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {(user?.role === "Partner" || user?.role === "Admin") && (
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Espace Partenaire
              </h2>
              <div className="space-y-1">
                {filterNav(partnerNav).map((item) => (
                  <Button
                    key={item.href}
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {user?.role === "Admin" && (
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Administration
              </h2>
              <div className="space-y-1">
                {filterNav(adminNav).map((item) => (
                  <Button
                    key={item.href}
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <Separator />
      
      <div className="p-4">
        {user ? (
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={user.partner?.avatarUrl || undefined} />
              <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user.username}</span>
              <span className="text-xs text-muted-foreground">{user.role}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => logout()} className="ml-auto">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Button asChild>
              <Link href="/login">Se connecter</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/register">S'inscrire</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
