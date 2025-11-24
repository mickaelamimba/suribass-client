import { useAuth } from "@/features/auth/providers/auth-provider"
import { ApiError } from "@/lib/fetcher"
import { useState } from "react"
import { categoriesApi } from "../api/categories.api"
import type { CreateCategoryRequest } from "../api/categories.types"

export const useCreateCategory = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { accessToken } = useAuth()

  const create = async (data: CreateCategoryRequest) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await categoriesApi.createCategory(data, accessToken)
      return result
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.errors[0] || "Une erreur est survenue")
      } else {
        setError("Impossible de créer la catégorie")
      }
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    create,
    isLoading,
    error,
    clearError: () => setError(null),
  }
}
