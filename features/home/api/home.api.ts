import { fetcher } from "@/lib/fetcher"
import type {
    FeaturedTracksParams,
    HomeDataDto,
    PaginatedMixtapesResponse,
    PaginatedTracksResponse,
    RecentMixtapesParams,
    TopContentDto,
    TopContentParams,
} from "./home.types"

export const homeApi = {
  // GET - Données complètes de la page d'accueil
  getHomeData: () => fetcher<HomeDataDto>("/home"),

  // GET - Tracks mis en avant (featured) avec pagination
  getFeaturedTracks: (params: FeaturedTracksParams = {}) => {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = value.toString()
        }
        return acc
      }, {} as Record<string, string>)
    ).toString()

    return fetcher<PaginatedTracksResponse>(
      `/home/featured${queryString ? `?${queryString}` : ""}`
    )
  },

  // GET - Top contenu (meilleures notes)
  getTopContent: (params: TopContentParams = {}) => {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = value.toString()
        }
        return acc
      }, {} as Record<string, string>)
    ).toString()

    return fetcher<TopContentDto[]>(
      `/home/top-content${queryString ? `?${queryString}` : ""}`
    )
  },

  // GET - Mixtapes récentes avec pagination
  getRecentMixtapes: (params: RecentMixtapesParams = {}) => {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = value.toString()
        }
        return acc
      }, {} as Record<string, string>)
    ).toString()

    return fetcher<PaginatedMixtapesResponse>(
      `/home/recent-mixtapes${queryString ? `?${queryString}` : ""}`
    )
  },
}
