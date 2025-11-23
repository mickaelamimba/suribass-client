import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Routes publiques accessibles sans authentification
const publicRoutes = ["/login", "/register", "/"]

// Routes qui nécessitent l'authentification
const protectedRoutes = ["/dashboard"]

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Vérifier si l'utilisateur a un token dans les cookies
  const accessToken = request.cookies.get("accessToken")
  const isAuthenticated = !!accessToken

  // Si l'utilisateur est sur une route protégée sans être authentifié
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("from", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Si l'utilisateur est authentifié et essaie d'accéder à /login ou /register
  if (isAuthenticated && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Rediriger la racine vers /login si non authentifié, sinon vers /dashboard
  if (pathname === "/") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    } else {
      return NextResponse.redirect(new URL("/login", request.url))
    }
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
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)",
  ],
}
