import { useState } from "react"
import { adminApi } from "../api/admin.api"
import type { ModerateCommentRequest } from "../api/admin.types"

export const useModerateComment = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const moderate = async (commentId: string, data: ModerateCommentRequest) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await adminApi.moderateComment(commentId, data)
      return result
    } catch (err: any) {
      const errorMessage = err.message || "Impossible de modérer le commentaire"
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    moderate,
    isLoading,
    error,
    clearError: () => setError(null),
  }
}
