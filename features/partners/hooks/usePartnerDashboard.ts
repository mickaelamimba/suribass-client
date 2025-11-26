import { useAuthenticatedFetcher } from "@/lib/use-authenticated-fetcher"
import useSWR from "swr"
import type { PartnerDashboardDto } from "../api/partners.types"

export const usePartnerDashboard = (id: string) => {
  const authenticatedFetcher = useAuthenticatedFetcher()
  const key = id ? `/partners/${id}/dashboard` : null
  
  const { data, error, isLoading, mutate } = useSWR<PartnerDashboardDto>(
    key,
    authenticatedFetcher,
    {
      revalidateOnFocus: true,
      refreshInterval: 60000, // Refresh toutes les minutes
    }
  )

  return {
    dashboard: data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  }
}
