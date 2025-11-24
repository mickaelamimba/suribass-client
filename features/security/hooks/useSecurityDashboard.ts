import useSWR from "swr"
import { securityApi } from "../api/security.api"
import type { SecurityDashboardDto } from "../api/security.types"

export const useSecurityDashboard = () => {
  const { data, error, isLoading, mutate } = useSWR<SecurityDashboardDto | null>(
    "/admin/security/dashboard",
    securityApi.getSecurityDashboard,
    {
      refreshInterval: 30000, // Refresh toutes les 30 secondes
      revalidateOnFocus: true,
    }
  )

  return {
    dashboard: data || undefined,
    isLoading,
    isError: !!error || (data === null && !isLoading),
    error,
    mutate,
  }
}
