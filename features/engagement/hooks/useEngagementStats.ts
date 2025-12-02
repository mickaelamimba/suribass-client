"use client"

import { swrFetcher } from "@/lib/fetcher"
import useSWR from "swr"
import type { EngagementStatsDto, GetEngagementStatsParams } from "../api/engagement.types"

export const useEngagementStats = (params: GetEngagementStatsParams) => {
  // Ne pas fetch si aucun ID n'est fourni
  const hasValidParams = params.trackId || params.mixtapeId
  
  const queryString = new URLSearchParams(
    Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = value.toString()
      }
      return acc
    }, {} as Record<string, string>)
  ).toString()

  const key = hasValidParams ? `/engagement/stats?${queryString}` : null

  const { data, error, isLoading, mutate } = useSWR<EngagementStatsDto>(
    key,
    swrFetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 10000,
    }
  )

  return {
    stats: data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  }
}
