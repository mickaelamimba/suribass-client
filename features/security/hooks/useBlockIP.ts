import { useState } from "react"
import { securityApi } from "../api/security.api"
import type { BlockIPRequest } from "../api/security.types"

export const useBlockIP = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const blockIP = async (data: BlockIPRequest) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await securityApi.blockIP(data)
      return result
    } catch (err: any) {
      const errorMessage = err.message || "Impossible de bloquer l'adresse IP"
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    blockIP,
    isLoading,
    error,
    clearError: () => setError(null),
  }
}
