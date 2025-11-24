export interface TrackDto {
  id: string
  title: string
  description: string | null
  playlistInfo: string | null
  
  // Plateforme
  platform: 'SoundCloud' | 'YouTube' | 'Spotify'
  platformUrl: string
  embedUrl: string
  
  // Métadonnées
  thumbnailUrl: string
  duration: number              // En secondes
  artistName: string
  publishedAt: string | null    // ISO 8601
  
  // Partenaire
  partnerId: string
  partnerName: string
  partnerAvatarUrl: string | null
  
  // Catégorie
  categoryId: string
  categoryName: string
  categorySlug: string
  
  // Stats
  stats: {
    viewCount: number
    likeCount: number
    commentCount: number
    shareCount: number
  }
  
  // Score IA
  score: {
    value: number               // 0-100
    recommendationMessage: string | null
  } | null
  
  // Collaborateurs
  collaborators: {
    partnerId: string
    partnerName: string
    partnerAvatarUrl: string | null
    role: string                // "featuring", "producer", etc.
  }[]
  
  // Engagement utilisateur
  isLikedByCurrentUser: boolean       // false si non auth
  isFavoritedByCurrentUser: boolean   // false si non auth
  
  // Dates
  createdAt: string            // ISO 8601
  updatedAt: string
}

export interface TrackDetailDto extends TrackDto {
  // Pas de champs additionnels pour l'instant
}

export interface PaginatedTracksResponse {
  items: TrackDto[]
  pageIndex: number
  totalPages: number
  totalCount: number
  hasPrevious: boolean
  hasNext: boolean
}

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
  platform: 'SoundCloud' | 'YouTube' | 'Spotify'
  title: string
  artistName: string
  thumbnailUrl: string
  duration: number             // En secondes
  embedUrl: string
  publishedAt: string | null   // ISO 8601
}
