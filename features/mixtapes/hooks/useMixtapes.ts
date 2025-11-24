import useSWR from "swr"
import { mixtapesApi } from "../api/mixtapes.api"
import type { GetMixtapesParams, PaginatedMixtapesResponse } from "../api/mixtapes.types"

export const useMixtapes = (params: GetMixtapesParams = {}) => {
  const key = `/mixtapes?${JSON.stringify(params)}`
  
  const { data, error, isLoading, mutate } = useSWR<PaginatedMixtapesResponse>(
    key,
    () => mixtapesApi.getMixtapes(params),
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000, // Évite les appels dupliqués pendant 5s
    }
  )

  return {
    mixtapes: data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  }
}
