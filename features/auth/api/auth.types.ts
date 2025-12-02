// Types correspondant à votre backend C# ASP.NET Core

// ============================================
// REQUEST TYPES (envoyés au backend C#)
// ============================================

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  username: string
  password: string
}

export interface RefreshTokenRequest {
  refreshToken: string
}

// ============================================
// RESPONSE TYPES (reçus du backend C#)
// ============================================

/**
 * Réponse d'authentification du backend C#
 * Correspond à AuthResponse.cs
 */
export interface TokenResponse {
  accessToken: string
  refreshToken: string
  expiresAt: string // ISO 8601 format (DateTime C#)
}

/**
 * Profil utilisateur du backend C#
 * Correspond à UserProfile.cs
 */
export interface UserProfile {
  id: string
  email: string
  username: string
  role: UserRole
  createdAt?: string // ISO 8601 format (DateTime C#) - optionnel car pas toujours retourné
  // L'API /users/me retourne ces champs
  partnerId: string | null
  isPartner: boolean
  // Certains endpoints peuvent retourner l'objet partner complet
  partner?: PartnerDto | null
}

/**
 * Informations du Partner/Artiste
 * Correspond à PartnerDto.cs
 */
export interface PartnerDto {
  id: string
  artistName: string
  bio: string | null
  avatarUrl: string | null
}

/**
 * Rôles disponibles
 * Correspond à l'enum Role.cs
 */
export type UserRole = "Admin" | "Partner" | "User"

/**
 * Format d'erreur API du backend C#
 * Correspond à ProblemDetails ou votre format d'erreur personnalisé
 */
export interface ApiError {
  errors: string[]
  statusCode?: number
  timestamp?: string
  path?: string
}

// ============================================
// HELPER TYPES
// ============================================

/**
 * Résultat d'une Server Action
 */
export type ActionResult<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string }

/**
 * Claims JWT décodés (pour debug uniquement)
 * NE PAS utiliser côté client pour la sécurité
 */
export interface JwtClaims {
  sub: string // User ID
  email: string
  role: UserRole
  exp: number // Expiration timestamp
  iat: number // Issued at timestamp
}