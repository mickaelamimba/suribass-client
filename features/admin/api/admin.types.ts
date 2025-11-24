// Types pour la feature Admin

export interface GlobalStatsDto {
  totalUsers: number
  totalPartners: number
  totalTracks: number
  totalMixtapes: number
  totalComments: number
  totalViews: number
  totalLikes: number
  newUsersLast30Days: number
  newTracksLast30Days: number
  topCategories: {
    categoryName: string
    trackCount: number
  }[]
  topPartners: {
    partnerId: string
    partnerName: string
    totalViews: number
  }[]
}

export interface GetModerationParams {
  pageIndex?: number
  pageSize?: number
}

export interface ModerationItemDto {
  commentId: string
  content: string
  userId: string
  username: string
  trackId: string | null
  mixtapeId: string | null
  contentTitle: string
  createdAt: string
  aiSuggestion: 'Approve' | 'Reject'
  aiReason: string | null
}

export interface PaginatedModerationResponse {
  items: ModerationItemDto[]
  pageIndex: number
  totalPages: number
  totalCount: number
  hasPrevious: boolean
  hasNext: boolean
}

export interface ModerateCommentRequest {
  status: 'Approved' | 'Rejected'
  reason?: string
}

export interface CommentDto {
  id: string
  content: string
  userId: string
  username: string
  userAvatarUrl: string | null
  moderationStatus: 'Pending' | 'Approved' | 'Rejected'
  moderationReason: string | null
  createdAt: string
  replies: CommentDto[]
}

export interface RefreshScoresResponse {
  totalProcessed: number
  successCount: number
  errorCount: number
  message: string
}
