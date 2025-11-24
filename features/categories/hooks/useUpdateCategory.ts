import { ApiError } from "@/lib/fetcher"
import { useState } from "react"
import { categoriesApi } from "../api/categories.api"
import type { UpdateCategoryRequest } from "../api/categories.types"

export const useUpdateCategory = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const update = async (id: string, data: UpdateCategoryRequest) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await categoriesApi.updateCategory(id, data)
      return result
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.errors[0] || "Une erreur est survenue")
      } else {
        setError("Impossible de mettre à jour la catégorie")
      }
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    update,
    isLoading,
    error,
    clearError: () => setError(null),
  }
}
