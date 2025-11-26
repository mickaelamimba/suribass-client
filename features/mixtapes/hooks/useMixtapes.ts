import { useAuthenticatedFetcher } from "@/lib/use-authenticated-fetcher"
import useSWR from "swr"
import type { GetMixtapesParams, PaginatedMixtapesResponse } from "../api/mixtapes.types"

export const useMixtapes = (params: GetMixtapesParams = {}) => {
  const authenticatedFetcher = useAuthenticatedFetcher()
  
  const queryString = new URLSearchParams(
    Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = value.toString()
      }
      return acc
    }, {} as Record<string, string>)
  ).toString()
  
  const key = `/mixtapes?${queryString}`
  
  const { data, error, isLoading, mutate } = useSWR<PaginatedMixtapesResponse>(
    key,
    () => authenticatedFetcher(key),
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000, // Évite les appels dupliqués pendant 5s
    }
  )

  return {
    mixtapes: data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  }
}
