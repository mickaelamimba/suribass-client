import { useAuthenticatedFetcher } from "@/lib/use-authenticated-fetcher"
import useSWR from "swr"
import type { CategoryDto } from "../api/categories.types"

export const useCategoryBySlug = (slug: string) => {
  const authenticatedFetcher = useAuthenticatedFetcher()
  const key = slug ? `/categories/${slug}` : null
  
  const { data, error, isLoading, mutate } = useSWR<CategoryDto>(
    key,
    authenticatedFetcher,
    {
      revalidateOnFocus: false,
    }
  )

  return {
    category: data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  }
}
