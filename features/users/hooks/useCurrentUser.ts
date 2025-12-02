"use client"

import { useAuthenticatedFetcher } from "@/lib/use-authenticated-fetcher"
import useSWR from "swr"
import type { UserProfileDto } from "../api/users.types"

export const useCurrentUser = () => {
  const authenticatedFetcher = useAuthenticatedFetcher()

  const { data, error, isLoading, mutate } = useSWR<UserProfileDto>(
    "/users/me",
    authenticatedFetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000,
    }
  )

  return {
    user: data,
    isLoading,
    isError: !!error,
    error,
    mutate,
    isPartner: !!data?.partner,
    isAdmin: data?.role === "Admin",
  }
}
