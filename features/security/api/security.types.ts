export type SecurityEventType = 
  | 'FailedLogin'
  | 'AccountLocked'
  | 'RateLimitExceeded'
  | 'InjectionAttempt'
  | 'UnauthorizedAccess'
  | 'SuspiciousActivity'
  | 'TokenRevoked'
  | 'PasswordChanged'
  | 'AdminAction'

export interface SecurityDashboardDto {
  generatedAt: string
  period: string
  summary: {
    totalEvents: number
    failedLogins: number
    failedLoginsLastHour: number
    accountsLocked: number
    unauthorizedAccess: number
    injectionAttempts: number
    rateLimitViolations: number
    suspiciousActivities: number
  }
  topOffendingIps: {
    ipAddress: string
    eventCount: number
    highestSeverity: string
  }[]
  eventsByType: {
    eventType: string
    count: number
  }[]
  hourlyTrend: {
    hour: string
    count: number
  }[]
}

export interface GetSecurityEventsParams {
  pageIndex?: number          // Default: 1
  pageSize?: number           // Default: 50, Max: 200
  eventType?: SecurityEventType
  severity?: 'Low' | 'Medium' | 'High' | 'Critical'
  startDate?: string          // ISO 8601
  endDate?: string            // ISO 8601
  ipAddress?: string          // Filtrer par IP
  userId?: string             // Filtrer par user
}

export interface SecurityEventDto {
  id: number
  eventType: SecurityEventType
  severity: 'Low' | 'Medium' | 'High' | 'Critical'
  userId: string | null
  ipAddress: string
  userAgent: string | null
  requestPath: string | null
  requestMethod: string | null
  description: string
  alertSent: boolean
  createdAt: string
}

export interface PaginatedSecurityEventsResponse {
  totalCount: number
  filteredCount: number
  events: SecurityEventDto[]
}

export interface GetFailedLoginsParams {
  pageIndex?: number
  pageSize?: number
  startDate?: string          // ISO 8601
  endDate?: string            // ISO 8601
  ipAddress?: string
  email?: string              // Email tenté
}

export interface FailedLoginDto {
  id: string
  email: string
  ipAddress: string
  userAgent: string
  attemptedAt: string         // ISO 8601
  failureReason: 'InvalidCredentials' | 'AccountLocked' | 'AccountNotFound'
  subsequentAttempts: number  // Nombre de tentatives consécutives depuis cette IP
  isBlocked: boolean          // IP bloquée suite à cette tentative
}

export interface PaginatedFailedLoginsResponse {
  items: FailedLoginDto[]
  pageIndex: number
  totalPages: number
  totalCount: number
  hasPrevious: boolean
  hasNext: boolean
}

export interface GetBlockedIPsParams {
  pageIndex?: number
  pageSize?: number
  sortBy?: 'recent' | 'attempts'  // Default: recent
  isActive?: boolean              // Filtre IPs encore bloquées
}

export interface BlockedIPDto {
  id: string
  ipAddress: string
  reason: string                  // Raison du blocage
  attempts: number                // Nombre de tentatives avant blocage
  blockedAt: string               // ISO 8601
  expiresAt: string | null        // ISO 8601, null si permanent
  isActive: boolean               // Encore bloqué ou expiré
  
  // Métadonnées
  geolocation: {
    country: string
    city: string
  } | null
  
  lastAttemptAt: string           // Dernière tentative
  blockedBy: 'Automatic' | 'Manual'
  adminUsername: string | null    // Si blocage manuel
}

export interface PaginatedBlockedIPsResponse {
  items: BlockedIPDto[]
  pageIndex: number
  totalPages: number
  totalCount: number
  hasPrevious: boolean
  hasNext: boolean
}

export interface BlockIPRequest {
  ipAddress: string
  reason: string
  duration?: number | null        // En heures, null = permanent
}

export interface BlockIPResponse {
  id: string
  ipAddress: string
  blockedAt: string
  expiresAt: string | null
  message: string
}

export interface GetRateLimitStatsParams {
  startDate?: string            // ISO 8601, default: last 24h
  endDate?: string              // ISO 8601, default: now
  groupBy?: 'endpoint' | 'ip' | 'user'  // Default: endpoint
}

export interface RateLimitStatsDto {
  totalHits: number
  uniqueIPs: number
  uniqueUsers: number
  
  byEndpoint: {
    endpoint: string
    hits: number
    uniqueIPs: number
  }[]
  
  byIP: {
    ipAddress: string
    hits: number
    endpoints: string[]
  }[]
  
  timeline: {
    timestamp: string           // ISO 8601
    hits: number
  }[]
}

export interface GetInjectionAttemptsParams {
  pageIndex?: number
  pageSize?: number
  injectionType?: 'SQL' | 'XSS' | 'Command' | 'Path'
  startDate?: string
  endDate?: string
}

export interface InjectionAttemptDto {
  id: string
  injectionType: 'SQL' | 'XSS' | 'Command' | 'Path'
  payload: string             // Payload malicieux (sanitized pour affichage)
  endpoint: string
  parameter: string | null    // Query param ou body field ciblé
  ipAddress: string
  userAgent: string
  userId: string | null
  username: string | null
  detectedAt: string          // ISO 8601
  wasBlocked: boolean         // Requête bloquée ou juste loggée
}

export interface PaginatedInjectionsResponse {
  items: InjectionAttemptDto[]
  pageIndex: number
  totalPages: number
  totalCount: number
  hasPrevious: boolean
  hasNext: boolean
}

export interface LockedAccountDto {
  userId: string
  email: string
  username: string
  lockedAt: string            // ISO 8601
  reason: string
  failedAttempts: number
  lastAttemptIP: string
  expiresAt: string | null    // Auto-unlock time
}

export interface LockedAccountsResponse {
  items: LockedAccountDto[]
  totalCount: number
}

export interface UnlockAccountResponse {
  userId: string
  email: string
  unlockedAt: string
  message: string
}
