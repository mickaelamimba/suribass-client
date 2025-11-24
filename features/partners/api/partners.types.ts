export interface PartnerDto {
  id: string
  artistName: string
  bio: string | null
  avatarUrl: string | null
  trackCount: number
  totalViews: number
  joinedAt: string // ISO 8601
}

export interface PaginatedPartnersResponse {
  items: PartnerDto[]
  pageIndex: number
  totalPages: number
  totalCount: number
  hasPrevious: boolean
  hasNext: boolean
}

export interface GetPartnersParams {
  pageIndex?: number
  pageSize?: number
  search?: string
}

// Re-using TrackDto from tracks feature if possible, but defining a minimal one here for independence if needed
// Assuming we can import or redefine. For now, using a placeholder or minimal definition.
// In a real scenario, we might import { TrackDto } from "@/features/tracks/api/tracks.types"
// But to avoid circular deps or tight coupling, we can redefine or use a shared type.
// Let's assume a basic structure for now.
export interface TrackDto {
  id: string
  title: string
  artistName: string
  coverUrl: string | null
  duration: number
  playCount: number
  createdAt: string
  // ... other fields
}

export interface PartnerDetailDto extends PartnerDto {
  tracks: TrackDto[]
  totalLikes: number
  totalComments: number
  totalShares: number
  averageScore: number | null
}

export interface PartnerDashboardDto {
  partner: PartnerDto
  stats: {
    totalTracks: number
    totalViews: number
    totalLikes: number
    totalComments: number
    totalShares: number
    averageScore: number | null
  }
  recentTracks: TrackDto[]
  topTracks: TrackDto[]
  analytics: {
    viewsLast30Days: number
    likesLast30Days: number
    viewsTrend: {
      date: string
      views: number
    }[]
    likesTrend: {
      date: string
      likes: number
    }[]
    tracksByCategory: {
      categoryName: string
      count: number
    }[]
  }
}

export interface PaginatedTracksResponse {
  items: TrackDto[]
  pageIndex: number
  totalPages: number
  totalCount: number
  hasPrevious: boolean
  hasNext: boolean
}

export interface GetPartnerTracksParams {
  pageIndex?: number
  pageSize?: number
  categoryId?: string
  sortBy?: 'recent' | 'popular' | 'score'
}

export interface RegisterPartnerRequest {
  artistName: string
  bio?: string
}

export interface UpdatePartnerRequest {
  artistName?: string
  bio?: string
  avatarUrl?: string
}

export interface AddCollaborationRequest {
  trackId: string
  collaboratorPartnerId: string
  role: string
}

export interface CollaborationDto {
  id: string
  trackId: string
  trackTitle: string
  partnerId: string
  partnerName: string
  partnerAvatarUrl: string | null
  role: string
  createdAt: string
}

export interface PartnerCollaborationsResponse {
  asCollaborator: CollaborationDto[]
  withCollaborators: CollaborationDto[]
}
