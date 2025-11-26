"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/features/auth"
import type { UserRole } from "@/features/auth/api/auth.types"
import { cn } from "@/lib/utils"
import {
    BarChart3,
    ChevronDown,
    Disc,
    Home,
    LayoutDashboard,
    Library,
    LogOut,
    Music2,
    Settings,
    Sparkles,
    User,
    Users
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./ThemeToggle"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  roles?: UserRole[]
  variant?: "default" | "ghost"
  badge?: string
  isNew?: boolean
}

export function AppSidebar({ className }: { className?: string }) {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const mainNav: NavItem[] = [
    {
      title: "Accueil",
      href: "/home",
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
      isNew: true,
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
    <div className={cn("flex h-screen w-64 flex-col border-r bg-gradient-to-b from-background to-muted/20", className)}>
      {/* Logo Section */}
      <div className="p-6">
        <Link href="/" className="group flex items-center gap-3 transition-all hover:scale-105">
          <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 shadow-lg transition-shadow group-hover:shadow-xl">
            <div className="absolute inset-0 flex items-center justify-center">
              <Music2 className="h-5 w-5 text-primary-foreground" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl tracking-tight">Suribass</span>
            <span className="text-xs text-muted-foreground">Music Platform</span>
          </div>
        </Link>
      </div>

      <ScrollArea className="flex-1 px-3">
        <div className="space-y-6 py-4">
          {/* Main Navigation */}
          <div>
            <h2 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Découvrir
            </h2>
            <div className="space-y-1">
              {filterNav(mainNav).map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-primary/10 text-primary shadow-sm"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <item.icon className={cn(
                      "h-4 w-4 transition-all duration-200",
                      isActive ? "scale-110" : "group-hover:scale-110"
                    )} />
                    <span className="flex-1">{item.title}</span>
                    {item.isNew && (
                      <Badge variant="secondary" className="h-5 px-1.5 text-xs font-semibold">
                        <Sparkles className="mr-0.5 h-2.5 w-2.5" />
                        Nouveau
                      </Badge>
                    )}
                    {item.badge && (
                      <Badge variant="secondary" className="h-5 px-2 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    {isActive && (
                      <div className="absolute left-0 h-8 w-1 rounded-r-full bg-primary" />
                    )}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Partner Section */}
          {(user?.role === "Partner" || user?.role === "Admin") && (
            <>
              <Separator className="my-2" />
              <div>
                <h2 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Espace Partenaire
                </h2>
                <div className="space-y-1">
                  {filterNav(partnerNav).map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                          isActive
                            ? "bg-primary/10 text-primary shadow-sm"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        <item.icon className={cn(
                          "h-4 w-4 transition-all duration-200",
                          isActive ? "scale-110" : "group-hover:scale-110"
                        )} />
                        <span className="flex-1">{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="h-5 px-2 text-xs">
                            {item.badge}
                          </Badge>
                        )}
                        {isActive && (
                          <div className="absolute left-0 h-8 w-1 rounded-r-full bg-primary" />
                        )}
                      </Link>
                    )
                  })}
                </div>
              </div>
            </>
          )}

          {/* Admin Section */}
          {user?.role === "Admin" && (
            <>
              <Separator className="my-2" />
              <div>
                <h2 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Administration
                </h2>
                <div className="space-y-1">
                  {filterNav(adminNav).map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                          isActive
                            ? "bg-primary/10 text-primary shadow-sm"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        <item.icon className={cn(
                          "h-4 w-4 transition-all duration-200",
                          isActive ? "scale-110" : "group-hover:scale-110"
                        )} />
                        <span className="flex-1">{item.title}</span>
                        {item.badge && (
                          <Badge variant="destructive" className="h-5 px-2 text-xs">
                            {item.badge}
                          </Badge>
                        )}
                        {isActive && (
                          <div className="absolute left-0 h-8 w-1 rounded-r-full bg-primary" />
                        )}
                      </Link>
                    )
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </ScrollArea>

      <Separator />

      {/* User Section */}
      <div className="space-y-2 p-4">
        <div className="flex items-center justify-between px-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Apparence
          </span>
          <ThemeToggle />
        </div>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="group flex w-full items-center gap-3 rounded-lg p-2 transition-colors hover:bg-accent">
                <Avatar className="h-10 w-10 border-2 border-primary/20 transition-all group-hover:border-primary/40">
                  <AvatarImage src={user.partner?.avatarUrl || undefined} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-primary-foreground">
                    {user.username[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-col items-start">
                  <span className="text-sm font-medium">{user.username}</span>
                  <span className="text-xs text-muted-foreground">{user.role}</span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-y-0.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Paramètres
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => logout()} className="cursor-pointer text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex flex-col gap-2">
            <Button asChild className="shadow-sm">
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
