import { useAuthenticatedFetcher } from "@/lib/use-authenticated-fetcher"
import useSWR from "swr"
import type { PartnerDetailDto } from "../api/partners.types"

export const usePartnerById = (id: string) => {
  const authenticatedFetcher = useAuthenticatedFetcher()
  const key = id ? `/partners/${id}` : null
  
  const { data, error, isLoading, mutate } = useSWR<PartnerDetailDto>(
    key,
    authenticatedFetcher,
    {
      revalidateOnFocus: false,
    }
  )

  return {
    partner: data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  }
}
