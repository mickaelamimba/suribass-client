import { getCurrentUser } from "@/features/auth/actions/auth.actions"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await getCurrentUser()
    
    if (!response) {
      return NextResponse.json(
        { user: null, isAuthenticated: false },
        { status: 200 }
      )
    }

    // Extraire les données utilisateur depuis response.data (format backend C#)
    const user = (response as any).data || response

    return NextResponse.json({
      user,
      isAuthenticated: true,
    })
  } catch (error) {
    return NextResponse.json(
      { user: null, isAuthenticated: false },
      { status: 200 }
    )
  }
}
