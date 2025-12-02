"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ADMIN_ROUTES,
  PARTNER_ROUTES,
  PROTECTED_ROUTES,
  PUBLIC_ROUTES,
  type RouteConfig,
} from "@/lib/routes.config"
import {
  Globe,
  Lock,
  Shield,
  ShieldCheck,
  Users,
} from "lucide-react"

interface RouteTableProps {
  routes: RouteConfig[]
  icon: React.ReactNode
  title: string
  description: string
  badgeVariant?: "default" | "secondary" | "destructive" | "outline"
}

function RouteTable({ routes, icon, title, description, badgeVariant = "default" }: RouteTableProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            {icon}
          </div>
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription className="text-xs">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ScrollArea className="h-[200px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Chemin</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Rôles</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {routes.map((route) => (
                <TableRow key={route.path}>
                  <TableCell className="font-mono text-sm">
                    {route.path}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {route.description || "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    {route.isPublic ? (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Public
                      </Badge>
                    ) : route.roles && route.roles.length > 0 ? (
                      <div className="flex justify-end gap-1">
                        {route.roles.map((role) => (
                          <Badge key={role} variant={badgeVariant}>
                            {role}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <Badge variant="secondary">Authentifié</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export function RoutesConfigSection() {
  const totalRoutes = PUBLIC_ROUTES.length + PROTECTED_ROUTES.length + PARTNER_ROUTES.length + ADMIN_ROUTES.length

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Configuration des routes</CardTitle>
                <CardDescription>
                  Gestion des accès et permissions par route
                </CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="text-lg px-3 py-1">
              {totalRoutes} routes
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <Globe className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{PUBLIC_ROUTES.length}</p>
                <p className="text-xs text-muted-foreground">Routes publiques</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <Lock className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{PROTECTED_ROUTES.length}</p>
                <p className="text-xs text-muted-foreground">Routes protégées</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <Users className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{PARTNER_ROUTES.length}</p>
                <p className="text-xs text-muted-foreground">Routes partenaires</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <ShieldCheck className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-2xl font-bold">{ADMIN_ROUTES.length}</p>
                <p className="text-xs text-muted-foreground">Routes admin</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Tableaux des routes */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RouteTable
          routes={PUBLIC_ROUTES}
          icon={<Globe className="h-4 w-4 text-green-500" />}
          title="Routes publiques"
          description="Accessibles sans authentification"
          badgeVariant="outline"
        />

        <RouteTable
          routes={PROTECTED_ROUTES}
          icon={<Lock className="h-4 w-4 text-blue-500" />}
          title="Routes protégées"
          description="Nécessitent une authentification"
          badgeVariant="secondary"
        />

        <RouteTable
          routes={PARTNER_ROUTES}
          icon={<Users className="h-4 w-4 text-purple-500" />}
          title="Routes partenaires"
          description="Réservées aux partenaires et admins"
          badgeVariant="default"
        />

        <RouteTable
          routes={ADMIN_ROUTES}
          icon={<ShieldCheck className="h-4 w-4 text-red-500" />}
          title="Routes administration"
          description="Réservées aux administrateurs"
          badgeVariant="destructive"
        />
      </div>

      {/* Note d'information */}
      <Card className="border-dashed">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
              <Shield className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Configuration des routes</p>
              <p className="text-sm text-muted-foreground">
                Les routes sont configurées dans le fichier <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">lib/routes.config.ts</code>. 
                Pour modifier les permissions, éditez ce fichier puis redémarrez le serveur.
              </p>
              <p className="text-sm text-muted-foreground">
                La vérification des rôles est effectuée côté client par le composant <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">AuthGuard</code>.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
