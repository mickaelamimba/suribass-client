const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL|| "http://localhost:3000"

export interface FetcherOptions extends RequestInit {
  token?: string
}

export class ApiError extends Error {
  statusCode: number
  errors: string[]

  constructor(statusCode: number, errors: string[]) {
    super(errors[0] || "Une erreur est survenue")
    this.statusCode = statusCode
    this.errors = errors
  }
}

export async function fetcher<T>(
  url: string,
  options: FetcherOptions = {}
): Promise<T> {
  const { token, ...fetchOptions } = options
  
  const fullUrl = `${API_BASE_URL}${url}`
  console.log('🔍 Fetcher - API_BASE_URL:', API_BASE_URL)
  console.log('🔍 Fetcher - Full URL:', fullUrl)
  console.log('🔍 Fetcher - Has token:', !!token)
  
  const headers = new Headers(fetchOptions.headers)
  
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json")
  }

  // Token sera géré automatiquement par les cookies httpOnly
  // Pas besoin de l'ajouter manuellement ici pour les requêtes depuis le serveur
  if (token) {
    headers.set("Authorization", `Bearer ${token}`)
  }

  const response = await fetch(fullUrl, {
    ...fetchOptions,
    headers,
    credentials: "include", // Important pour envoyer les cookies
  })

  if (!response.ok) {
    const error = await response.json()
    throw new ApiError(
      response.status,
      error.errors || [error.message || "Une erreur est survenue"]
    )
  }

  return response.json()
}
export const swrFetcher = (url: string, options?: FetcherOptions) => fetcher(url, options)