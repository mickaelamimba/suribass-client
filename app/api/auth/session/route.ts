import { getCurrentUser } from "@/features/auth/actions/auth.actions"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json(
        { user: null, isAuthenticated: false },
        { status: 200 }
      )
    }

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
