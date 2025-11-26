import { useAuthenticatedFetcher } from "@/lib/use-authenticated-fetcher"
import useSWR from "swr"
import type { CommentDto, GetCommentsParams } from "../api/comments.types"

export const useTrackComments = (trackId: string, params: GetCommentsParams = {}) => {
  const authenticatedFetcher = useAuthenticatedFetcher()

  const queryString = new URLSearchParams(
    Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = value.toString()
      }
      return acc
    }, {} as Record<string, string>)
  ).toString()

  const key = `/comments/track/${trackId}${queryString ? `?${queryString}` : ""}`

  const { data, error, isLoading, mutate } = useSWR<CommentDto[]>(
    trackId ? key : null,
    () => authenticatedFetcher(key),
    {
      revalidateOnFocus: false,
      dedupingInterval: 10000,
    }
  )

  return {
    comments: data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  }
}
