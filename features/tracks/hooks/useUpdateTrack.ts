import { ApiError } from "@/lib/fetcher"
import { useState } from "react"
import { tracksApi } from "../api/tracks.api"
import type { UpdateTrackRequest } from "../api/tracks.types"

export const useUpdateTrack = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const update = async (id: string, data: UpdateTrackRequest) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await tracksApi.updateTrack(id, data)
      return result
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.errors[0] || "Une erreur est survenue")
      } else {
        setError("Impossible de mettre à jour la track")
      }
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    update,
    isLoading,
    error,
    clearError: () => setError(null),
  }
}
