import { useAuthenticatedFetcher } from "@/lib/use-authenticated-fetcher"
import useSWR from "swr"
import type { GetModerationParams, PaginatedModerationResponse } from "../api/admin.types"

export const useModerationQueue = (params: GetModerationParams = {}) => {
  const authenticatedFetcher = useAuthenticatedFetcher()
  
  const queryString = new URLSearchParams(
    Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = value.toString()
      }
      return acc
    }, {} as Record<string, string>)
  ).toString()
  
  const key = `/admin/moderation?${queryString}`
  
  const { data, error, isLoading, mutate } = useSWR<PaginatedModerationResponse | null>(
    key,
    () => authenticatedFetcher(key),
    {
      revalidateOnFocus: true,
    }
  )

  return {
    moderation: data || undefined,
    isLoading,
    isError: !!error || (data === null && !isLoading),
    error,
    mutate,
  }
}
