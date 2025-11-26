import { useAuthenticatedFetcher } from "@/lib/use-authenticated-fetcher"
import useSWR from "swr"
import type { TrackDetailDto } from "../api/tracks.types"

export const useTrackById = (id: string) => {
  const authenticatedFetcher = useAuthenticatedFetcher()
  const key = id ? `/tracks/${id}` : null
  
  const { data, error, isLoading, mutate } = useSWR<TrackDetailDto>(
    key,
    authenticatedFetcher,
    {
      revalidateOnFocus: false,
    }
  )

  return {
    track: data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  }
}
