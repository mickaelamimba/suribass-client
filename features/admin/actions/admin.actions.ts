"use server"

import { getAccessToken } from "@/features/auth/actions/auth.actions"
import type {
    CommentDto,
    GetModerationParams,
    GlobalStatsDto,
    ModerateCommentRequest,
    PaginatedModerationResponse,
    RefreshScoresResponse,
} from "../api/admin.types"

const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5042/api/v1"

/**
 * Get global statistics (Server Action)
 */
export async function getGlobalStatsAction(): Promise<GlobalStatsDto | null> {
  try {
    const token = await getAccessToken()
    
    if (!token) {
      throw new Error("Unauthorized")
    }

    const response = await fetch(`${API_BASE_URL}/admin/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch stats: ${response.status}`)
    }

    const data = await response.json()
    
    // Extraire depuis data.data si format C#
    return (data as any).data || data
  } catch (error) {
    console.error("getGlobalStatsAction error:", error)
    return null
  }
}

/**
 * Get moderation queue (Server Action)
 */
export async function getModerationQueueAction(
  params: GetModerationParams = {}
): Promise<PaginatedModerationResponse | null> {
  try {
    const token = await getAccessToken()
    
    if (!token) {
      throw new Error("Unauthorized")
    }

    const queryString = new URLSearchParams({
      pageIndex: params.pageIndex?.toString() || "1",
      pageSize: params.pageSize?.toString() || "20",
    }).toString()

    const response = await fetch(
      `${API_BASE_URL}/admin/moderation?${queryString}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch moderation queue: ${response.status}`)
    }

    const data = await response.json()
    
    // Extraire depuis data.data si format C#
    return (data as any).data || data
  } catch (error) {
    console.error("getModerationQueueAction error:", error)
    return null
  }
}

/**
 * Moderate a comment (Server Action)
 */
export async function moderateCommentAction(
  commentId: string,
  moderationData: ModerateCommentRequest
): Promise<{ success: boolean; error?: string; data?: CommentDto }> {
  try {
    const token = await getAccessToken()
    
    if (!token) {
      return { success: false, error: "Unauthorized" }
    }

    const response = await fetch(
      `${API_BASE_URL}/admin/moderation/${commentId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(moderationData),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      return {
        success: false,
        error: error.errors?.[0] || error.message || "Failed to moderate comment",
      }
    }

    const data = await response.json()
    
    // Extraire depuis data.data si format C#
    const comment = (data as any).data || data

    return { success: true, data: comment }
  } catch (error: any) {
    console.error("moderateCommentAction error:", error)
    return {
      success: false,
      error: error.message || "An error occurred",
    }
  }
}

/**
 * Refresh all popularity scores (Server Action)
 */
export async function refreshAllScoresAction(): Promise<{
  success: boolean
  error?: string
  data?: RefreshScoresResponse
}> {
  try {
    const token = await getAccessToken()
    
    if (!token) {
      return { success: false, error: "Unauthorized" }
    }

    const response = await fetch(
      `${API_BASE_URL}/admin/scoring/refresh`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (!response.ok) {
      const error = await response.json()
      return {
        success: false,
        error: error.errors?.[0] || error.message || "Failed to refresh scores",
      }
    }

    const data = await response.json()
    
    // Extraire depuis data.data si format C#
    const result = (data as any).data || data

    return { success: true, data: result }
  } catch (error: any) {
    console.error("refreshAllScoresAction error:", error)
    return {
      success: false,
      error: error.message || "An error occurred",
    }
  }
}
