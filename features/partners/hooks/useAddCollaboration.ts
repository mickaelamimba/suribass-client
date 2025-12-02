import { useAuth } from "@/features/auth"
import { ApiError } from "@/lib/fetcher"
import { useState } from "react"
import { partnersApi } from "../api/partners.api"
import type { AddCollaborationRequest } from "../api/partners.types"

export const useAddCollaboration = () => {
  const { accessToken } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addCollaboration = async (data: AddCollaborationRequest) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await partnersApi.addCollaboration(data, accessToken)
      return result
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.errors[0] || "Une erreur est survenue")
      } else {
        setError("Impossible d'ajouter la collaboration")
      }
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    addCollaboration,
    isLoading,
    error,
    clearError: () => setError(null),
  }
}
