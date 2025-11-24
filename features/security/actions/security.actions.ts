"use server"

import { getAccessToken } from "@/features/auth/actions/auth.actions"
import type {
    BlockIPRequest,
    BlockIPResponse,
    GetBlockedIPsParams,
    GetFailedLoginsParams,
    GetInjectionAttemptsParams,
    GetRateLimitStatsParams,
    GetSecurityEventsParams,
    LockedAccountsResponse,
    PaginatedBlockedIPsResponse,
    PaginatedFailedLoginsResponse,
    PaginatedInjectionsResponse,
    PaginatedSecurityEventsResponse,
    RateLimitStatsDto,
    SecurityDashboardDto,
    UnlockAccountResponse,
} from "../api/security.types"

const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5042/api/v1"

async function fetchWithAuth<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = await getAccessToken()
  
  if (!token) {
    throw new Error("Unauthorized")
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: `HTTP error ${response.status}` }))
    throw new Error(error.message || `Request failed with status ${response.status}`)
  }

  const data = await response.json()
  // Handle C# response wrapper if present
  return (data as any).data || data
}

export async function getSecurityDashboardAction(): Promise<SecurityDashboardDto | null> {
  try {
    return await fetchWithAuth<SecurityDashboardDto>("/admin/security/dashboard")
  } catch (error) {
    console.error("getSecurityDashboardAction error:", error)
    return null
  }
}

export async function getSecurityEventsAction(params: GetSecurityEventsParams): Promise<PaginatedSecurityEventsResponse | null> {
  try {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = value.toString()
        }
        return acc
      }, {} as Record<string, string>)
    ).toString()
    
    return await fetchWithAuth<PaginatedSecurityEventsResponse>(`/admin/security/events?${queryString}`)
  } catch (error) {
    console.error("getSecurityEventsAction error:", error)
    return null
  }
}

export async function getFailedLoginsAction(params: GetFailedLoginsParams): Promise<PaginatedFailedLoginsResponse | null> {
  try {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = value.toString()
        }
        return acc
      }, {} as Record<string, string>)
    ).toString()
    
    return await fetchWithAuth<PaginatedFailedLoginsResponse>(`/admin/security/failed-logins?${queryString}`)
  } catch (error) {
    console.error("getFailedLoginsAction error:", error)
    return null
  }
}

export async function getBlockedIPsAction(params: GetBlockedIPsParams): Promise<PaginatedBlockedIPsResponse | null> {
  try {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = value.toString()
        }
        return acc
      }, {} as Record<string, string>)
    ).toString()
    
    return await fetchWithAuth<PaginatedBlockedIPsResponse>(`/admin/security/blocked-ips?${queryString}`)
  } catch (error) {
    console.error("getBlockedIPsAction error:", error)
    return null
  }
}

export async function blockIPAction(data: BlockIPRequest): Promise<{ success: boolean; error?: string; data?: BlockIPResponse }> {
  try {
    const result = await fetchWithAuth<BlockIPResponse>("/admin/security/block-ip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    return { success: true, data: result }
  } catch (error: any) {
    console.error("blockIPAction error:", error)
    return { success: false, error: error.message || "Failed to block IP" }
  }
}

export async function unblockIPAction(ipAddress: string): Promise<{ success: boolean; error?: string }> {
  try {
    await fetchWithAuth<void>(`/admin/security/blocked-ips/${ipAddress}`, {
      method: "DELETE",
    })
    return { success: true }
  } catch (error: any) {
    console.error("unblockIPAction error:", error)
    return { success: false, error: error.message || "Failed to unblock IP" }
  }
}

export async function getRateLimitStatsAction(params: GetRateLimitStatsParams): Promise<RateLimitStatsDto | null> {
  try {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = value.toString()
        }
        return acc
      }, {} as Record<string, string>)
    ).toString()
    
    return await fetchWithAuth<RateLimitStatsDto>(`/admin/security/rate-limits?${queryString}`)
  } catch (error) {
    console.error("getRateLimitStatsAction error:", error)
    return null
  }
}

export async function getInjectionAttemptsAction(params: GetInjectionAttemptsParams): Promise<PaginatedInjectionsResponse | null> {
  try {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = value.toString()
        }
        return acc
      }, {} as Record<string, string>)
    ).toString()
    
    return await fetchWithAuth<PaginatedInjectionsResponse>(`/admin/security/injections?${queryString}`)
  } catch (error) {
    console.error("getInjectionAttemptsAction error:", error)
    return null
  }
}

export async function getLockedAccountsAction(): Promise<LockedAccountsResponse | null> {
  try {
    return await fetchWithAuth<LockedAccountsResponse>("/admin/security/locked-accounts")
  } catch (error) {
    console.error("getLockedAccountsAction error:", error)
    return null
  }
}

export async function unlockAccountAction(userId: string): Promise<{ success: boolean; error?: string; data?: UnlockAccountResponse }> {
  try {
    const result = await fetchWithAuth<UnlockAccountResponse>(`/admin/security/unlock-account/${userId}`, {
      method: "POST",
    })
    return { success: true, data: result }
  } catch (error: any) {
    console.error("unlockAccountAction error:", error)
    return { success: false, error: error.message || "Failed to unlock account" }
  }
}
