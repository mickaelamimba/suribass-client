import useSWR from "swr"
import { adminApi } from "../api/admin.api"
import type { GetModerationParams, PaginatedModerationResponse } from "../api/admin.types"

export const useModerationQueue = (params: GetModerationParams = {}) => {
  const key = `/admin/moderation?${JSON.stringify(params)}`
  
  const { data, error, isLoading, mutate } = useSWR<PaginatedModerationResponse | null>(
    key,
    () => adminApi.getModerationQueue(params),
    {
      revalidateOnFocus: true,
    }
  )

  return {
    moderation: data || undefined,
    isLoading,
    isError: !!error || (data === null && !isLoading),
    error,
    mutate,
  }
}
