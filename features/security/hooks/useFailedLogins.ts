import { useAuthenticatedFetcher } from "@/lib/use-authenticated-fetcher"
import useSWR from "swr"
import type {
  GetFailedLoginsParams,
  PaginatedFailedLoginsResponse
} from "../api/security.types"

export const useFailedLogins = (params: GetFailedLoginsParams = {}) => {
  const authenticatedFetcher = useAuthenticatedFetcher()
  
  const queryString = new URLSearchParams(
    Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = value.toString()
      }
      return acc
    }, {} as Record<string, string>)
  ).toString()
  
  const key = `/admin/security/failed-logins?${queryString}`
  
  const { data, error, isLoading, mutate } = useSWR<PaginatedFailedLoginsResponse | null>(
    key,
    () => authenticatedFetcher(key),
    {}
  )

  return {
    failedLogins: data || undefined,
    isLoading,
    isError: !!error || (data === null && !isLoading),
    error,
    mutate,
  }
}
