import { useAuthenticatedFetcher } from "@/lib/use-authenticated-fetcher"
import useSWR from "swr"
import type {
  GetSecurityEventsParams,
  PaginatedSecurityEventsResponse
} from "../api/security.types"

export const useSecurityEvents = (params: GetSecurityEventsParams = {}) => {
  const authenticatedFetcher = useAuthenticatedFetcher()
  
  const queryString = new URLSearchParams(
    Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = value.toString()
      }
      return acc
    }, {} as Record<string, string>)
  ).toString()
  
  const key = `/admin/security/events?${queryString}`
  
  const { data, error, isLoading, mutate } = useSWR<PaginatedSecurityEventsResponse | null>(
    key,
    () => authenticatedFetcher(key),
    {
      refreshInterval: 10000, // Refresh toutes les 10 secondes
    }
  )

  return {
    events: data || undefined,
    isLoading,
    isError: !!error || (data === null && !isLoading),
    error,
    mutate,
  }
}
