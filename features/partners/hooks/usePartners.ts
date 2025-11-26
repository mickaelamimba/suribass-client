import { useAuthenticatedFetcher } from "@/lib/use-authenticated-fetcher"
import useSWR from "swr"
import type { GetPartnersParams, PartnersListResponse } from "../api/partners.types"

export const usePartners = (params: GetPartnersParams = {}) => {
  const authenticatedFetcher = useAuthenticatedFetcher()
  
  const queryString = new URLSearchParams(
    Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = value.toString()
      }
      return acc
    }, {} as Record<string, string>)
  ).toString()
  
  const key = `/partners?${queryString}`
  
  const { data, error, isLoading, mutate } = useSWR<PartnersListResponse>(
    key,
    () => authenticatedFetcher(key),
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  )

  return {
    partners: data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  }
}
