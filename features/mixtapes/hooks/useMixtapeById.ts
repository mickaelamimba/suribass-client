import { useAuthenticatedFetcher } from "@/lib/use-authenticated-fetcher"
import useSWR from "swr"
import type { MixtapeDetailDto } from "../api/mixtapes.types"

export const useMixtapeById = (id: string) => {
  const authenticatedFetcher = useAuthenticatedFetcher()
  const key = id ? `/mixtapes/${id}` : null
  
  const { data, error, isLoading, mutate } = useSWR<MixtapeDetailDto>(
    key,
    authenticatedFetcher,
    {
      revalidateOnFocus: false,
    }
  )

  return {
    mixtape: data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  }
}
