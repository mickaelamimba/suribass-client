"use server"

import { cookies } from "next/headers"
import type { 
  EmailConfigDto, 
  EmailTestConnectionResponse, 
  EmailTestSendRequest 
} from "../api/email.types"

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3001/api"

async function getAccessToken() {
  const cookieStore = await cookies()
  return cookieStore.get("accessToken")?.value || null
}

export async function getEmailConfigAction(): Promise<{
  success: boolean
  data?: EmailConfigDto
  error?: string
}> {
  try {
    const accessToken = await getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Non authentifié" }
    }

    const response = await fetch(`${API_BASE_URL}/email/config`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      return {
        success: false,
        error: error.errors?.[0] || error.message || "Erreur lors de la récupération de la configuration",
      }
    }

    const responseData = await response.json()
    return { success: true, data: responseData.data }
  } catch (error) {
    console.error("Error fetching email config:", error)
    return { success: false, error: "Une erreur est survenue" }
  }
}

export async function testEmailConnectionAction(): Promise<{
  success: boolean
  data?: EmailTestConnectionResponse
  error?: string
}> {
  try {
    const accessToken = await getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Non authentifié" }
    }

    const response = await fetch(`${API_BASE_URL}/email/test-connection`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const responseData = await response.json()
    
    if (!response.ok) {
      return {
        success: false,
        data: responseData.data,
        error: responseData.errors?.[0] || responseData.message || "Échec du test de connexion",
      }
    }

    return { success: true, data: responseData.data }
  } catch (error) {
    console.error("Error testing email connection:", error)
    return { success: false, error: "Une erreur est survenue" }
  }
}

export async function sendTestEmailAction(request: EmailTestSendRequest): Promise<{
  success: boolean
  message?: string
  error?: string
}> {
  try {
    const accessToken = await getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Non authentifié" }
    }

    const response = await fetch(`${API_BASE_URL}/email/test-send`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })

    const responseData = await response.json()
    
    if (!response.ok) {
      return {
        success: false,
        error: responseData.errors?.[0] || responseData.message || "Échec de l'envoi de l'email",
      }
    }

    return { success: true, message: responseData.message }
  } catch (error) {
    console.error("Error sending test email:", error)
    return { success: false, error: "Une erreur est survenue" }
  }
}
