import { ApiError } from "@/lib/fetcher"
import { useState } from "react"
import { mixtapesApi } from "../api/mixtapes.api"
import type { UpdateMixtapeRequest } from "../api/mixtapes.types"

export const useUpdateMixtape = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateMixtape = async (id: string, data: UpdateMixtapeRequest) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await mixtapesApi.updateMixtape(id, data)
      return result
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.errors[0] || "Une erreur est survenue")
      } else {
        setError("Impossible de mettre à jour la mixtape")
      }
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    updateMixtape,
    isLoading,
    error,
    clearError: () => setError(null),
  }
}
