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

import type { PaginatedTracksResponse, TrackDto } from "@/features/tracks/api/tracks.types"

export { PaginatedTracksResponse, TrackDto }

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
