import { useAuthenticatedFetcher } from "@/lib/use-authenticated-fetcher"
import useSWR from "swr"
import type { GetPartnerTracksParams, PaginatedTracksResponse } from "../api/partners.types"

export const usePartnerTracks = (id: string, params: GetPartnerTracksParams = {}) => {
  const authenticatedFetcher = useAuthenticatedFetcher()
  
  const queryString = new URLSearchParams(
    Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = value.toString()
      }
      return acc
    }, {} as Record<string, string>)
  ).toString()
  
  const key = id ? `/partners/${id}/tracks?${queryString}` : null
  
  const { data, error, isLoading, mutate } = useSWR<PaginatedTracksResponse>(
    key,
    () => authenticatedFetcher(key!),
    {
      revalidateOnFocus: false,
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
