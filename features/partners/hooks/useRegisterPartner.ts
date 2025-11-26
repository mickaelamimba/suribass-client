import { ApiError } from "@/lib/fetcher"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { partnersApi } from "../api/partners.api"
import type { RegisterPartnerRequest } from "../api/partners.types"

export const useRegisterPartner = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const register = async (data: RegisterPartnerRequest) => {
    setIsLoading(true)
    setError(null)

    try {
      const partnerId = await partnersApi.registerPartner(data)
      router.push(`/partners/${partnerId}`)
      return partnerId
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.errors[0] || "Une erreur est survenue")
      } else {
        setError("Impossible de créer le profil partenaire")
      }
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    register,
    isLoading,
    error,
    clearError: () => setError(null),
  }
}
