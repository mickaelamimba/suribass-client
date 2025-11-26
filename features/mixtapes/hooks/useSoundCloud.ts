"use client"

import { useAuth } from "@/features/auth/providers/auth-provider"
import { useAuthenticatedFetcher } from "@/lib/use-authenticated-fetcher"
import { useState } from "react"
import useSWR from "swr"
import { soundcloudApi } from "../api/soundcloud.api"
import type { SoundCloudStatus } from "../api/soundcloud.types"

/**
 * Hook pour gérer la connexion SoundCloud
 * Récupère le statut de connexion et fournit des méthodes pour connecter/déconnecter
 */
export const useSoundCloud = () => {
  const authenticatedFetcher = useAuthenticatedFetcher()
  const { accessToken } = useAuth()
  const [isConnecting, setIsConnecting] = useState(false)
  const [isRevoking, setIsRevoking] = useState(false)

  // Récupérer le statut de connexion
  const {
    data: status,
    error,
    isLoading,
    mutate,
  } = useSWR<SoundCloudStatus>(
    "/soundcloud/status",
    () => authenticatedFetcher("/soundcloud/status"),
    {
      revalidateOnFocus: false,
      dedupingInterval: 10000, // Évite les appels dupliqués pendant 10s
    }
  )

  // Initier la connexion OAuth
  const connect = () => {
    setIsConnecting(true)

    // Rediriger vers l'API Route Next.js qui gère l'authentification
    // L'API Route fera la requête au backend avec le header Authorization
    // puis redirigera vers SoundCloud OAuth
    window.location.href = "/api/soundcloud/authorize"
  }

  // Révoquer la connexion
  const revoke = async () => {
    setIsRevoking(true)
    try {
      await soundcloudApi.revoke(accessToken)
      // Revalider le statut après révocation
      await mutate()
    } catch (err) {
      console.error("Failed to revoke SoundCloud connection:", err)
      throw err
    } finally {
      setIsRevoking(false)
    }
  }

  return {
    status,
    isLoading,
    isError: !!error,
    error,
    isConnecting,
    isRevoking,
    connect,
    revoke,
    refetch: mutate,
  }
}
