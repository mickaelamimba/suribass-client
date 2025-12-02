"use client"

import { useAuthenticatedFetcher } from "@/lib/use-authenticated-fetcher"
import useSWR from "swr"
import type { GetUserFavoritesParams, PaginatedFavoritesResponse } from "../api/users.types"

export const useUserFavorites = (params: GetUserFavoritesParams = {}) => {
  const authenticatedFetcher = useAuthenticatedFetcher()

  const queryString = new URLSearchParams(
    Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = value.toString()
      }
      return acc
    }, {} as Record<string, string>)
  ).toString()

  const key = `/users/me/favorites${queryString ? `?${queryString}` : ""}`

  const { data, error, isLoading, mutate } = useSWR<PaginatedFavoritesResponse>(
    key,
    () => authenticatedFetcher(key),
    {
      revalidateOnFocus: false,
      dedupingInterval: 10000,
    }
  )

  return {
    favorites: data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  }
}
