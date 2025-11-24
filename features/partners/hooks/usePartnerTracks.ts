import useSWR from "swr"
import { partnersApi } from "../api/partners.api"
import type { GetPartnerTracksParams, PaginatedTracksResponse } from "../api/partners.types"

export const usePartnerTracks = (id: string, params: GetPartnerTracksParams = {}) => {
  const key = id ? `/partners/${id}/tracks?${JSON.stringify(params)}` : null
  
  const { data, error, isLoading, mutate } = useSWR<PaginatedTracksResponse>(
    key,
    () => partnersApi.getPartnerTracks(id, params),
    {
      revalidateOnFocus: false,
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
