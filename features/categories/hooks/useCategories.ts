import { useAuthenticatedFetcher } from "@/lib/use-authenticated-fetcher"
import useSWR from "swr"
import type { CategoriesResponse } from "../api/categories.types"

export const useCategories = () => {
  const authenticatedFetcher = useAuthenticatedFetcher()
  
  const { data, error, isLoading, mutate } = useSWR<CategoriesResponse>(
    "/categories",
    authenticatedFetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // Cache 1 minute
    }
  )

  return {
    categories: data?.items || [],
    isLoading,
    isError: !!error,
    error,
    mutate,
  }
}
