import useSWR from "swr"
import { partnersApi } from "../api/partners.api"
import type { GetPartnersParams, PaginatedPartnersResponse } from "../api/partners.types"

export const usePartners = (params: GetPartnersParams = {}) => {
  const key = `/partners?${JSON.stringify(params)}`
  
  const { data, error, isLoading, mutate } = useSWR<PaginatedPartnersResponse>(
    key,
    () => partnersApi.getPartners(params),
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  )

  return {
    partners: data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  }
}
