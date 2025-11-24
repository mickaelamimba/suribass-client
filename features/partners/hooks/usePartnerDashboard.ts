import useSWR from "swr"
import { partnersApi } from "../api/partners.api"
import type { PartnerDashboardDto } from "../api/partners.types"

export const usePartnerDashboard = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR<PartnerDashboardDto>(
    id ? `/partners/${id}/dashboard` : null,
    () => partnersApi.getPartnerDashboard(id),
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
