import useSWR from "swr"
import { homeApi } from "../api/home.api"
import type { FeaturedTracksParams, PaginatedTracksResponse } from "../api/home.types"

export const useFeaturedTracks = (params: FeaturedTracksParams = {}) => {
  const queryString = new URLSearchParams(
    Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = value.toString()
      }
      return acc
    }, {} as Record<string, string>)
  ).toString()

  const key = `/home/featured${queryString ? `?${queryString}` : ""}`

  const { data, error, isLoading, mutate } = useSWR<PaginatedTracksResponse>(
    key,
    () => homeApi.getFeaturedTracks(params),
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000, // Cache pendant 30 secondes
    }
  )

  return {
    featuredTracks: data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  }
}
