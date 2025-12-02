import { useAuthenticatedFetcher } from "@/lib/use-authenticated-fetcher"
import useSWR from "swr"

interface PartnerStats {
  totalTracks: number
  totalViews: number
  totalFavorites: number
  averageScore: number
}

export const usePartnerStats = (partnerId: string) => {
  const authenticatedFetcher = useAuthenticatedFetcher()
  const key = partnerId ? `/partners/${partnerId}/stats` : null
  
  const { data, error, isLoading, mutate } = useSWR<PartnerStats>(
    key,
    authenticatedFetcher,
    {
      revalidateOnFocus: true,
      refreshInterval: 60000,
    }
  )

  return {
    stats: data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  }
}
