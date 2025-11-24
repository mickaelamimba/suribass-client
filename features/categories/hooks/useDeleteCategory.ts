import { ApiError } from "@/lib/fetcher"
import { useState } from "react"
import { categoriesApi } from "../api/categories.api"

export const useDeleteCategory = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deleteCategory = async (id: string) => {
    setIsLoading(true)
    setError(null)

    try {
      await categoriesApi.deleteCategory(id)
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.errors[0] || "Une erreur est survenue")
      } else {
        setError("Impossible de supprimer la catégorie")
      }
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    deleteCategory,
    isLoading,
    error,
    clearError: () => setError(null),
  }
}
