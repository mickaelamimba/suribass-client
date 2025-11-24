import { ApiError } from "@/lib/fetcher"
import { useState } from "react"
import { tracksApi } from "../api/tracks.api"
import type { ExtractMetadataRequest, ExtractedMetadata } from "../api/tracks.types"

export const useExtractMetadata = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [metadata, setMetadata] = useState<ExtractedMetadata | null>(null)

  const extract = async (data: ExtractMetadataRequest) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await tracksApi.extractMetadata(data)
      setMetadata(result)
      return result
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.errors[0] || "Impossible d'extraire les métadonnées")
      } else {
        setError("Une erreur est survenue")
      }
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    extract,
    metadata,
    isLoading,
    error,
    clearError: () => setError(null),
    clearMetadata: () => setMetadata(null),
  }
}
