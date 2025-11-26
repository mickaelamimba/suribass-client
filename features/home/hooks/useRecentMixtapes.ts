import useSWR from "swr"
import { homeApi } from "../api/home.api"
import type { PaginatedMixtapesResponse, RecentMixtapesParams } from "../api/home.types"

export const useRecentMixtapes = (params: RecentMixtapesParams = {}) => {
  const queryString = new URLSearchParams(
    Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = value.toString()
      }
      return acc
    }, {} as Record<string, string>)
  ).toString()

  const key = `/home/recent-mixtapes${queryString ? `?${queryString}` : ""}`

  const { data, error, isLoading, mutate } = useSWR<PaginatedMixtapesResponse>(
    key,
    () => homeApi.getRecentMixtapes(params),
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000, // Cache pendant 30 secondes
    }
  )

  return {
    recentMixtapes: data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  }
}
