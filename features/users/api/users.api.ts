import { fetcher } from "@/lib/fetcher"
import type {
    GetUserFavoritesParams,
    PaginatedFavoritesResponse,
    UserProfileDto,
} from "./users.types"

export const usersApi = {
  // GET - Profil utilisateur courant (requiert authentification)
  getCurrentUser: (token?: string | null) =>
    fetcher<UserProfileDto>("/users/me", { token: token || undefined }),

  // GET - Favoris de l'utilisateur courant (requiert authentification)
  getUserFavorites: (params: GetUserFavoritesParams = {}, token?: string | null) => {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = value.toString()
        }
        return acc
      }, {} as Record<string, string>)
    ).toString()

    return fetcher<PaginatedFavoritesResponse>(
      `/users/me/favorites${queryString ? `?${queryString}` : ""}`,
      { token: token || undefined }
    )
  },
}
