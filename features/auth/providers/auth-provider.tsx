"use client"

import type { UserProfile } from "@/features/auth/api/auth.types"
import { useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"
import { logoutAction } from "../actions/auth.actions"

interface AuthContextType {
  user: UserProfile | null
  isLoading: boolean
  isAuthenticated: boolean
  accessToken: string | null
  logout: () => Promise<void>
  refetchUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const fetchUser = async () => {
    try {
      // Utiliser la route API pour récupérer la session
      const response = await fetch("/api/auth/session", {
        credentials: "include",
      })
      
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        setAccessToken(data.accessToken)
      } else {
        setUser(null)
        setAccessToken(null)
      }
    } catch (error) {
      console.error("Failed to fetch user:", error)
      setUser(null)
      setAccessToken(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const logout = async () => {
    try {
      await logoutAction()
    } catch (error) {
      // logoutAction already redirects, but handle any errors
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
        isAuthenticated: !!user,
        accessToken,
        logout,
        refetchUser,
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
