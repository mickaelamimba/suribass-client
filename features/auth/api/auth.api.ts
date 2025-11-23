import { fetcher } from "@/lib/fetcher"
import { apiMutation } from "@/lib/api-helpers"
import type {
  LoginRequest,
  RegisterRequest,
  TokenResponse,
  UserProfile,
} from "./auth.types"
export const authApi = {
  register: (data: RegisterRequest) =>
    apiMutation<RegisterRequest, TokenResponse>(
      "/auth/register",
      "POST",
      data
    ),

  login: (data: LoginRequest) =>
    apiMutation<LoginRequest, TokenResponse>("/auth/login", "POST", data),

  loginWithGoogle: (idToken: string) =>
    apiMutation<{ idToken: string }, TokenResponse>(
      "/auth/google",
      "POST",
      { idToken }
    ),

  refreshToken: (refreshToken: string) =>
    apiMutation<{ refreshToken: string }, TokenResponse>(
      "/auth/refresh",
      "POST",
      { refreshToken }
    ),

  getCurrentUser: () => fetcher<UserProfile>("/users/me"),

  logout: async () => {
    // Optionnel : appel API pour révoquer le token
    // await apiMutation("/auth/logout", "POST")
  },
}