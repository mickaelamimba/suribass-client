import useSWR from "swr"
import { partnersApi } from "../api/partners.api"
import type { PartnerDetailDto } from "../api/partners.types"

export const usePartnerById = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR<PartnerDetailDto>(
    id ? `/partners/${id}` : null,
    () => partnersApi.getPartnerById(id),
    {
      revalidateOnFocus: false,
    }
  )

  return {
    partner: data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  }
}
