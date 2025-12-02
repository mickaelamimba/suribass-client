import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { 
  AUTH_ROUTES, 
  isAdminPath,
  isPartnerPath,
  isPublicPath 
} from "@/lib/routes.config"

/**
 * Middleware de gestion des routes et authentification
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Récupérer le token d'accès
  const accessToken = request.cookies.get("accessToken")?.value
  const isAuthenticated = !!accessToken

  // 1. Routes publiques - laisser passer
  if (isPublicPath(pathname)) {
    // Redirection de la racine vers /home (page publique)
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/home", request.url))
    }
    return NextResponse.next()
  }

  // 2. Routes d'authentification (login/register) - rediriger si déjà connecté
  if (AUTH_ROUTES.includes(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL("/home", request.url))
  }

  // 3. Routes protégées sans authentification - rediriger vers login
  if (!isAuthenticated) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("from", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // 4. Routes admin - vérification du rôle côté client (AuthGuard)
  // Le middleware ne peut pas décoder le JWT, la vérification fine se fait côté client
  if (isAdminPath(pathname)) {
    // Laisser passer, AuthGuard vérifiera le rôle
    return NextResponse.next()
  }

  // 5. Routes partenaires - vérification du rôle côté client (AuthGuard)
  if (isPartnerPath(pathname)) {
    // Laisser passer, AuthGuard vérifiera le rôle
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, icons, images
     * - public folder assets
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
}
