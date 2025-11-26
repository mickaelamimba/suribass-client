import { useState } from "react"
import { securityApi } from "../api/security.api"

export const useUnblockIP = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const unblockIP = async (ipAddress: string) => {
    setIsLoading(true)
    setError(null)

    try {
      await securityApi.unblockIP(ipAddress)
    } catch (err: any) {
      const errorMessage = err.message || "Impossible de débloquer l'adresse IP"
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    unblockIP,
    isLoading,
    error,
    clearError: () => setError(null),
  }
}
