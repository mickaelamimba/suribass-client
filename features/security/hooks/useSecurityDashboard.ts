import { useAuthenticatedFetcher } from "@/lib/use-authenticated-fetcher"
import useSWR from "swr"
import type { SecurityDashboardDto } from "../api/security.types"

export const useSecurityDashboard = () => {
  const authenticatedFetcher = useAuthenticatedFetcher()
  
  const { data, error, isLoading, mutate } = useSWR<SecurityDashboardDto | null>(
    "/admin/security/dashboard",
    authenticatedFetcher,
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
