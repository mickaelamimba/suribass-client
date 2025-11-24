import useSWR from "swr"
import { tracksApi } from "../api/tracks.api"
import type { TrackDetailDto } from "../api/tracks.types"

export const useTrackById = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR<TrackDetailDto>(
    id ? `/tracks/${id}` : null,
    () => tracksApi.getTrackById(id),
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
