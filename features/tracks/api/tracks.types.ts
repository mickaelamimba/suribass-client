export interface TrackDto {
  id: string
  title: string
  description: string | null
  
  // Plateforme
  platform: number              // 0=SoundCloud, 1=YouTube, 2=Spotify
  embedUrl: string
  
  // Métadonnées
  thumbnailUrl: string
  duration: string              // Format "00:00:00"
  artistName: string
  
  // Catégorie
  categoryName: string | null
  categorySlug: string | null
  
  // Stats
  viewCount: number
  likeCount: number
  
  // Score IA
  score: number | null
  
  // Dates
  createdAt: string            // ISO 8601
}

export interface TrackDetailDto extends TrackDto {
  // Pas de champs additionnels pour l'instant
}

// Wrapper de réponse API standard
export interface ApiResponse<T> {
  success: boolean
  data: T
  errors: string[]
  message: string | null
}

// Structure de pagination réelle de l'API
export interface PaginatedData<T> {
  items: T[]
  page: number
  pageSize: number
  totalPages: number
  totalCount: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

// Type pour la réponse paginée des tracks
export type PaginatedTracksResponse = PaginatedData<TrackDto>

export interface GetTracksParams {
  pageIndex?: number          // Default: 1
  pageSize?: number           // Default: 20, Max: 100
  categoryId?: string         // UUID - Filtrer par catégorie
  partnerId?: string          // UUID - Filtrer par partenaire
  onlyFeatured?: boolean      // Default: false - Seulement featured
  search?: string             // Recherche dans titre/description
  sortBy?: 'recent' | 'popular' | 'score'  // Default: recent
}

export interface CreateTrackRequest {
  platformUrl: string
  title?: string               // Si pas fourni, extrait auto
  description?: string
  categoryId: string
  playlistInfo?: string
}

export interface UpdateTrackRequest {
  title?: string
  description?: string
  categoryId?: string
  playlistInfo?: string
}

export interface ExtractMetadataRequest {
  url: string
}

export interface ExtractedMetadata {
  platform: number              // 0=SoundCloud, 1=YouTube, 2=Spotify
  platformId: string
  title: string
  description: string | null
  artistName: string
  thumbnailUrl: string
  duration: string              // Format "00:00:00" depuis le backend
  embedUrl: string
  publishedAt: string | null    // ISO 8601
}
