import { useAuth } from "@/features/auth"
import { useState } from "react"
import { commentsApi } from "../api/comments.api"
import type { AddCommentRequest } from "../api/comments.types"

export const useAddComment = () => {
  const { accessToken } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const addComment = async (data: AddCommentRequest) => {
    setIsLoading(true)
    setError(null)

    try {
      const commentId = await commentsApi.addComment(data, accessToken)
      return commentId
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Erreur lors de l'ajout du commentaire")
      setError(error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    addComment,
    isLoading,
    error,
  }
}
