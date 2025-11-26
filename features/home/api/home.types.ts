// Types pour la page d'accueil

// Enum pour le type de contenu
export enum ContentType {
  Track = 0,
  Mixtape = 1,
}

// Track récent pour la page d'accueil
export interface RecentTrackDto {
  id: string
  title: string
  description: string | null
  platform: number
  embedUrl: string
  thumbnailUrl: string
  duration: string
  artistName: string
  categoryName: string
  categorySlug: string
  viewCount: number
  likeCount: number
  score: number | null
  createdAt: string
}

// Top contenu (tracks et mixtapes avec meilleurs scores)
export interface TopContentDto {
  id: string
  contentType: ContentType
  title: string
  thumbnailUrl: string
  artistName: string
  score: number
  recommendationMessage: string | null
  calculatedAt: string
}

// Mixtape récente pour la page d'accueil
export interface RecentMixtapeDto {
  id: string
  title: string
  description: string | null
  embedUrl: string
  thumbnailUrl: string
  duration: string
  artistName: string
  tags: string
  categoryName: string
  categorySlug: string
  viewCount: number
  likeCount: number
  score: number | null
  createdAt: string
}

// Données complètes de la page d'accueil
export interface HomeDataDto {
  recentTracks: RecentTrackDto[]
  topContent: TopContentDto[]
  recentMixtapes: RecentMixtapeDto[]
}

// Réponse paginée pour les tracks mis en avant
export interface FeaturedTracksParams {
  pageIndex?: number
  pageSize?: number
}

export interface PaginatedTracksResponse {
  items: RecentTrackDto[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

// Paramètres pour le top content
export interface TopContentParams {
  count?: number
  contentType?: ContentType
}

// Paramètres pour les mixtapes récentes
export interface RecentMixtapesParams {
  pageIndex?: number
  pageSize?: number
}

export interface PaginatedMixtapesResponse {
  items: RecentMixtapeDto[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}
