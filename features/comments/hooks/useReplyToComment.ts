import { useAuth } from "@/features/auth"
import { useState } from "react"
import { commentsApi } from "../api/comments.api"
import type { ReplyToCommentRequest } from "../api/comments.types"

export const useReplyToComment = () => {
  const { accessToken } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const replyToComment = async (commentId: string, data: ReplyToCommentRequest) => {
    setIsLoading(true)
    setError(null)

    try {
      const replyId = await commentsApi.replyToComment(commentId, data, accessToken)
      return replyId
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Erreur lors de la réponse au commentaire")
      setError(error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    replyToComment,
    isLoading,
    error,
  }
}
