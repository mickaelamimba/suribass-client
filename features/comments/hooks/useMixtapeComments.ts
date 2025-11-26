import { useAuthenticatedFetcher } from "@/lib/use-authenticated-fetcher"
import useSWR from "swr"
import type { CommentDto, GetCommentsParams } from "../api/comments.types"

export const useMixtapeComments = (mixtapeId: string, params: GetCommentsParams = {}) => {
  const authenticatedFetcher = useAuthenticatedFetcher()

  const queryString = new URLSearchParams(
    Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = value.toString()
      }
      return acc
    }, {} as Record<string, string>)
  ).toString()

  const key = `/comments/mixtape/${mixtapeId}${queryString ? `?${queryString}` : ""}`

  const { data, error, isLoading, mutate } = useSWR<CommentDto[]>(
    mixtapeId ? key : null,
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
