import { apiMutation } from "@/lib/api-helpers"
import { fetcher } from "@/lib/fetcher"
import type {
  EngagementRequest,
  EngagementStatsDto,
  FavoriteToggleResponse,
  GetEngagementStatsParams,
  LikeToggleResponse,
  ShareLinkResponse,
} from "./engagement.types"

export const engagementApi = {
  // POST - Toggle like (requiert authentification)
  toggleLike: (data: EngagementRequest, token?: string | null) =>
    apiMutation<EngagementRequest, LikeToggleResponse>(
      "/engagement/like",
      "POST",
      data,
      {
        revalidate: data.trackId 
          ? [`/engagement/stats?trackId=${data.trackId}`]
          : data.mixtapeId 
            ? [`/engagement/stats?mixtapeId=${data.mixtapeId}`]
            : [],
        token,
      }
    ),

  // POST - Toggle favorite (requiert authentification)
  toggleFavorite: (data: EngagementRequest, token?: string | null) =>
    apiMutation<EngagementRequest, FavoriteToggleResponse>(
      "/engagement/favorite",
      "POST",
      data,
      {
        revalidate: ["/users/me/favorites"],
        token,
      }
    ),

  // POST - Créer un lien de partage (public)
  createShareLink: (data: EngagementRequest) =>
    apiMutation<EngagementRequest, ShareLinkResponse>(
      "/engagement/share",
      "POST",
      data
    ),

  // GET - Récupérer les stats d'engagement (public)
  getEngagementStats: (params: GetEngagementStatsParams) => {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = value.toString()
        }
        return acc
      }, {} as Record<string, string>)
    ).toString()

    return fetcher<EngagementStatsDto>(
      `/engagement/stats?${queryString}`
    )
  },
}
