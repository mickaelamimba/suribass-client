import { useAuthenticatedFetcher } from "@/lib/use-authenticated-fetcher"
import useSWR from "swr"
import type {
  GetBlockedIPsParams,
  PaginatedBlockedIPsResponse
} from "../api/security.types"

export const useBlockedIPs = (params: GetBlockedIPsParams = {}) => {
  const authenticatedFetcher = useAuthenticatedFetcher()
  
  const queryString = new URLSearchParams(
    Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = value.toString()
      }
      return acc
    }, {} as Record<string, string>)
  ).toString()
  
  const key = `/admin/security/blocked-ips?${queryString}`
  
  const { data, error, isLoading, mutate } = useSWR<PaginatedBlockedIPsResponse | null>(
    key,
    () => authenticatedFetcher(key),
    {
      refreshInterval: 60000, // Refresh toutes les minutes
    }
  )

  return {
    blockedIPs: data || undefined,
    isLoading,
    isError: !!error || (data === null && !isLoading),
    error,
    mutate,
  }
}
