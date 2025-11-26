import { useAuthenticatedFetcher } from "@/lib/use-authenticated-fetcher"
import useSWR from "swr"
import type { GetTracksParams, PaginatedTracksResponse } from "../api/tracks.types"

export const useTracks = (params: GetTracksParams = {}) => {
  const authenticatedFetcher = useAuthenticatedFetcher()
  
  const queryString = new URLSearchParams(
    Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = value.toString()
      }
      return acc
    }, {} as Record<string, string>)
  ).toString()
  
  const key = `/tracks?${queryString}`
  
  const { data, error, isLoading, mutate } = useSWR<PaginatedTracksResponse>(
    key,
    () => authenticatedFetcher(key),
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  )

  return {
    tracks: data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  }
}
