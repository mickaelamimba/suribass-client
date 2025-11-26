import { getAccessToken, getCurrentUser } from "@/features/auth/actions/auth.actions"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await getCurrentUser()
    
    if (!response) {
      return NextResponse.json(
        { user: null, isAuthenticated: false, accessToken: null },
        { status: 200 }
      )
    }

    // Récupérer le token d'accès depuis les cookies
    const accessToken = await getAccessToken()

    // Extraire les données utilisateur depuis response.data (format backend C#)
    const user = (response as any).data || response

    return NextResponse.json({
      user,
      isAuthenticated: true,
      accessToken, // Renvoyer le token pour l'utiliser côté client
    })
  } catch (error) {
    return NextResponse.json(
      { user: null, isAuthenticated: false, accessToken: null },
      { status: 200 }
    )
  }
}
