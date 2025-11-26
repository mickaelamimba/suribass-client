export interface PartnerDto {
  id: string
  userId: string
  artistName: string
  bio: string | null
  avatarUrl: string | null
  trackCount: number
  joinedAt: string | null // ISO 8601
}

// L'API renvoie un tableau direct pour /partners d'après l'exemple
// Mais gardons la structure paginée si jamais l'exemple était simplifié
// Si l'API renvoie data: [...], alors le fetcher extraira ce tableau.
export type PartnersListResponse = PartnerDto[]

export interface GetPartnersParams {
  pageIndex?: number
  pageSize?: number
  search?: string
}

import type { PaginatedTracksResponse, TrackDto } from "@/features/tracks/api/tracks.types"

export { PaginatedTracksResponse, TrackDto }

export interface PartnerDetailDto extends PartnerDto {
  // L'exemple API montre la même structure que PartnerDto
}

export interface RecentActivityDto {
  type: string
  description: string
  occurredAt: string | null
}

export interface TopTrackDto {
  id: string
  title: string
  thumbnailUrl: string
  viewCount: number
  likeCount: number
  score: number
}

export interface PartnerDashboardDto {
  partnerId: string
  artistName: string
  avatarUrl: string | null
  stats: {
    totalTracks: number
    totalCollaborations: number
    totalViews: number
    totalLikes: number
    totalComments: number
    averageScore: number
    tracksThisMonth: number
  }
  topTracks: TopTrackDto[]
  recentActivity: RecentActivityDto[]
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
