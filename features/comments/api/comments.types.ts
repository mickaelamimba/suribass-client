// Types pour les commentaires

// Enum pour le statut de modération
export enum ModerationStatus {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
}

// DTO pour un commentaire
export interface CommentDto {
  id: string
  content: string
  userId: string
  userName: string
  trackId: string | null
  mixtapeId: string | null
  moderationStatus: ModerationStatus
  createdAt: string
  replies: string[] // IDs des réponses
}

// Requête pour ajouter un commentaire
export interface AddCommentRequest {
  content: string
  trackId?: string
  mixtapeId?: string
}

// Requête pour répondre à un commentaire
export interface ReplyToCommentRequest {
  content: string
}

// Paramètres pour récupérer les commentaires
export interface GetCommentsParams {
  pageIndex?: number
  pageSize?: number
}
