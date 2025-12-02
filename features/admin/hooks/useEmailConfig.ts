"use client"

import useSWR from "swr"
import { getEmailConfigAction } from "../actions/email.actions"
import type { EmailConfigDto } from "../api/email.types"

export function useEmailConfig() {
  const { data, error, isLoading, mutate } = useSWR<{
    success: boolean
    data?: EmailConfigDto
    error?: string
  }>(
    "email-config",
    () => getEmailConfigAction(),
    {
      revalidateOnFocus: false,
    }
  )

  return {
    config: data?.success ? data.data : null,
    isLoading,
    isError: error || !data?.success,
    errorMessage: data?.error,
    refetch: mutate,
  }
}
