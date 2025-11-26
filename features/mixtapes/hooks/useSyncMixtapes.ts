import { useAuth } from "@/features/auth/providers/auth-provider"
import { ApiError } from "@/lib/fetcher"
import { useState } from "react"
import { mixtapesApi } from "../api/mixtapes.api"
import type { SyncResultDto, SyncSoundCloudRequest } from "../api/mixtapes.types"

export const useSyncMixtapes = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<SyncResultDto | null>(null)
  const { accessToken } = useAuth()

  const sync = async (data?: SyncSoundCloudRequest) => {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const syncResult = await mixtapesApi.syncFromSoundCloud(data, accessToken)
      setResult(syncResult)
      return syncResult
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.errors[0] || "Une erreur est survenue lors de la synchronisation")
      } else {
        setError("Impossible de synchroniser les mixtapes depuis SoundCloud")
      }
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    sync,
    isLoading,
    error,
    result,
    clearError: () => setError(null),
    clearResult: () => setResult(null),
  }
}
