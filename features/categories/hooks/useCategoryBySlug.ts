import useSWR from "swr"
import { categoriesApi } from "../api/categories.api"
import type { CategoryDto } from "../api/categories.types"

export const useCategoryBySlug = (slug: string) => {
  const { data, error, isLoading, mutate } = useSWR<CategoryDto>(
    slug ? `/categories/${slug}` : null,
    () => categoriesApi.getCategoryBySlug(slug),
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
