import { refreshTokenAction } from "@/features/auth/actions/auth.actions"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const result = await refreshTokenAction()
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 401 }
      )
    }

    // Récupérer l'expiration depuis les cookies mis à jour
    const cookieStore = await cookies()
    const expiresAt = cookieStore.get("expiresAt")?.value

    return NextResponse.json({
      success: true,
      accessToken: result.accessToken,
      expiresAt,
    })
  } catch (error) {
    console.error("Refresh token error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to refresh token" },
      { status: 500 }
    )
  }
}
