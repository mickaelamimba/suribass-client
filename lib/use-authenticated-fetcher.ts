"use client"

import { useAuth } from "@/features/auth/providers/auth-provider"
import { fetcher, type FetcherOptions } from "./fetcher"
import { useCallback } from "react"

/**
 * Hook pour utiliser le fetcher avec authentification automatique
 * Récupère le token depuis le contexte d'authentification
 * Gère automatiquement le rafraîchissement du token en cas d'erreur 401
 */
export function useAuthenticatedFetcher() {
  const { accessToken, refreshToken } = useAuth()

  return useCallback(
    async <T>(url: string, options?: Omit<FetcherOptions, "token">): Promise<T> => {
      try {
        return await fetcher<T>(url, {
          ...options,
          token: accessToken || undefined,
        })
      } catch (error) {
        // Si erreur 401, tenter de rafraîchir le token et réessayer
        if (error instanceof Error && error.message.includes("401")) {
          const refreshed = await refreshToken()
          if (refreshed) {
            // Le token a été rafraîchi, mais on doit attendre le prochain render
            // pour avoir le nouveau token. On réessaie avec une nouvelle requête.
            const response = await fetch("/api/auth/session")
            if (response.ok) {
              const session = await response.json()
              if (session.accessToken) {
                return await fetcher<T>(url, {
                  ...options,
                  token: session.accessToken,
                })
              }
            }
          }
        }
        throw error
      }
    },
    [accessToken, refreshToken]
  )
}
