export interface GetMixtapesParams {
  page?: number  // Changed from pageIndex to page
  pageSize?: number
  categoryId?: string
  search?: string
  sortBy?: 'recent' | 'popular' | 'score'
}

export interface PaginatedMixtapesResponse {
  items: MixtapeDto[]
  page: number  // Changed from pageIndex to page
  pageSize: number  // Added pageSize to match API response
  totalPages: number
  totalCount: number
  hasPreviousPage: boolean  // Changed from hasPrevious to hasPreviousPage
  hasNextPage: boolean  // Changed from hasNext to hasNextPage
}

export interface MixtapeDto {
  id: string
  title: string
  description: string | null
  embedUrl: string
  thumbnailUrl: string
  duration: string  // Changed from number to string (TimeSpan format from API)
  artistName: string  // Added artistName (present in API response)
  tags: string  // Changed from string[] | null to string (API returns space-separated tags)
  
  // Catégorie
  categoryName: string
  categorySlug: string
  
  // Stats
  viewCount: number  // Simplified from nested platformStats
  likeCount: number  // Simplified from nested platformStats
  
  // Score IA - peut être un objet ou null
  score: {
    score: number
    recommendationMessage: string | null
    calculatedAt: string
  } | null
  
  // Dates
  createdAt: string
}

// MixtapeDetailDto extends MixtapeDto with same structure for now
// In the future, add additional properties if API returns more details for individual mixtapes
export interface MixtapeDetailDto extends MixtapeDto {
  // Currently no additional properties beyond MixtapeDto
}

export interface SyncSoundCloudRequest {
  tags?: string              // Tags séparés par des virgules
  defaultCategoryId?: string // UUID de la catégorie par défaut
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
