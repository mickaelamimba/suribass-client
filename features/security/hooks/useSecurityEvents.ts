import useSWR from "swr"
import { securityApi } from "../api/security.api"
import type {
    GetSecurityEventsParams,
    PaginatedSecurityEventsResponse
} from "../api/security.types"

export const useSecurityEvents = (params: GetSecurityEventsParams = {}) => {
  const key = `/admin/security/events?${JSON.stringify(params)}`
  
  const { data, error, isLoading, mutate } = useSWR<PaginatedSecurityEventsResponse | null>(
    key,
    () => securityApi.getSecurityEvents(params),
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
