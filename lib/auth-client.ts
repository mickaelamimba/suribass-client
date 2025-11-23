"use client"

/**
 * Auth client for Client Components
 * Usage: import { useSession, signOut } from "@/lib/auth-client"
 */

import { loginAction, logoutAction, registerAction } from "@/features/auth/actions/auth.actions"
import { useAuth } from "@/features/auth/providers/auth-provider"

/**
 * Hook to get current user session in Client Components
 * Fetches from /api/auth/session
 * @returns { user, isLoading, isAuthenticated }
 */
export function useSession() {
  const { user, isLoading, isAuthenticated } = useAuth()
  
  return {
    user,
    isLoading,
    isAuthenticated,
    data: user ? { user } : null,
    status: isLoading ? "loading" : isAuthenticated ? "authenticated" : "unauthenticated",
  }
}

/**
 * Sign in with email and password
 * @param email 
 * @param password 
 * @param redirectTo Optional redirect path after login
 */
export async function signIn(
  email: string,
  password: string,
  options?: { redirectTo?: string }
) {
  const result = await loginAction(email, password)
  
  if (result.success && options?.redirectTo) {
    window.location.href = options.redirectTo
  }
  
  return result
}

/**
 * Sign up with email, username and password
 * @param email 
 * @param username 
 * @param password 
 * @param redirectTo Optional redirect path after registration
 */
export async function signUp(
  email: string,
  username: string,
  password: string,
  options?: { redirectTo?: string }
) {
  const result = await registerAction(email, username, password)
  
  if (result.success && options?.redirectTo) {
    window.location.href = options.redirectTo
  }
  
  return result
}

/**
 * Sign out current user
 * Redirects to /login automatically
 */
export async function signOut() {
  await logoutAction()
}

/**
 * Hook to get current user with refetch capability
 */
export function useUser() {
  const { user, isLoading, refetchUser } = useAuth()
  
  return {
    user,
    isLoading,
    refetch: refetchUser,
  }
}

/**
 * Fetch session from API
 * Useful for checking auth status without hooks
 */
export async function getSession() {
  try {
    const response = await fetch("/api/auth/session", {
      credentials: "include",
    })
    
    if (!response.ok) {
      return { user: null, isAuthenticated: false }
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    return { user: null, isAuthenticated: false }
  }
}

