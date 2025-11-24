"use client"

import { useAuth } from "@/features/auth/providers/auth-provider"
import { fetcher, type FetcherOptions } from "./fetcher"

/**
 * Hook pour utiliser le fetcher avec authentification automatique
 * Récupère le token depuis le contexte d'authentification
 */
export function useAuthenticatedFetcher() {
  const { accessToken } = useAuth()

  return <T>(url: string, options?: Omit<FetcherOptions, "token">) => {
    return fetcher<T>(url, {
      ...options,
      token: accessToken || undefined,
    })
  }
}
