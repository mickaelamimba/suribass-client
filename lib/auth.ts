/**
 * Auth utility for Server Components and Server Actions
 * Usage: import { auth } from "@/lib/auth"
 */

import { getAccessToken, getCurrentUser, logoutAction } from "@/features/auth/actions/auth.actions"
import type { UserProfile } from "@/features/auth/api/auth.types"

export const auth = {
  /**
   * Get current authenticated user (Server Component only)
   * @returns User or null if not authenticated
   */
  async getUser(): Promise<UserProfile | null> {
    return await getCurrentUser()
  },

  /**
   * Get access token (Server Component/API Route only)
   * @returns Token or null
   */
  async getToken(): Promise<string | null> {
    return await getAccessToken()
  },

  /**
   * Logout current user (Server Action)
   * Redirects to /login automatically
   */
  async logout(): Promise<void> {
    await logoutAction()
  },

  /**
   * Check if user is authenticated (Server Component only)
   * @returns true if user has valid token
   */
  async isAuthenticated(): Promise<boolean> {
    const token = await getAccessToken()
    return !!token
  },
}
