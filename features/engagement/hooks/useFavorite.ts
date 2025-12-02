"use client"

import { useAuth } from "@/features/auth"
import { ApiError } from "@/lib/fetcher"
import { useState } from "react"
import { mutate } from "swr"
import { engagementApi } from "../api/engagement.api"
import type { EngagementRequest } from "../api/engagement.types"

export const useFavorite = () => {
  const { accessToken } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const toggleFavorite = async (data: EngagementRequest) => {
    if (!accessToken) {
      setError("Vous devez être connecté pour ajouter aux favoris")
      return null
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await engagementApi.toggleFavorite(data, accessToken)
      // Invalider le cache des favoris
      mutate("/users/me/favorites")
      return result
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.errors[0] || "Une erreur est survenue")
      } else {
        setError("Impossible d'effectuer cette action")
      }
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    toggleFavorite,
    isLoading,
    error,
    clearError: () => setError(null),
  }
}
