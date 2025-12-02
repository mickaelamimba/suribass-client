// Types pour la feature Engagement (likes, favoris, partages)

// Réponse du toggle like
export interface LikeToggleResponse {
  isLiked: boolean
}

// Réponse du toggle favori
export interface FavoriteToggleResponse {
  isFavorited: boolean
}

// Réponse de création de lien de partage
export interface ShareLinkResponse {
  token: string
  url: string
  expiresAt: string // ISO 8601
}

// Stats d'engagement
export interface EngagementStatsDto {
  likesCount: number
  commentsCount: number
  favoritesCount: number
  sharesCount: number
}

// Requête pour like/favorite/share
export interface EngagementRequest {
  trackId?: string
  mixtapeId?: string
}

// Paramètres pour récupérer les stats
export interface GetEngagementStatsParams {
  trackId?: string
  mixtapeId?: string
}
