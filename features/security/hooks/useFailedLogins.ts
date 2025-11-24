import useSWR from "swr"
import { securityApi } from "../api/security.api"
import type {
    GetFailedLoginsParams,
    PaginatedFailedLoginsResponse
} from "../api/security.types"

export const useFailedLogins = (params: GetFailedLoginsParams = {}) => {
  const key = `/admin/security/failed-logins?${JSON.stringify(params)}`
  
  const { data, error, isLoading, mutate } = useSWR<PaginatedFailedLoginsResponse | null>(
    key,
    () => securityApi.getFailedLogins(params)
  )

  return {
    failedLogins: data || undefined,
    isLoading,
    isError: !!error || (data === null && !isLoading),
    error,
    mutate,
  }
}
