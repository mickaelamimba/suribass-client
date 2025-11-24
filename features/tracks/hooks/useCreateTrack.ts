import { ApiError } from "@/lib/fetcher"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { tracksApi } from "../api/tracks.api"
import type { CreateTrackRequest } from "../api/tracks.types"

export const useCreateTrack = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const create = async (data: CreateTrackRequest) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await tracksApi.createTrack(data)
      router.push(`/tracks/${result.id}`)
      return result
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.errors[0] || "Une erreur est survenue")
      } else {
        setError("Impossible de créer la track")
      }
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    create,
    isLoading,
    error,
    clearError: () => setError(null),
  }
}
