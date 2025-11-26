import { getAccessToken } from "@/features/auth/actions/auth.actions"
import { NextRequest, NextResponse } from "next/server"

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5042/api/v1"
const FRONTEND_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

export async function GET(request: NextRequest) {
  try {
    // Récupérer le token d'accès depuis les cookies
    const accessToken = await getAccessToken()

    if (!accessToken) {
      return NextResponse.redirect(
        new URL("/mixtapes/admin?soundcloud_error=unauthorized", FRONTEND_URL)
      )
    }

    // Faire la requête au backend avec le token
    const response = await fetch(`${API_BASE_URL}/soundcloud/authorize`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      redirect: "manual", // Ne pas suivre automatiquement les redirections
    })

    // Si le backend fait une redirection (302, 307, etc.)
    if (response.status >= 300 && response.status < 400) {
      const redirectUrl = response.headers.get("Location")
      if (redirectUrl) {
        // Rediriger l'utilisateur vers l'URL retournée (SoundCloud OAuth)
        return NextResponse.redirect(redirectUrl)
      }
    }

    // Si le backend retourne une erreur
    if (!response.ok) {
      console.error("Backend returned error:", response.status)
      return NextResponse.redirect(
        new URL(
          `/mixtapes/admin?soundcloud_error=backend_error_${response.status}`,
          FRONTEND_URL
        )
      )
    }

    // Si le backend retourne du JSON avec une URL
    const contentType = response.headers.get("content-type")
    if (contentType?.includes("application/json")) {
      const data = await response.json()
      if (data.redirectUrl) {
        return NextResponse.redirect(data.redirectUrl)
      }
    }

    // Fallback: rediriger vers admin avec erreur
    return NextResponse.redirect(
      new URL("/mixtapes/admin?soundcloud_error=no_redirect", FRONTEND_URL)
    )
  } catch (error: any) {
    console.error("Erreur lors de l'autorisation SoundCloud:", error)
    return NextResponse.redirect(
      new URL(
        `/mixtapes/admin?soundcloud_error=${encodeURIComponent(error.message)}`,
        FRONTEND_URL
      )
    )
  }
}
