import { apiMutation } from "@/lib/api-helpers"
import { fetcher } from "@/lib/fetcher"
import type {
    AddCommentRequest,
    CommentDto,
    GetCommentsParams,
    ReplyToCommentRequest,
} from "./comments.types"

export const commentsApi = {
  // GET - Commentaires d'une track
  getTrackComments: (trackId: string, params: GetCommentsParams = {}, token?: string | null) => {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = value.toString()
        }
        return acc
      }, {} as Record<string, string>)
    ).toString()

    return fetcher<CommentDto[]>(
      `/comments/track/${trackId}${queryString ? `?${queryString}` : ""}`,
      { token }
    )
  },

  // GET - Commentaires d'une mixtape
  getMixtapeComments: (mixtapeId: string, params: GetCommentsParams = {}, token?: string | null) => {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = value.toString()
        }
        return acc
      }, {} as Record<string, string>)
    ).toString()

    return fetcher<CommentDto[]>(
      `/comments/mixtape/${mixtapeId}${queryString ? `?${queryString}` : ""}`,
      { token }
    )
  },

  // POST - Ajouter un commentaire (requiert authentification)
  addComment: (data: AddCommentRequest, token?: string | null) =>
    apiMutation<AddCommentRequest, string>(
      "/comments",
      "POST",
      data,
      {
        revalidate: [
          data.trackId ? `/comments/track/${data.trackId}` : undefined,
          data.mixtapeId ? `/comments/mixtape/${data.mixtapeId}` : undefined,
        ].filter(Boolean) as string[],
        token,
      }
    ),

  // POST - Répondre à un commentaire (requiert authentification)
  replyToComment: (commentId: string, data: ReplyToCommentRequest, token?: string | null) =>
    apiMutation<ReplyToCommentRequest, string>(
      `/comments/${commentId}/reply`,
      "POST",
      data,
      {
        revalidate: [], // Les commentaires seront revalidés globalement
        token,
      }
    ),

  // DELETE - Supprimer un commentaire (requiert authentification, owner ou admin)
  deleteComment: (commentId: string, token?: string | null) =>
    apiMutation<undefined, void>(
      `/comments/${commentId}`,
      "DELETE",
      undefined,
      {
        revalidate: [], // Les commentaires seront revalidés globalement
        token,
      }
    ),
}
