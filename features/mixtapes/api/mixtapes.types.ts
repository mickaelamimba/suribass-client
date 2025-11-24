export interface GetMixtapesParams {
  pageIndex?: number
  pageSize?: number
  categoryId?: string
  search?: string
  sortBy?: 'recent' | 'popular' | 'score'
}

export interface PaginatedMixtapesResponse {
  items: MixtapeDto[]
  pageIndex: number
  totalPages: number
  totalCount: number
  hasPrevious: boolean
  hasNext: boolean
}

export interface MixtapeDto {
  id: string
  soundCloudId: string
  title: string
  description: string | null
  embedUrl: string
  thumbnailUrl: string
  duration: number
  tags: string[] | null
  
  // Catégorie
  categoryId: string
  categoryName: string
  categorySlug: string
  
  // Stats SoundCloud
  platformStats: {
    viewCount: number
    likeCount: number
    commentCount: number
    repostCount: number
  }
  
  // Stats du site
  siteStats: {
    viewCount: number
    likeCount: number
    commentCount: number
    shareCount: number
  }
  
  // Score IA
  score: {
    value: number
    recommendationMessage: string | null
  } | null
  
  // Engagement utilisateur
  isLikedByCurrentUser: boolean
  isFavoritedByCurrentUser: boolean
  
  // Dates
  lastSyncAt: string
  createdAt: string
}

export interface MixtapeDetailDto extends MixtapeDto {
  artistName: string
  publishedAt: string | null
  waveformUrl: string | null
  lastSyncError: string | null
}

export interface SyncSoundCloudRequest {
  tags?: string[]
}

export interface SyncResultDto {
  totalFetched: number
  newMixtapes: number
  updatedMixtapes: number
  errors: string[]
  duration: number
}

export interface UpdateMixtapeRequest {
  description?: string
  categoryId?: string
}
