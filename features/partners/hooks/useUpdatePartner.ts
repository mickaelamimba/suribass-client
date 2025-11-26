import { ApiError } from "@/lib/fetcher"
import { useState } from "react"
import { partnersApi } from "../api/partners.api"
import type { UpdatePartnerRequest } from "../api/partners.types"

export const useUpdatePartner = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const update = async (id: string, data: UpdatePartnerRequest) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await partnersApi.updatePartner(id, data)
      return result
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.errors[0] || "Une erreur est survenue")
      } else {
        setError("Impossible de mettre à jour le profil")
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
