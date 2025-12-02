import { useAuth } from "@/features/auth/providers/auth-provider"
import { ApiError } from "@/lib/fetcher"
import { useState } from "react"
import { tracksApi } from "../api/tracks.api"

export const useDeleteTrack = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { accessToken } = useAuth()

  const deleteTrack = async (id: string, options?: { redirect?: boolean }) => {
    setIsLoading(true)
    setError(null)

    try {
      await tracksApi.deleteTrack(id, accessToken)
      // Ne redirige plus automatiquement
      return true
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.errors[0] || "Une erreur est survenue")
      } else {
        setError("Impossible de supprimer la track")
      }
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    deleteTrack,
    isLoading,
    error,
    clearError: () => setError(null),
  }
}
