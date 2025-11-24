import useSWR from "swr"
import { securityApi } from "../api/security.api"
import type {
    GetBlockedIPsParams,
    PaginatedBlockedIPsResponse
} from "../api/security.types"

export const useBlockedIPs = (params: GetBlockedIPsParams = {}) => {
  const key = `/admin/security/blocked-ips?${JSON.stringify(params)}`
  
  const { data, error, isLoading, mutate } = useSWR<PaginatedBlockedIPsResponse | null>(
    key,
    () => securityApi.getBlockedIPs(params),
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
