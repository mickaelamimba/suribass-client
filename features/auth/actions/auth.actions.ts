"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3001/api"

// Configuration des cookies
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
}

const ACCESS_TOKEN_MAX_AGE = 15 * 60 // 15 minutes
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 // 7 jours

export async function loginAction(email: string, password: string) {
  try {
    console.log("🔐 Login attempt:", email, "API URL:", API_BASE_URL)
    
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    console.log("📡 API Response status:", response.status)

    if (!response.ok) {
      const error = await response.json()
      console.error("❌ Login failed:", error)
      return {
        success: false,
        error: error.errors?.[0] || error.message || "Erreur de connexion",
      }
    }

    const response_data = await response.json()
    console.log("📦 Full API response data:", JSON.stringify(response_data, null, 2))
    
    // Extraire les tokens depuis data.data (format de votre backend C#)
    const tokens = response_data.data || response_data
    
    console.log("✅ Login successful, received tokens:", {
      hasAccessToken: !!tokens.accessToken,
      hasRefreshToken: !!tokens.refreshToken,
      expiresAt: tokens.expiresAt
    })

    // Stocker les tokens dans des cookies httpOnly
    const cookieStore = await cookies()
    
    cookieStore.set("accessToken", tokens.accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: ACCESS_TOKEN_MAX_AGE,
    })
    
    cookieStore.set("refreshToken", tokens.refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: REFRESH_TOKEN_MAX_AGE,
    })
    
    cookieStore.set("expiresAt", tokens.expiresAt, {
      ...COOKIE_OPTIONS,
      maxAge: REFRESH_TOKEN_MAX_AGE,
    })

    // Vérifier que les cookies ont été créés
    const verifyAccess = cookieStore.get("accessToken")
    console.log("🍪 Cookies set:", {
      accessToken: verifyAccess ? "SET ✓" : "NOT SET ✗",
    })

    return { success: true }
  } catch (error: any) {
    console.error("💥 Login error:", error)
    return {
      success: false,
      error: error.message || "Une erreur est survenue",
    }
  }
}

export async function registerAction(
  email: string,
  username: string,
  password: string
) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    })

    if (!response.ok) {
      const error = await response.json()
      return {
        success: false,
        error: error.errors?.[0] || error.message || "Erreur d'inscription",
      }
    }

    const response_data = await response.json()
    
    // Extraire les tokens depuis data.data (format de votre backend C#)
    const tokens = response_data.data || response_data

    // Stocker les tokens dans des cookies httpOnly
    const cookieStore = await cookies()
    cookieStore.set("accessToken", tokens.accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: ACCESS_TOKEN_MAX_AGE,
    })
    cookieStore.set("refreshToken", tokens.refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: REFRESH_TOKEN_MAX_AGE,
    })
    cookieStore.set("expiresAt", tokens.expiresAt, {
      ...COOKIE_OPTIONS,
      maxAge: REFRESH_TOKEN_MAX_AGE,
    })

    return { success: true }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Une erreur est survenue",
    }
  }
}

export async function googleAuthAction(idToken: string) {
  try {
    console.log("🔐 Google auth attempt")
    
    const response = await fetch(`${API_BASE_URL}/auth/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    })

    console.log("📡 Google Auth API Response status:", response.status)

    if (!response.ok) {
      const error = await response.json()
      console.error("❌ Google auth failed:", error)
      return {
        success: false,
        error: error.errors?.[0] || error.message || "Erreur de connexion Google",
      }
    }

    const response_data = await response.json()
    
    // Extraire les tokens depuis data.data (format de votre backend C#)
    const tokens = response_data.data || response_data
    
    console.log("✅ Google auth successful, received tokens:", {
      hasAccessToken: !!tokens.accessToken,
      hasRefreshToken: !!tokens.refreshToken,
      expiresAt: tokens.expiresAt
    })

    // Stocker les tokens dans des cookies httpOnly
    const cookieStore = await cookies()
    
    cookieStore.set("accessToken", tokens.accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: ACCESS_TOKEN_MAX_AGE,
    })
    
    cookieStore.set("refreshToken", tokens.refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: REFRESH_TOKEN_MAX_AGE,
    })
    
    cookieStore.set("expiresAt", tokens.expiresAt, {
      ...COOKIE_OPTIONS,
      maxAge: REFRESH_TOKEN_MAX_AGE,
    })

    return { success: true }
  } catch (error: any) {
    console.error("💥 Google auth error:", error)
    return {
      success: false,
      error: error.message || "Une erreur est survenue",
    }
  }
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete("accessToken")
  cookieStore.delete("refreshToken")
  cookieStore.delete("expiresAt")
  redirect("/login")
}

export async function getAccessToken() {
  const cookieStore = await cookies()
  return cookieStore.get("accessToken")?.value || null
}

export async function getRefreshToken() {
  const cookieStore = await cookies()
  return cookieStore.get("refreshToken")?.value || null
}

export async function refreshTokenAction() {
  try {
    const refreshToken = await getRefreshToken()
    if (!refreshToken) {
      return { success: false, error: "No refresh token" }
    }

    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    })

    if (!response.ok) {
      // Clear cookies if refresh fails
      const cookieStore = await cookies()
      cookieStore.delete("accessToken")
      cookieStore.delete("refreshToken")
      cookieStore.delete("expiresAt")
      return { success: false, error: "Refresh failed" }
    }

    const response_data = await response.json()
    
    // Extraire les tokens depuis data.data (format de votre backend C#)
    const tokens = response_data.data || response_data

    // Update cookies with new tokens
    const cookieStore = await cookies()
    cookieStore.set("accessToken", tokens.accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: ACCESS_TOKEN_MAX_AGE,
    })
    cookieStore.set("refreshToken", tokens.refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: REFRESH_TOKEN_MAX_AGE,
    })
    cookieStore.set("expiresAt", tokens.expiresAt, {
      ...COOKIE_OPTIONS,
      maxAge: REFRESH_TOKEN_MAX_AGE,
    })

    return { success: true, accessToken: tokens.accessToken }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Refresh failed",
    }
  }
}

export async function getCurrentUser() {
  try {
    const accessToken = await getAccessToken()
    if (!accessToken) {
      return null
    }

    const response = await fetch(`${API_BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      return null
    }

    const responseData = await response.json()
    
    // Extraire les données depuis data.data (format backend C#)
    return responseData.data || responseData
  } catch (error) {
    return null
  }
}
