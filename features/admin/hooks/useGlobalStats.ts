import useSWR from "swr"
import { adminApi } from "../api/admin.api"
import type { GlobalStatsDto } from "../api/admin.types"

export const useGlobalStats = () => {
  const { data, error, isLoading, mutate } = useSWR<GlobalStatsDto | null>(
    "/admin/stats",
    adminApi.getGlobalStats,
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
