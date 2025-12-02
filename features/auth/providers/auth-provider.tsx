"use client"

import type { UserProfile } from "@/features/auth/api/auth.types"
import { useRouter } from "next/navigation"
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import { logoutAction } from "../actions/auth.actions"

interface AuthContextType {
  user: UserProfile | null
  isLoading: boolean
  isAuthenticated: boolean
  accessToken: string | null
  logout: () => Promise<void>
  refetchUser: () => Promise<void>
  refreshToken: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Intervalle de vérification du token (5 minutes)
const TOKEN_CHECK_INTERVAL = 5 * 60 * 1000
// Marge avant expiration pour rafraîchir (2 minutes)
const REFRESH_MARGIN = 2 * 60 * 1000

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [expiresAt, setExpiresAt] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isRefreshingRef = useRef(false)

  const fetchUser = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/session", {
        credentials: "include",
        cache: "no-store",
      })
      
      if (response.ok) {
        const data = await response.json()
        if (data.user && data.accessToken) {
          setUser(data.user)
          setAccessToken(data.accessToken)
          setExpiresAt(data.expiresAt)
          return true
        }
      }
      
      setUser(null)
      setAccessToken(null)
      setExpiresAt(null)
      return false
    } catch (error) {
      console.error("Failed to fetch user:", error)
      setUser(null)
      setAccessToken(null)
      setExpiresAt(null)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  const refreshToken = useCallback(async () => {
    if (isRefreshingRef.current) return false
    
    isRefreshingRef.current = true
    try {
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include",
      })
      
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setAccessToken(data.accessToken)
          setExpiresAt(data.expiresAt)
          return true
        }
      }
      return false
    } catch (error) {
      console.error("Failed to refresh token:", error)
      return false
    } finally {
      isRefreshingRef.current = false
    }
  }, [])

  const scheduleTokenRefresh = useCallback(() => {
    // Nettoyer le timeout précédent
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current)
    }

    if (!expiresAt) return

    const expirationTime = new Date(expiresAt).getTime()
    const now = Date.now()
    const timeUntilExpiry = expirationTime - now

    // Rafraîchir 2 minutes avant l'expiration
    const refreshTime = timeUntilExpiry - REFRESH_MARGIN

    if (refreshTime > 0) {
      refreshTimeoutRef.current = setTimeout(async () => {
        const success = await refreshToken()
        if (!success) {
          // Si le refresh échoue, essayer de refetch l'utilisateur
          const userFetched = await fetchUser()
          if (!userFetched) {
            // Si tout échoue, déconnecter
            setUser(null)
            setAccessToken(null)
          }
        }
      }, refreshTime)
    } else if (timeUntilExpiry > 0) {
      // Token expiré bientôt, rafraîchir immédiatement
      refreshToken()
    }
  }, [expiresAt, refreshToken, fetchUser])

  // Fetch initial de l'utilisateur
  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  // Planifier le refresh du token
  useEffect(() => {
    if (accessToken && expiresAt) {
      scheduleTokenRefresh()
    }

    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current)
      }
    }
  }, [accessToken, expiresAt, scheduleTokenRefresh])

  // Vérification périodique de la session
  useEffect(() => {
    const checkSession = async () => {
      if (!user) return
      
      // Vérifier si le token est encore valide
      const response = await fetch("/api/auth/session", {
        credentials: "include",
        cache: "no-store",
      })
      
      if (!response.ok) {
        // Essayer de rafraîchir
        const refreshed = await refreshToken()
        if (!refreshed) {
          setUser(null)
          setAccessToken(null)
        }
      }
    }

    const interval = setInterval(checkSession, TOKEN_CHECK_INTERVAL)
    return () => clearInterval(interval)
  }, [user, refreshToken])

  // Écouter les événements de focus pour vérifier la session
  useEffect(() => {
    const handleFocus = () => {
      if (user && accessToken) {
        // Vérifier si le token a expiré pendant que l'onglet était inactif
        if (expiresAt) {
          const now = Date.now()
          const expiry = new Date(expiresAt).getTime()
          if (now >= expiry - REFRESH_MARGIN) {
            refreshToken()
          }
        }
      }
    }

    window.addEventListener("focus", handleFocus)
    return () => window.removeEventListener("focus", handleFocus)
  }, [user, accessToken, expiresAt, refreshToken])

  const logout = async () => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current)
    }
    try {
      await logoutAction()
    } catch (error) {
      console.error("Logout error:", error)
      router.push("/login")
    }
  }

  const refetchUser = async () => {
    setIsLoading(true)
    await fetchUser()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user && !!accessToken,
        accessToken,
        logout,
        refetchUser,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
