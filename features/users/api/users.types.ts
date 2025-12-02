// Types pour la feature Users

import type { PartnerDto, UserRole } from "@/features/auth/api/auth.types"

// Profil utilisateur (déjà défini dans auth, réexporté pour clarté)
export interface UserProfileDto {
  id: string
  email: string
  username: string
  role: UserRole
  createdAt: string
  partner: PartnerDto | null
}

// Item favori (peut être track ou mixtape)
export interface FavoriteItemDto {
  id: string
  contentType: "Track" | "Mixtape"
  contentId: string
  title: string
  thumbnailUrl: string
  artistName: string
  addedAt: string
}

// Réponse paginée des favoris
export interface PaginatedFavoritesResponse {
  items: FavoriteItemDto[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

// Paramètres pour récupérer les favoris
export interface GetUserFavoritesParams {
  pageIndex?: number
  pageSize?: number
}
