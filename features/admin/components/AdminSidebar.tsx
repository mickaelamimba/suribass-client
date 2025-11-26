"use client"

import { ThemeToggle } from "@/components/layout/ThemeToggle"
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
import { cn } from "@/lib/utils"
import {
    ChevronDown,
    LayoutDashboard,
    LogOut,
    MessageSquare,
    Settings,
    ShieldAlert,
    User,
    Users
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  exact?: boolean
  badge?: string
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    title: "Modération",
    href: "/admin/moderation",
    icon: MessageSquare,
    badge: "12",
  },
  {
    title: "Sécurité",
    href: "/admin/security",
    icon: ShieldAlert,
  },
  {
    title: "Utilisateurs",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Paramètres",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <div className="flex h-full w-64 flex-col border-r bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-destructive to-destructive/60 shadow-lg">
            <ShieldAlert className="h-5 w-5 text-destructive-foreground" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-bold tracking-tight">Admin Panel</h2>
            <span className="text-xs text-muted-foreground">Gestion système</span>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href)

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
                <Icon className={cn(
                  "h-4 w-4 transition-all duration-200",
                  isActive ? "scale-110" : "group-hover:scale-110"
                )} />
                <span className="flex-1">{item.title}</span>
                {item.badge && (
                  <Badge variant="destructive" className="h-5 px-2 text-xs font-semibold">
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
                <Avatar className="h-10 w-10 border-2 border-destructive/20 transition-all group-hover:border-destructive/40">
                  <AvatarImage src={user.partner?.avatarUrl || undefined} />
                  <AvatarFallback className="bg-gradient-to-br from-destructive to-destructive/60 text-destructive-foreground">
                    {user.username[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-col items-start">
                  <span className="text-sm font-medium">{user.username}</span>
                  <Badge variant="destructive" className="mt-0.5 h-4 px-1.5 text-xs">
                    {user.role}
                  </Badge>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-y-0.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Administration</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Paramètres système
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => logout()} className="cursor-pointer text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>
    </div>
  )
}
