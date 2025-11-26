import { useAuth } from "@/features/auth"
import { useState } from "react"
import { commentsApi } from "../api/comments.api"

export const useDeleteComment = () => {
  const { accessToken } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const deleteComment = async (commentId: string) => {
    setIsLoading(true)
    setError(null)

    try {
      await commentsApi.deleteComment(commentId, accessToken)
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Erreur lors de la suppression du commentaire")
      setError(error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    deleteComment,
    isLoading,
    error,
  }
}
