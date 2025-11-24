import useSWR from "swr"
import { tracksApi } from "../api/tracks.api"
import type { GetTracksParams, PaginatedTracksResponse } from "../api/tracks.types"

export const useTracks = (params: GetTracksParams = {}) => {
  const key = `/tracks?${JSON.stringify(params)}`
  
  const { data, error, isLoading, mutate } = useSWR<PaginatedTracksResponse>(
    key,
    () => tracksApi.getTracks(params),
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  )

  return {
    tracks: data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  }
}
