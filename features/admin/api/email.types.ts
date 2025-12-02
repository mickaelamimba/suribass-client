// Types pour le service Email Admin

export interface EmailConfigDto {
  enabled: boolean
  smtpHost: string
  smtpPort: number
  smtpUsername: string
  fromEmail: string
  fromName: string
  enableSsl: boolean
}

export interface EmailTestConnectionResponse {
  isSuccess: boolean
  message: string
  testedAt: string
}

export interface EmailTestSendRequest {
  toEmail: string
  subject?: string
  message?: string
}

export interface EmailConfigUpdateRequest {
  smtpHost?: string
  smtpPort?: number
  smtpUsername?: string
  smtpPassword?: string
  fromEmail?: string
  fromName?: string
  enableSsl?: boolean
  enabled?: boolean
}
