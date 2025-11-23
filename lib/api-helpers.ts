import { fetcher } from "./fetcher"
import { mutate } from "swr"

interface MutationOptions {
  onSuccess?: () => void
  onError?: (error: Error) => void
  revalidate?: string[] // Liste de clés SWR à invalider
}

export async function apiMutation<TData, TResponse>(
  url: string,
  method: "POST" | "PUT" | "DELETE",
  data?: TData,
  options: MutationOptions = {}
): Promise<TResponse> {
  try {
    const response = await fetcher<TResponse>(url, {
      method,
      body: data ? JSON.stringify(data) : undefined,
    })

    // Invalider les caches SWR spécifiés
    if (options.revalidate) {
      options.revalidate.forEach((key) => mutate(key))
    }

    options.onSuccess?.()
    return response
  } catch (error) {
    options.onError?.(error as Error)
    throw error
  }
}