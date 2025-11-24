import { useState } from "react"
import { adminApi } from "../api/admin.api"

export const useRefreshScores = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)

  const refresh = async () => {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await adminApi.refreshAllScores()
      setResult(response.message)
      return response
    } catch (err: any) {
      const errorMessage = err.message || "Impossible de lancer le recalcul des scores"
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    refresh,
    isLoading,
    error,
    result,
    clearError: () => setError(null),
  }
}
