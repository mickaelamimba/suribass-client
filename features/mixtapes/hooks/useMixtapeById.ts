import useSWR from "swr"
import { mixtapesApi } from "../api/mixtapes.api"
import type { MixtapeDetailDto } from "../api/mixtapes.types"

export const useMixtapeById = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR<MixtapeDetailDto>(
    id ? `/mixtapes/${id}` : null,
    () => mixtapesApi.getMixtapeById(id),
    {
      revalidateOnFocus: false,
    }
  )

  return {
    mixtape: data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  }
}
