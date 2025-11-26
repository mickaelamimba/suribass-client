// Types pour l'intégration SoundCloud OAuth

export interface SoundCloudStatus {
  connected: boolean
  expiresAt?: string
}

export interface SyncResult {
  added: number
  updated: number
  skipped: number
  failed: number
  errors: string[]
  syncedAt: string
}

export interface SyncOptions {
  tags?: string
  defaultCategoryId?: string
}

export interface SoundCloudAuthResponse {
  message: string
  redirectUrl?: string
}

export interface SoundCloudRevokeResponse {
  message: string
}
