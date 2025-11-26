import useSWR from "swr"
import { homeApi } from "../api/home.api"
import type { TopContentDto, TopContentParams } from "../api/home.types"

export const useTopContent = (params: TopContentParams = {}) => {
  const queryString = new URLSearchParams(
    Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = value.toString()
      }
      return acc
    }, {} as Record<string, string>)
  ).toString()

  const key = `/home/top-content${queryString ? `?${queryString}` : ""}`

  const { data, error, isLoading, mutate } = useSWR<TopContentDto[]>(
    key,
    () => homeApi.getTopContent(params),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // Cache pendant 1 minute
    }
  )

  return {
    topContent: data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  }
}
