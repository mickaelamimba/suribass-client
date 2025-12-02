import type { UserRole } from "@/features/auth/api/auth.types"

/**
 * Configuration des routes et permissions de l'application
 */

// Types pour la configuration des routes
export interface RouteConfig {
  path: string
  isPublic: boolean
  roles?: UserRole[]
  redirectTo?: string
  description?: string
}

/**
 * Routes publiques - accessibles sans authentification
 */
export const PUBLIC_ROUTES: RouteConfig[] = [
  { path: "/", isPublic: true, description: "Page d'accueil / redirection" },
  { path: "/login", isPublic: true, description: "Connexion" },
  { path: "/register", isPublic: true, description: "Inscription" },
  { path: "/home", isPublic: true, description: "Page d'accueil publique" },
  { path: "/tracks", isPublic: true, description: "Liste des tracks" },
  { path: "/mixtapes", isPublic: true, description: "Liste des mixtapes" },
  { path: "/categories", isPublic: true, description: "Catégories" },
  { path: "/partners", isPublic: true, description: "Liste des partenaires" },
  { path: "/contact", isPublic: true, description: "Page de contact" },
]

/**
 * Routes protégées - nécessitent une authentification
 */
export const PROTECTED_ROUTES: RouteConfig[] = [
  { 
    path: "/favorites", 
    isPublic: false, 
    description: "Favoris de l'utilisateur" 
  },
  { 
    path: "/profile", 
    isPublic: false, 
    description: "Profil utilisateur" 
  },
]

/**
 * Routes partenaires - nécessitent le rôle Partner ou Admin
 */
export const PARTNER_ROUTES: RouteConfig[] = [
  { 
    path: "/partners/dashboard", 
    isPublic: false, 
    roles: ["Partner", "Admin"],
    description: "Dashboard partenaire" 
  },
  { 
    path: "/tracks/create", 
    isPublic: false, 
    roles: ["Partner", "Admin"],
    description: "Création de track" 
  },
]

/**
 * Routes admin - nécessitent le rôle Admin
 */
export const ADMIN_ROUTES: RouteConfig[] = [
  { 
    path: "/admin", 
    isPublic: false, 
    roles: ["Admin"],
    redirectTo: "/home",
    description: "Dashboard admin" 
  },
  { 
    path: "/admin/moderation", 
    isPublic: false, 
    roles: ["Admin"],
    redirectTo: "/home",
    description: "Modération des commentaires" 
  },
  { 
    path: "/admin/security", 
    isPublic: false, 
    roles: ["Admin"],
    redirectTo: "/home",
    description: "Sécurité" 
  },
  { 
    path: "/admin/users", 
    isPublic: false, 
    roles: ["Admin"],
    redirectTo: "/home",
    description: "Gestion des utilisateurs" 
  },
  { 
    path: "/admin/settings", 
    isPublic: false, 
    roles: ["Admin"],
    redirectTo: "/home",
    description: "Paramètres système" 
  },
]

/**
 * Routes d'authentification - rediriger si déjà connecté
 */
export const AUTH_ROUTES = ["/login", "/register"]

/**
 * Toutes les routes configurées
 */
export const ALL_ROUTES: RouteConfig[] = [
  ...PUBLIC_ROUTES,
  ...PROTECTED_ROUTES,
  ...PARTNER_ROUTES,
  ...ADMIN_ROUTES,
]

/**
 * Chemins publics (pour le middleware)
 */
export const PUBLIC_PATHS = PUBLIC_ROUTES.map(r => r.path)

/**
 * Chemins protégés par rôle
 */
export const ROLE_PROTECTED_PATHS = {
  admin: ADMIN_ROUTES.map(r => r.path),
  partner: PARTNER_ROUTES.map(r => r.path),
}

/**
 * Vérifie si un chemin est public
 */
export function isPublicPath(pathname: string): boolean {
  // Chemins statiques et API sont toujours publics
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return true
  }

  // Vérifier les routes publiques exactes
  if (PUBLIC_PATHS.includes(pathname)) {
    return true
  }

  // Vérifier les routes publiques avec paramètres dynamiques
  const publicPrefixes = ["/tracks/", "/mixtapes/", "/categories/", "/partners/"]
  for (const prefix of publicPrefixes) {
    if (pathname.startsWith(prefix) && !pathname.includes("/create") && !pathname.includes("/dashboard")) {
      return true
    }
  }

  return false
}

/**
 * Vérifie si un chemin nécessite un rôle admin
 */
export function isAdminPath(pathname: string): boolean {
  return pathname.startsWith("/admin")
}

/**
 * Vérifie si un chemin nécessite un rôle partenaire
 */
export function isPartnerPath(pathname: string): boolean {
  return (
    pathname.startsWith("/partners/dashboard") ||
    pathname.startsWith("/tracks/create")
  )
}

/**
 * Obtient la configuration d'une route
 */
export function getRouteConfig(pathname: string): RouteConfig | undefined {
  // Chercher une correspondance exacte
  const exactMatch = ALL_ROUTES.find(r => r.path === pathname)
  if (exactMatch) return exactMatch

  // Chercher une correspondance par préfixe
  const prefixMatch = ALL_ROUTES
    .filter(r => pathname.startsWith(r.path) && r.path !== "/")
    .sort((a, b) => b.path.length - a.path.length)[0]
  
  return prefixMatch
}

/**
 * Vérifie si un utilisateur a accès à une route
 */
export function hasRouteAccess(
  pathname: string, 
  userRole?: UserRole | null,
  isAuthenticated: boolean = false
): { hasAccess: boolean; redirectTo?: string } {
  const config = getRouteConfig(pathname)

  // Route non configurée - permettre l'accès par défaut
  if (!config) {
    return { hasAccess: true }
  }

  // Route publique - accès autorisé
  if (config.isPublic) {
    return { hasAccess: true }
  }

  // Route protégée sans authentification
  if (!isAuthenticated) {
    return { hasAccess: false, redirectTo: "/login" }
  }

  // Route avec restriction de rôle
  if (config.roles && config.roles.length > 0) {
    if (!userRole || !config.roles.includes(userRole)) {
      return { hasAccess: false, redirectTo: config.redirectTo || "/home" }
    }
  }

  return { hasAccess: true }
}

/**
 * Redirection par défaut après connexion selon le rôle
 */
export function getDefaultRedirectForRole(role?: UserRole): string {
  switch (role) {
    case "Admin":
      return "/admin"
    case "Partner":
      return "/partners/dashboard"
    default:
      return "/home"
  }
}
