import { useAuthenticatedFetcher } from "@/lib/use-authenticated-fetcher"
import useSWR from "swr"
import type { GlobalStatsDto } from "../api/admin.types"

export const useGlobalStats = () => {
  const authenticatedFetcher = useAuthenticatedFetcher()
  
  const { data, error, isLoading, mutate } = useSWR<GlobalStatsDto | null>(
    "/admin/stats",
    authenticatedFetcher,
    {
      revalidateOnFocus: false,
      refreshInterval: 60000, // Refresh toutes les minutes
    }
  )

  return {
    stats: data || undefined,
    isLoading,
    isError: !!error || (data === null && !isLoading),
    error,
    mutate,
  }
}
