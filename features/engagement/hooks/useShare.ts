"use client"

import { ApiError } from "@/lib/fetcher"
import { useState } from "react"
import { engagementApi } from "../api/engagement.api"
import type { EngagementRequest, ShareLinkResponse } from "../api/engagement.types"

export const useShare = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [shareData, setShareData] = useState<ShareLinkResponse | null>(null)

  const createShareLink = async (data: EngagementRequest) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await engagementApi.createShareLink(data)
      setShareData(result)
      return result
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.errors[0] || "Une erreur est survenue")
      } else {
        setError("Impossible de créer le lien de partage")
      }
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async () => {
    if (shareData?.url) {
      try {
        await navigator.clipboard.writeText(shareData.url)
        return true
      } catch {
        return false
      }
    }
    return false
  }

  return {
    createShareLink,
    copyToClipboard,
    shareData,
    isLoading,
    error,
    clearError: () => setError(null),
    clearShareData: () => setShareData(null),
  }
}
