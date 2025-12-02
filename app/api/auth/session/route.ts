import { getAccessToken, getCurrentUser } from "@/features/auth/actions/auth.actions"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await getCurrentUser()
    
    if (!response) {
      return NextResponse.json(
        { user: null, isAuthenticated: false, accessToken: null, expiresAt: null },
        { status: 200 }
      )
    }

    // Récupérer le token d'accès et l'expiration depuis les cookies
    const accessToken = await getAccessToken()
    const cookieStore = await cookies()
    const expiresAt = cookieStore.get("expiresAt")?.value || null

    // Extraire les données utilisateur depuis response.data (format backend C#)
    const user = (response as any).data || response

    return NextResponse.json({
      user,
      isAuthenticated: true,
      accessToken, // Renvoyer le token pour l'utiliser côté client
      expiresAt, // Renvoyer l'expiration pour planifier le refresh
    })
  } catch (error) {
    return NextResponse.json(
      { user: null, isAuthenticated: false, accessToken: null, expiresAt: null },
      { status: 200 }
    )
  }
}
