import { getAccessToken } from "@/features/auth/actions/auth.actions"
import { NextRequest, NextResponse } from "next/server"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5042/api/v1"

export async function GET(request: NextRequest) {
  try {
    const token = await getAccessToken()
    
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const queryString = searchParams.toString()

    // Ne pas ajouter /api/ car déjà dans API_BASE_URL
    const response = await fetch(
      `${API_BASE_URL}/admin/moderation${queryString ? `?${queryString}` : ""}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (!response.ok) {
      const error = await response.json()
      return NextResponse.json(error, { status: response.status })
    }

    const data = await response.json()
    
    // Extraire depuis data.data si format C#
    const moderation = (data as any).data || data
    
    return NextResponse.json(moderation)
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
